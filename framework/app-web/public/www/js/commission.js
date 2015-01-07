define(['zepto', 'zepto.temp', 'ui.autocomplete', 'zepto.sp', 'app/service/commissionService'], function ($, temp, autocomplete, sp, service) {
    var Page = function (op) {
        var self = this;
        
        self._op = $.extend({}, {
            resources: []
        }, op);

        self.auto = new autocomplete({
            resources: self._op.resources
        });

        self.$searchIpt = $('#search_input');
        self.$entrustWrap = $('#entrust_wrap');
        self.$autoIpt = $('#auto_ipt');
        self.$autoCont = $('#auto_content');
        self.$cancelAll = $('#cancel_all');
        self.$btnEntrust = $('#btn_entrust');
        self.$room = $('.room');
        self.$hall = $('.hall');
        self.$sale = $('.sale');
        self.$tele = $('.tele');
        self.$msg = $('.error-msg');
        self.$id = $('#hidden_id');
        self.$cityid = $('#hidden_cityid');
        self.$price = $('#price');

        self.init();
    }

    Page.prototype = {
        init: function () {
            var self = this;
            $('.placeholder').click(function(event) {
                $('.placeholder').hide();
                self.$price.focus();
            });
            self.$price.blur(function(event) {
                if(!self.$price.val()){
                    $('.placeholder').show();

                }
            });
            // autocomplete 注册事件
            sp.subscribe('value_changed', function (oData) {
                self.$entrustWrap.next().hide();
                self.$entrustWrap.show();
                self.$searchIpt.val(oData.name);
                self.$id.val(oData.id); 
                self.$cityid.val(oData.cityid);
            });

            sp.subscribe('search_canceled', function (oData) {
                self.$entrustWrap.next().hide();
                self.$entrustWrap.show();
            });

            sp.subscribe('error', function (key) {
                self.$msg.empty().text(Page._default[key]).addClass('show');
            });

            sp.subscribe('success', function () {
                self.$msg.empty().removeClass('show');
                var d = {
                    'city_id': self.$cityid.val(),
                    'community_id': self.$id.val(),
                    'community_name': self.$searchIpt.val(),
                    'bedrooms': $('#room').val(),
                    'living_rooms': $('#hall').val(),
                    'price': $('#price').val(),
                    'phone': $('#phone').val()
                };
                if (self.$searchIpt.data('userid')) {
                    d['user_id'] = self.$searchIpt.data('userid');
                }
                service.saveCommission({
                    data: d,
                    sucFn: function (data) {
                       window.location.href = data.redirect;
                    },
                    error: function (data) {
                        self.$msg.empty().text(data.msg).addClass('show');
                    }
                });
            });

            self.$searchIpt.focus(function (e) {
                e.preventDefault();
                self.$entrustWrap.hide().next().show();
                self.$autoIpt.val(self.$searchIpt.val());
                if(self.$autoIpt.val()){
                    self.$cancelAll.show();
                    self.auto.getResult();
                }else{
                    self.$cancelAll.hide();
                    self.$autoCont.hide();
                }
                self.$autoIpt.focus();
            });

            self.$btnEntrust.on('tap', function (e) {
                self.validate();
            });
        },
        validate: function () {
            var self = this,
            rule = Page._rulesText;
            if (!rule.areaName(self.$searchIpt.val())) {
                sp.publish('error', ['name']);
                return;
            }
            if (!rule.room(self.$room.val())) {
                sp.publish('error', ['room']);
                return;
            }
            if (!rule.hall(self.$hall.val())) {
                sp.publish('error', ['hall']);
                return;
            }
            if (!rule.sale(self.$sale.val())) {
                sp.publish('error', ['sale']);
                return;
            }
            if (!rule.tele(self.$tele.val())) {
                sp.publish('error', ['tele']);
                return;
            }
            sp.publish('success');
        }
    };

    Page._rulesText = {
        areaName: function (name) {
            return !!name;
        },
        room: function (room) {
            return room >0 && room < 10;
        },
        hall: function (hall) {
            return hall <= 9;
        },
        sale: function (sale) {
            return sale !=='' && sale <= 400000;
        },
        tele: function (tel) {
            return /^1\d{10}$/.test(tel);
        }
    }

    Page._default = {
        'name': '请填写小区名字',
        'room': '室必须是1~9之间的整数',
        'hall': '厅必须是0~9之间的整数',
        'sale': '售价必须是40亿及以下的数值',
        'tele': '手机格式不正确'
    }

    new Page({
        resources: service.getCommunityList
    });
});