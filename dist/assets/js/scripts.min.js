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
            btcPay.initSupportInfo();
            btcPay.initBalances();
            btcPay.initUploadPhoto();
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

                    if ($(this).hasClass('fakeRadio')) {
                        $(this).closest(parent).siblings().find('.fakeCheckbox').removeClass('checked');
                        if ($(this).closest(parent).find(hiddenCheckbox).prop('checked')) {
                            $(this).closest(parent).find(hiddenCheckbox).prop('checked', false);
                            $(this).closest(parent).removeClass('radioActive');
                        }
                        else {
                            $(this).closest(parent).siblings().find(hiddenCheckbox).prop('checked', false);
                            $(this).closest(parent).siblings().removeClass('radioActive');
                            $(this).closest(parent).addClass('radioActive');
                            $(this).closest(parent).find(hiddenCheckbox).prop('checked', true);
                        }
                    } else {
                        if ($(this).closest(parent).find(hiddenCheckbox).prop('checked')) {
                            $(this).closest(parent).find(hiddenCheckbox).prop('checked', false);
                        }
                        else {
                            $(this).closest(parent).find(hiddenCheckbox).prop('checked', true);
                        }
                    }
                });


            });
            function initLoadCheckboxes() {
                checkbox.each(function () {
                    if ($(this).hasClass('fakeRadio')) {
                        if ($(this).closest(parent).find(hiddenCheckbox).prop('checked')) {
                            $(this).closest(parent).find(checkbox).addClass('checked');
                            $(this).closest(parent).addClass('radioActive');
                            $(this).closest(parent).siblings().find('.fakeCheckbox').removeClass('checked');
                            $(this).closest(parent).siblings().removeClass('radioActive');
                            $(this).closest(parent).siblings().find(hiddenCheckbox).prop('checked', false);
                        }
                        else {
                            $(this).closest(parent).find(checkbox).removeClass('checked');
                            $(this).closest(parent).removeClass('radioActive');

                        }
                    } else {
                        if ($(this).closest(parent).find(hiddenCheckbox).prop('checked')) {
                            $(this).closest(parent).find(checkbox).addClass('checked');
                        }
                        else {
                            $(this).closest(parent).find(checkbox).removeClass('checked');
                        }
                    }
                });
            }
            initLoadCheckboxes();
        },
        initSupportInfo: function () {
            if (!$('.showInfo').length) return false;
            let showInfo = $('.showInfo'),
                hideInfo = $('.hideInfo');
            showInfo.each(function () {
                $(this).on('click', function () {
                    $(this).addClass('showInfo__visible');
                });
            });
            hideInfo.each(function (e) {
                $(this).on('click', function (e) {
                    $(this).closest(showInfo).removeClass('showInfo__visible');
                    e.stopPropagation();
                });
            });
        },
        initBalances: function () {
            if (!$('.balanceItem').length) return false;
            let balanceItem = $('.balanceItem'),
                openWithdraw = $('.openWithdraw');

            openWithdraw.each(function (e) {
                $(this).on('click', function (e) {
                    console.log(e);
                    if ($(this).closest(balanceItem).hasClass('withdraw_opened')) return false;
                    console.log(e);

                    e.preventDefault();
                    $(this).closest(balanceItem).addClass('withdraw_opened');

                    e.stopPropagation();
                });
            });
        },
        initUploadPhoto: function (e) {
            if (!$('#uploadPhoto').length) return false;
            let uploadPhoto = $('#uploadPhoto'),
                hiddenInput = $('#upload');
            uploadPhoto.on('click', function () {
                document.querySelector('input#upload').click();
            });
        },
    });

    btcPay.init();

})(jQuery);
