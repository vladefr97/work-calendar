define('calendarCell', ['jquery'], function ($) {
    return function (selector) {
        $(selector).on('click', () => {
            this.toggleActivation();
        })
        this.data = {
            isActive: false
        }
        this.toggleActivation = () => {
            $(selector).toggleClass('active');
        };
        this.resetActive = () => {
            $(selector).removeClass('active');
        }
        this.setActive = () => {
            $(selector).addClass('active');
        }

    };
})

