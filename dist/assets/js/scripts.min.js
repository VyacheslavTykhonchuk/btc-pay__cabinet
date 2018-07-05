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
            btcPay.initCustomSelect();

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

                    if ($(this).hasClass('fakeRadio')) {
                        if ($(this).closest(parent).find(hiddenCheckbox).prop('checked')) {
                            return;
                        }
                        else {
                            $(this).closest(parent).siblings().find('.fakeCheckbox').removeClass('checked');
                            $(this).closest(parent).siblings().find(hiddenCheckbox).prop('checked', false);
                            $(this).closest(parent).siblings().removeClass('radioActive');
                            $(this).closest(parent).addClass('radioActive');
                            $(this).closest(parent).find(hiddenCheckbox).prop('checked', true);
                            $(this).toggleClass('checked');

                        }
                    } else {
                        $(this).toggleClass('checked');

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
                    if ($(this).closest(balanceItem).hasClass('withdraw_opened')) return false;
                    e.preventDefault();
                    $(this).addClass('noTransition');
                    $(this).closest(balanceItem).addClass('withdraw_opened');
                    e.stopPropagation();
                    dynamicLayout();
                    $(this).removeClass('noTransition');
                });
            });

            function dynamicLayout() {
                let grid = document.querySelector('.dynamic_layout');
                let msnry = new Masonry(grid, {
                    itemSelector: '.dynamic_layout__item',
                    columnWidth: '.dynamic_layout__item',
                    percentPosition: true
                });
            }
            dynamicLayout();


        },
        initUploadPhoto: function (e) {
            if (!$('#uploadPhoto').length) return false;
            let uploadPhoto = $('#uploadPhoto'),
                hiddenInput = $('#upload');
            uploadPhoto.on('click', function () {
                document.querySelector('input#upload').click();
            });
        },
        initCustomSelect: function () {
            if (!$('.custom_select').length) return false;
            let toggleSelect = $('.toggleSelect'),
                selectOption = $('.selectOption'),
                showOptions = $('.showOptions'),
                hideOptions = $('.hideOptions');

            toggleSelect.each(function () {
                $(this).on('click', function () {
                    $(this).closest('.custom_select').toggleClass('opened');
                });
            });
            selectOption.each(function () {
                $(this).on('click', function () {
                    let newCurrency = $(this).attr('data-currency'),
                        prevCurrency = $(this).closest('.custom_select').find('.custom_select__choosen').attr('data-choosen');

                    $(this).closest('.custom_select').find('.custom_select__choosen').attr('data-choosen', newCurrency);
                    $(this).attr('data-currency', prevCurrency);
                    $(this).closest('.custom_select').toggleClass('opened');
                    refreshItemData($('.custom_select__choosen'));
                    refreshItemData($(this));
                });
            });

            function refreshItemData(item) {
                item.each(function () {
                    if ($(this).attr('data-choosen')) {
                        let data = $(this).attr('data-choosen');
                        $(this).find('span').html($(this).attr('data-choosen'));
                    } else {
                        let data = $(this).attr('data-currency');
                        $(this).find('span').html($(this).attr('data-currency'));
                    }
                });
            }
        },
    });
    $(document).ready(function () {
        btcPay.init();
    });

})(jQuery);
