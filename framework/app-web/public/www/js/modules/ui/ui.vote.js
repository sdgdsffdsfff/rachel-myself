define("ui.vote", ['zepto', 'zepto.sp'], function($, sp) {
    "use strict";

    ;(function($) {
        var e = {
            nextAll: function(s) {
                var $els = $(), $el = this.next()
                while( $el.length ) {
                    if(typeof s === 'undefined' || $el.is(s)) $els = $els.add($el)
                    $el = $el.next()
                }
                return $els
            },
            prevAll: function(s) {
                var $els = $(), $el = this.prev()
                while( $el.length ) {
                    if(typeof s === 'undefined' || $el.is(s)) $els = $els.add($el)
                    $el = $el.prev()
                }
                return $els
            }
        };

        $.extend($.fn, e);
    })(Zepto);

    var Vote = function (op) {
        var self = this;

        self._op = $.extend({}, {
            commitVote: null
        }, op);
        
        self.$voteBox = $('#vote-box');
        self.$star = self.$voteBox.find('.star');
        self.$item = self.$star.find('i');
        self.$btn = self.$voteBox.find('.btn-commit');
        self.$ipt = self.$voteBox.find('textarea[name="vote"]');

        self.count = 0;
        self.init();
    }

    Vote.prototype.init = function () {
        var self = this;

        self.$star.on('click', 'i', function (e) {
            var $t = $(e.target);
            if ($t.is('.edit')) {
                return;
            }

            var index = self.$item.index($(this));
            self.count = $(this).data('count');
            $(this).prevAll().addClass('selected');
            $(this).addClass('selected');
            $(this).nextAll().removeClass('selected');
        });

        self.$btn.on('click', function (e) {
            if(!self.count){
                $('.error').text('请选择服务评价');
                return;
            }
            $('.error').text('');
            $(this).addClass('com-btn-dis');
            self.$star.find('i').addClass('edit');
            sp.publish('vote_committed', [{
                'scheid': self.$btn.data('scheid'),
                'level': self.count,
                'content': self.$ipt.val()
            }]);
        });

        sp.subscribe('vote_commit_succeed', function (d) {
            self.$btn.hide();
            self.$ipt.hide();
            $('.vote-msg').removeClass('hidden').empty().html(d.content);
        });

        sp.subscribe('vote_commit_error', function (d) {

        });
    }

    return Vote;
});