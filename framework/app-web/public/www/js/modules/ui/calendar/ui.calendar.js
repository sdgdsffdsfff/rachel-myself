define('ui.calendar', ['zepto'], function($){
    console.log('i am a calendar.');

    $.calendar = function(date) {

        function init(date) {
            date?setDate(date):null;
        }
        function setDate(date) {
            console.log('set date: ' + date);
        }

        init(date);

        return{
            setDate: setDate
        }
    };

    return $.calendar;
});