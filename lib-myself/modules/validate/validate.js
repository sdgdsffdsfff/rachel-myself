
;(function($){

	/*
	* 对应单个表单的验证对象
	*/
	function ValidateSingle(singleOpts) {
		var op = {}, self = this, timer = null,
            errorId = -1;//error当为null时才表示验证通过,其他情况表示当前验证规则的小标[0~...]

		init();
		function init() {
			lib.inherit(self, lib.customEvent);
			// init param
			op = $.extend(op, singleOpts);

			//根据表单元素类型的不同
			var type = op.ele.attr('type');
			//checkbox or radio evtName:click
			if (type == 'checkbox' || type == 'radio') {
				op.ele.on(op.defEvt.EvtChbox, check);
				return;
			}
			//change
			if (op.ele.filter('select').length) {
                op.ele.on(op.defEvt.EvtSelect, check);
				return;
			}
			//blur
            op.ele.on(op.defEvt.EvtText, function() {
				timer && clearTimeout(timer);
				/*
				* 此处有setTimeout，是因为有时候我们text类型的input框，是通过下拉框选中的。
				* 所以这时候到底是先触发click，还是blur。不同浏览器可能不同。如果是blur的话，此时验证的input就不是正好选择的下拉框
				* 如：autoComplete的搜索框
				*/
				setTimeout(function() {
					check();
				}, 200);//
			});

		}

        /*
        * 每个表单元素多个验证规则的验证
        * 1. 若是远程验证，则不在该函数中统一处理，因为以下函数执行时，remote的结果可能还没返回。所以remote直接在其验证函数中处理即可
        * 2. 若是非远程验证，则在以下函数统一处理每个验证规则
        * 3. 即使多个验证规则，其中有一步是remote，那也没关系，因为1和2其实是独立的
        * */
		function check() {
            var rules = op.rules, rule, ret, args;
            $.each(rules, function(i, v) {
                rule = getRule(v.rule);
                // 第一个参数一定是当前表单元素，后面为用户自定义传入的数据
                args = v.data.unshift(op.ele);
                //若rule是remote，则它一定先直接返回false，再在返回值中作处理
                ret = rule.apply(self, args);
                //未成功
                if (!ret) {
                    errorId = i;
                    self.trigger('error', ['error', self, v.msg]);
                    return false;
                }

            });
            errorId = null;
            /*
            * 因为绑定的error/success等都在一个函数singleHandler中实现，所以需要传入事件类型
            * self：是ValidateSingle提供给外部调用的方法和属性
            * 此时如果是群组表单，则还需要对success状态下，其他的表单元素进行验证
            * */
            self.trigger('success', ['success', self]);
            return true;

            function getRule(rule) {
                if (typeof rule == 'string') {
                    return op.ruleBase[rule];
                }
                return rule;
            }
		}


        /*
        * 获取当前状态
        * @return status:{
        *     st:状态
        *     msg:只有error的时候才会有msg
        * }
        * */
        function getStatus() {
            var status = {};
            if (errorId == null) {
                status = {st: 'success'};
            } else {
                status = {st: 'error', msg: op.rules[errorId].msg}
            }
            return status;
        }

        /*
        * 更新指定规则的msg（如果该规则已被检查过，则需立即更新）
        * @param ruleId 传入的某个表单字段对应的checklist数组的下标，或者该规则的rule对应的值(必须是字符串)
        * @param newMsg 需要更新的msg
        * @return 更新是否成功
        * */
        function updateMsg(ruleId, newMsg) {
            var i = 0, index = ruleId, ruleObj;
            if (typeof ruleId == 'string') {
                for (; i < op.rules.length; i++) {
                    if (op.rules[i].rule == ruleId) {
                        index = i;
                        break;
                    }
                }
            }
            ruleObj = op.rules[index];
            ruleObj && (ruleObj.msg = newMsg);
            //已被检查过
            (errorId == index) && self.trigger('error', ['error', self, newMsg]);
        }

        /*
        * 为该表单添加新的验证规则数组
        * @param rules [Array] 需要添加的新规则
        * */
        function addRules(addRules) {
            return (op.rules = op.rules.concat(addRules));
        }

        /*
        * 从表单已有验证规则中移除指定规则
        * @param removeRules [Array] 需要移除的规则下标集合
        * @return 返回移除后的验证规则
        * */
        function removeRules(rmRuleIds) {
            $.each(op.rules, function(i, v) {
                if ($.inArray(i, rmRuleIds)) {
                    delete op.rules[i];
                }
            });
            return op.rules;
        }

        /*
        * 获取group
        * */
        function getGroup() {
            return op.group;
        }


		return {
            on: self.on,
            trigger: self.trigger,//自定义事件
			check: check,
            getStatus: getStatus,
            updateMsg: updateMsg,
            addRules: addRules,
            removeRules: removeRules,
            getGroup: getGroup
		}

	}



	/*
	* 所有表单验证的总对象Validate
	* @param cklists[数组对象] 多个需要验证的表单规则集合
	*        selector [string],
	*        group [Array]
	*        checkList：[Array]
	*        checklist其中的每个对象包含字段：
				{
					rule: 验证规则（自定义function或者string）;
					msg：验证不通过的提示信息,
					ruleData: rule执行时的数据
				}
	* @param opt[object] {formSelector, isImmediate：是否立即检查, singleHandler:该参数可选，有默认}
	*/
	function Validate(cklists, opt) {
		//公用参数
		var op = {}, self = this,
			skipList = [], //被忽略验证的字段(表单name)数组
			singleList = {},//生成的ValidateSingle对象集合
			defEvt,
			rulesCkbox,
			rulesText;

		//默认给表单元素绑定的事件
		defEvt = {
			EvtChbox: 'click',
			EvtSelect: 'change',
			EvtText: 'blur'
		};
		//checkbox or radio 的验证规则
		rulesCkbox = {
			//必填
			'required': function(targetEles) {
				return !!targetEles.filter(':checked').length;	
			},
			'maxSelected': function(targetEles, max) {
				max ? '' : (max = targetEles.length);
				return (targetEles.filter(':checked').length <= max);
			}
		};
		//针对非checkbox/radio(select可以获取val[option的value值]，且做为判断)
 		rulesText = {
 			'required': function(tarEle) {//必填
 				var val = $.trim(tarEle.val());
 				return (val.length > 0) && (val != tarEle.attr('placeholder'));
 			},
 			'integer': function(tarEle) { //整数
 				return /^-?[\d]+$/.test($.trim(tarEle.val()));
 			},
 			'interger1': function(tarEle) { //正整数，不包括0
 				return /^([1-9]|[1-9][\d]+)$/.test($.trim(tarEle.val())); 
 			},
 			'interger2': function(tarEle) { //正整数，包括0
 				return /^[\d]+$/.test($.trim(tarEle.val())); 

 			},
 			'decmal': function(tarEle) {//浮点数（包含0和整数）
 				return /^-?[\d]+.[\d]+?$/.test($.trim(tarEle.val())); 
 			},
 			'decmal1': function(tarEle) {//正浮点数（包含0）
 				return /^[\d]+.[\d]+?$/.test($.trim(tarEle.val()));  
 			},
 			'decmal2': function(tarEle) { //正浮点数（包含0，保留两位小数）
 				return /^[\d]+.[\d]{1,2}}?$/.test($.trim(tarEle.val()));  
 			},
 			'email': function(tarEle) {
 				return /^([a-zA-Z0-9_\\.\-])+\@(([a-zA-Z0-9\-])+\\.)+([a-zA-Z0-9]{2,4})$/.test($.trim(tarEle.val()));   				
 			},
 			'chinese': function(tarEle) { // 中文
 				return /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/.test($.trim(tarEle.val()));
 			},
 			'zipcode': function(tarEle) { //邮编
 				return /^[\d]{6}$/.test($.trim(tarEle.val()));  
 			},
 			'qq': function(tarEle) {
 				return /^[1-9][\d]{4,9}$/.test($.trim(tarEle.val())); 
 			},
 			'mobile': function(tarEle) { //手机号
 				return /^1(3|5|8|4|7)[\d]{9}$/.test($.trim(tarEle.val())); 
 			},
 			'username': function(tarEle) {//注册用户名：匹配由26个字母/数字，或者下划线组成的字符串
 				return /^\w+$/.test($.trim(tarEle.val())); 
 			},
 			equal: function(tarEle,eqVal) { //等于某个值
 				return (tarEle.val() === eqVal);
 			},
 			'not': function(tarEle, notVal){
 				return (tarEle.val() !== notVal);
 			},
 			'maxLength': function(tarEle, maxL) {
 				return (tarEle.val().length <= maxL);
 			},
 			'minLength': function(tarEle, minL) {
 				return (tarEle.val().length >= minL);
 			},
 			'maxVal': function(tarEle, maxVal) {
 				return (tarEle.val() * 1) <= maxVal;
 			},
 			'minVal': function(tarEle, minVal) {
 				return (tarEle.val() * 1) >= minVal;
 			},
 			'remote': function() {//进行远程验证

 			}
		};
 

		init();

		function init() {
			//将事件的自定义继承到Validate的prototype上，但它自身的实现是模块模式
			lib.inherit(self, lib.customEvent);
			op = $.extend(op, opt);
			$.each(cklists, function(i, v) {
				instanceObj(v);
			});
			$(op.formSelector).on('submit', function() {
				return checkAll();
			});
		}

		/*
		* 将用户自定义的表单验证规则实例化为对应的ValidateSingle对象
		* @param cklist[obj]  {
		*   selector,
		*   group,
		*   [rules Array]
		* }
		*/
		function instanceObj(cklist) {
			var ele = $(cklist.selector), type, sinOpts, name;
			if (ele && ele.length && cklist.checklist.length) {
				type = ele.attr('type');
                name = ele.attr('name');
                sinOpts = {
					ele: ele,
                    name: name,
                    group: cklist.group,
					rules: cklist.checklist,
					ruleBase: (type == 'checkbox' || type == 'radio') ? rulesCkbox : rulesText,
					defEvt: defEvt
				};
				singleList[name] = new ValidateSingle(sinOpts);
				singleList[name].on('success error remoteBegin remoteEnd', function(evtType, singleObj, msg) {
                    groupHandler(ele, evtType, singleObj, msg);
				});
			}
		}

        /*
        * 针对群组进行处理，因为可能多个表单元素共用一个错误提示信息
        * */
        function groupHandler(ele, evtType, singleObj, msg) {
            var group = singleObj.getGroup(), res = true, reStatus;
            if (group && evtType == 'success') {
                $.each(group, function(i, name) {
                    var status = singleList[name].getStatus()['st'];
                    if (status == 'error') {
                        singleList[name].check();
                        reStatus = singleList[name].getStatus();
                        if (reStatus['st'] == 'error') {
                            evtType = 'error';
                            msg = reStatus['msg'];
                            return;
                        }
                    }
                });
            }
            op.singleHandler(ele, evtType, singleObj, msg);
        }

		/*
		* 一次性检测所有表单是否验证成功
		* 点击“提交”按钮，在提交之前是可以指定bfSberror和bfSbSuccess函数
		* @param isSkip[boolean] 是否不验证事先指定的skipList
		* @param evtData[Array] 执行bfSbSuccess或bfSberror时所需数据
		*/
		function checkAll(isSkip, evtData) {
            var skip = isSkip ? skipList : [], i, ret = true;
            for (i in singleList) {
                if (singleList.hasOwnProperty(i)) {
                    if ($.inArray(i, skip)) {
                        continue;
                    }
                    //验证通过的就不需要再验证了
                    if (singleList[i].getStatus().st == 'error') {
                        if (!singleList[i].check()) {
                            ret = false;
                            break;
                        }
                    }

                }
            }
            if (ret) {
                self.trigger('bfSbSuccess', evtData);
            } else {
                self.trigger('bfSberror', evtData);
            }
            return ret;

		}

        /*
        * 永久移除某个表单字段
        * @param sgList [Array] 需要移除的字段（表单name）集合
        * */
        function removeSingle(sgList) {
            $.each(sgList, function(i, name) {
                singleList[name] && (delete singleList[name]);
            });
            return singleList;
        }

        /*
        * 验证给定的表单字段列表
        * @param list [Array] 需要验证的字段（表单name）集合
        * @param 返回验证是否完全通过
        * */
        function checkByList(list) {
            var res = true;
            $.each(list, function(i, name) {
                if (singleList[name] && singleList[name].getStatus() !== 'success') {
                    !singleList[name].check() ? (res = false) : '';
                }
            });
            return res;
        }

        /*
        * 添加忽略字段
        * @param skipList [Array or String] 需要忽略的字段（表单name）集合
        * @param 返回添加后的skip字段集合
        * */
        function addSkip(skipArr) {
            var skip = (typeof skipArr == 'string') ? [skipArr] : skipArr;
            $.each(skip, function(i, v) {
                !$.inArray(v, skipList) ? skipList.push(v) : '';
            });
            return skipList;
        }

        /*
        * 移除已有的skip字段
        * @param removeSkipArr [Array or String] 需要移除的skip字段
        * @return 返回remove后的skip字段集合
        * */
        function removeSkip(removeSkipArr) {
            var removeSkip = (typeof removeSkipArr == 'string') ? [removeSkipArr] : removeSkipArr;
            $.each(skipList, function(i, v) {
                $.inArray(v, removeSkip) ? (delete skipList[i]) : '';
            });
            return skipList;
        }


		return {
            on: self.on,
            trigger: self.trigger,//以上两个为自定义事件
            checkAll: checkAll,
            removeSingle: removeSingle,
            checkByList: checkByList,
            addSkip: addSkip,
            removeSkip: removeSkip
		};
	}

	lib.namespace('lib.validate');
	lib.validate = Validate;

})(jQuery);