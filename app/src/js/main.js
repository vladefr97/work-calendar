require(['config'], function () {
    require(['jquery', 'calendar', 'jqueryMaskedInput'], function ($, Calendar) {
        let calendar = new Calendar();
        calendar.init();
        calendar.limitByTimeInterval('00:00', '24:00');
        //Fill button handling
        $('.auto-fill').on('click', () => {
            calendar.fill();
        });
        //Clear button handling
        $('.auto-clear').on('click', () => {
            calendar.clear();
        });
        //Time inputs handling
        $('input.calendar').mask('99:99').on('change', () => {
            let hasEmptyInput = false;
            $.each($('input.calendar'), (index, input) => {
                if ($(input).val() === '') {
                    hasEmptyInput = true;
                }
            })
            if (!hasEmptyInput)
                calendar.limitByTimeInterval($('.calendar.start').val(), $('.calendar.end').val());
        })

    });

})
