define("ui.autocomplete", ['zepto', 'zepto.sp', 'zepto.temp'], function($, sp, temp) {
    "use strict";

    var AutoComplete = function(_op) {
        var self = this;
        self.op = $.extend({}, {
            inputSelect: '#auto_ipt', // input id
            resources: [],
            listSelect: '#auto_content', // list box
            liSelect: 'div.item', //
            boxSelect: null,
            liTpl: 'autocomplete_tpl'
        }, _op);

        self.dom = $(self.op.inputSelect);
        self.list = $(self.op.listSelect);
        self.contentBox = self.op.boxSelect == null ? self.list : $(self.op.boxSelect);
        self.cancelBtn = $('#btn_cancel');
        self.cancelAll =$('#cancel_all');
        self.init();
    }

    AutoComplete.prototype.init = function() {
        var self = this;
        self.list.on('tap', self.op.liSelect, function(e) {
            $(self.dom).val($(this).data('name'));
            sp.publish('value_changed', [{name: $(this).data('name'), cityid: $(this).data('cityid'), id: $(this).data('id')}]);
            self.close();
        });
        self.dom.on('input', function (e) {
            self.getResult();
        });

        self.cancelBtn.on('tap', function (e) {
            e.preventDefault();
            self.list.hide();
            sp.publish('search_canceled', []);
        });
        self.cancelAll.on('tap', function(e){
            e.preventDefault();
            self.cancelSearch();
        })
    }

    AutoComplete.prototype.getResult = function() {
        var self = this,
            val = $.trim(self.dom.val());
        if(!val) {
            self.cancelAll.hide();
            self.list.hide();
            return;
        }
        self.cancelAll.show();
        if($.isArray(self.op.resources)) {
            var _r = self.op.resources;
            self.dataHandle(_r);
        } else if (typeof self.op.resources == 'string') {
            $.ajax({
                type: 'post',
                url: self.op.resources,
                data: self.op.reqDataInit(val),
                dataType: 'json',
                success: function(da) {
                    var _da = self.op.repDataInit(da);
                    self.dataHandle(_da);
                }
            });
        } else {
            self.op.resources({
                data: {
                    keyword: val
                },
                sucFn: function (data) {
                    self.dataHandle(data);
                },
                errFn: function () {}
            });
        }
    }

    AutoComplete.prototype.dataHandle = function(_da) {
        var self = this;
        self.da = _da;
        self.contentBox.html(temp(self.op.liTpl, {'names': _da}));
        self.open();
    }

    AutoComplete.prototype.close = function () {
        this.contentBox.empty().hide();
    }

    AutoComplete.prototype.open = function () {
        this.contentBox.show();
    }

    AutoComplete.prototype.cancelSearch = function(){
        var self= this;
        self.dom.val('');
        self.cancelAll.hide();
        self.list.hide();
    }

    return AutoComplete;
});