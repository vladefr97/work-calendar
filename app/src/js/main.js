require(['config'], function () {
    require(['jquery', 'calendar', 'jqueryMaskedInput'], function ($, Calendar) {
        let calendar = new Calendar();
        calendar.init();
        calendar.limitByTimeInterval('00:00','24:00');
        $('.auto-fill').on('click', () => {
            calendar.fill();
        });
        $('.auto-clear').on('click', () => {
            calendar.clear();
        });
        $('input.calendar').mask('99:99');

        $('.control-button.next').on('click', () => {
            calendar.limitByTimeInterval($('.calendar.start').val(), $('.calendar.end').val());
            // calendar.deleteColumn();
        });
        $('.control-button.back').on('click', () => {
            calendar.appendColumn();
        });
    });


    // sec.appendRow();


    // require(['calendar'], function () {
    //         const calendar = new Table('ddd')
    //         calendar.appendRow();
    // })
    // define(['jquery'],function ($){
    //     // const calendar = new Table('ddd')
    //     // calendar.appendRow();
    // })
    // const Table = require(['project/calendar'])
})
