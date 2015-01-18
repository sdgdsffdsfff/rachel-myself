define(['zepto', 'zepto.sp', 'ui.doublewheel'], function($, sp, doublewheel) {
    var $btn = $('#testBtn');

    dealWheel();

    function dealWheel () {
        var timeInfo = {
            showLeft: '不限',
            hideLeft: '0000-00-00',
            showRight: '不限',
            hideRight: '00:00:00'
        };
        var wheel = new doublewheel({
            doubleH: 248,
            elements: {
                $doubleAll: $('.double-all'),
                $mask: $('.mask-double'),
                $wheel: $('.double-wheel'),
                $btnCancel: $('.btn-cancel-wheel'),
                $btnSure: $('.btn-sure-wheel'),
                $columnLeft: $('.column-left'),
                $columnRight: $('.column-right')
            }
        });
        wheel.setScrolledCb(leftScrollCb, rightScrollCb);
        wheel.scrollToIndex(1, 1);
        $btn.on('tap', function() {
            wheel.show();
        });
        sp.subscribe('double.btnSure', function() {
            sureRoom();
            wheel.hide();
        });
        sp.subscribe('double.btnCancel', function() {
            wheel.hide();
        });

        function sureRoom() {
            timeInfo = wheel.getSelected();
            console.log(timeInfo);
            var val = timeInfo.showLeft + timeInfo.showRight;
            $btn.val(val);
        }

        function leftScrollCb() {
            var seletedIdx = wheel.getSelectedIdx();
            var opts = wheel.getOpts();
            var $items = opts.$left.find('.' + opts.leftItemName),
                sltedIndex = seletedIdx.leftIdx,
                sltedLeftClass = opts.sltedLeftClass;
            wheel.defaultCb($items, sltedIndex, sltedLeftClass);
        }

        function rightScrollCb() {
            var seletedIdx = wheel.getSelectedIdx();
            var opts = wheel.getOpts();
            var $items = opts.$right.find('.' + opts.rightItemName),
                sltedIndex = seletedIdx.rightIdx,
                sltedRightClass = opts.sltedRightClass;
            wheel.defaultCb($items, sltedIndex, sltedRightClass);
        }
    }
});
