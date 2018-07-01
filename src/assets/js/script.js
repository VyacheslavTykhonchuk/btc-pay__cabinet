(function ($) {
    "use strict";

    window.btcPay = $.extend({}, {
        winWidth: $(window).width(),
        winHeight: $(window).height(),
        winScroll: $(window).scrollTop(),
        preloader: $('.preloader'),
        modalWindow: $('.modal'),

        init: function () {
            btcPay.initHeader();
            btcPay.initTableDropdown();
            btcPay.initCheckbox();
        },
        initHeader: function name(params) {
            let main = $('main'),
                mainHeader = $('#mainHeader'),
                openAside = $('#openHeaderAside'),
                closeAside = $('#closeHeaderAside');

            openAside.on('click', function () {
                mainHeader.addClass('aside_visible');
                main.addClass('aside_visible');

            });
            closeAside.on('click', function () {
                mainHeader.removeClass('aside_visible');
                main.removeClass('aside_visible');
            });
        },
        initTableDropdown: function () {
            if (!$('.openSortDropdown').length) return false;
            console.log($(this));

            let openDropdown = $('.openSortDropdown');
            openDropdown.each(function () {
                $(this).on('click', function () {
                    $(this).parent('th').toggleClass('drop_opened');
                });
            });
        },
        initCheckbox: function () {
            if (!$('.haveCheckbox').length) return false;

            let parent = $('.haveCheckbox'),
                checkbox = $('.fakeCheckbox'),
                hiddenCheckbox = $('.hiddenCheckbox');


            checkbox.each(function () {

                $(this).on('click', function () {
                    $(this).toggleClass('checked');

                    if ($(this).closest(parent).find(hiddenCheckbox).prop('checked')) {
                        $(this).closest(parent).find(hiddenCheckbox).prop('checked', false);
                    }
                    else {
                        $(this).closest(parent).find(hiddenCheckbox).prop('checked', true);
                    }
                });
                if ($(this).closest(parent).find(hiddenCheckbox).prop('checked')) {
                    $(this).closest(parent).find(checkbox).addClass('checked');
                }
                else {
                    $(this).closest(parent).find(checkbox).removeClass('checked');
                }
            });

        },
    });

    btcPay.init();

})(jQuery);
