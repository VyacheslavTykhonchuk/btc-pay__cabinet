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
            btcPay.initGraphMenu();
            btcPay.initMainGraph();
            btcPay.initImagePreview();
            btcPay.initComission();
        },
        initHeader: function () {
            let main = $('main'),
                mainHeader = $('#mainHeader'),
                openAside = $('#openHeaderAside'),
                closeAside = $('#closeHeaderAside');

            if (btcPay.winWidth < 500) {
                mainHeader.removeClass('aside_visible');
                main.removeClass('aside_visible');
            }
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

            let openDropdown = $('.openSortDropdown');
            openDropdown.each(function () {
                $(this).on('click', function () {
                    $(this).toggleClass('drop_opened');
                    $(this).parent('th').toggleClass('drop_opened');
                });
            });

            toggleFilters();

            function toggleFilters() {
                let toggle = $('.toggleFilters');
                toggle.on('click', function () {
                    $(this).toggleClass('filtersVisible');
                });
            }
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
                    $(this).closest(parent).find(hiddenCheckbox).change();
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
                    $(this).removeClass('transparent');
                });
            });
            hideInfo.each(function (e) {
                $(this).on('click', function (e) {
                    $(this).closest(showInfo).removeClass('showInfo__visible');
                    $(this).closest(showInfo).addClass('transparent');
                    e.stopPropagation();
                });
            });
        },
        initBalances: function () {
            if (!$('.balanceItem').length) return false;
            let balanceItem = $('.balanceItem'),
                openWithdraw = $('.openWithdraw');

            dynamicLayout();
            initOpenWithdraw();
            initScrollReveal();

            function initScrollReveal() {
                let el = $('.balanceItem.transparent');

                el.each(function () {
                    let elCenter = 0,
                        elOffset = $(this).offset().top,
                        $this = $(this);

                    $(window).on('scroll', function () {
                        let scroll = ($(window).scrollTop() + $(window).innerHeight() - 250);

                        if ((elOffset - elCenter) < scroll) {
                            $this.removeClass('transparent');
                        }
                    });
                });
            }
            function initOpenWithdraw() {
                openWithdraw.each(function (e) {
                    $(this).on('click', function (e) {
                        if (!$(this).closest(balanceItem).hasClass('withdraw_opened')) e.preventDefault();

                        $(this).addClass('noTransition');
                        $(this).closest(balanceItem).addClass('withdraw_opened');
                        e.stopPropagation();

                        // call re-shuffle
                        dynamicLayout();

                        $(this).removeClass('noTransition');
                    });
                });
            }
            function dynamicLayout() {
                let grid = document.querySelector('.dynamic_layout');

                if (btcPay.winWidth > 430) {
                    let msnry = new Masonry(grid, {
                        itemSelector: '.dynamic_layout__item',
                        columnWidth: '.dynamic_layout__item',
                        percentPosition: true,
                        horizontalOrder: true
                    });
                }

            }
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
        initGraphMenu: function () {
            if (!$('.graphMenu').length) return false;
            let graphMenu = $('.graphMenu'),
                openMenu = $('.openGraphMenu'),
                closeMenu = $('.closeGraphMenu');
            openMenu.on('click', function () {
                $(this).closest(graphMenu).addClass('opened');
            });
            closeMenu.on('click', function () {
                $(this).closest(graphMenu).removeClass('opened');
            });
        },
        initImagePreview() {
            if (!$('#upload').length) return false;

            $("#upload").change(function () {
                readURL(this);
                $('#uploadPhoto').find('svg').hide();
                $('#uploadPhoto').find('span').hide();
            });

            function readURL(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $('#uploadedImage').attr('src', e.target.result);
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            }
        },
        initComission() {
            if (!$('.comissionHolder').length) return false;
            let wrap = $('.comissionHolder');

            wrap.each(function () {
                let abs = $(this).find('input[name="absolute"]'),
                    per = $(this).find('input[name="percents"]');

                abs.on('change', function () {
                    let checked = this.checked;
                    if (checked) {
                        $(this).closest('.comissionHolder').find('.comissionPercent').hide();
                    }
                });
                per.on('change', function () {
                    let checked = this.checked;
                    if (checked) {
                        $(this).closest('.comissionHolder').find('.comissionPercent').show();
                    }
                });
            });
        },
        initMainGraph: function () {
            if (!$('.mainGraph').length) return false;
            let initRange = '7';

            // test arr
            const dateArr = [];

            generateLabelsArr();
            drawGraph(dateArr, initRange);
            findRange();

            function generateLabelsArr() {
                let date = new Date(),
                    month = date.getMonth(),
                    year = date.getFullYear(),
                    daysInCurrentMonth,
                    days;

                daysInCurrentMonth = function () {
                    return new Date(year, month, 0).getDate();
                };

                days = daysInCurrentMonth();

                for (let index = 1; index <= days; index++) {
                    let str = '';
                    if (month < 10) {
                        str = index + '/0' + month;
                    } else {
                        str = index + '/' + month;
                    }
                    dateArr.push(str);
                }
            }
            function findRange() {
                $('.fakeCheckbox').on('click', function () {
                    let newRange = $(this).closest('.haveCheckbox').attr('data-range');
                    // clear old canvas
                    $('.mainGraphCanvas').remove();
                    $('.mainGraph').append('<canvas class="mainGraphCanvas"></canvas>');
                    // 
                    drawGraph(dateArr, newRange);
                });
            }

            function drawGraph(arr, range) {
                // make arr copy
                let localArr = Array.from(arr);
                let bulletRadius = 10;

                // pop arr
                while (localArr.length > +range) {
                    localArr.pop();
                }
                // dymanic bullet size
                if (range == 14) {
                    bulletRadius = 8;
                } else if (range > 25) {
                    bulletRadius = 6;
                }

                // graph initialization
                let ctx = $('.mainGraphCanvas');
                let data = {
                    labels: localArr,
                    datasets: [
                        {
                            label: 'BTC',
                            data: [2, 1.5, 1.7, 1.8, 1.9, 2, 2.1, 2, 1.5, 1.7, 1.8, 1.9, 2, 2.1, 2, 1.5, 1.7, 1.8, 1.9, 2, 2.1, 2, 1.5, 1.7, 1.8, 1.9, 2, 2.1, 2, 1.5, 1.7, 1.8, 1.9, 2, 2.1, 2, 1.5, 1.7, 1.8, 1.9, 2, 2.1],
                            borderWidth: 4,
                            pointBackgroundColor: 'hsl(47, 94%, 68%)',
                            pointBorderColor: 'hsl(0, 0%, 100%)',
                            pointBorderWidth: 3,
                            pointRadius: bulletRadius,
                            pointHoverRadius: 10,
                            cubicInterpolationMode: 'monotone',
                            backgroundColor: [
                                'hsla(55, 94%, 54%,0.17)'
                            ],
                            borderColor: [
                                'hsl(47, 94%, 68%)'
                            ],
                        },
                        {
                            label: 'EOS',
                            data: [3, 2, 2.3, 2.6, 2.7, 2.8, 3, 3, 2, 2.3, 2.6, 2.7, 2.8, 3, 3, 2, 2.3, 2.6, 2.7, 2.8, 3, 2, 2.3, 2.6, 2.7, 2.8, 3, 3, 2, 2.3, 2.6, 2.7, 2.8, 3, 3, 2, 2.3, 2.6, 2.7, 2.8, 3],
                            borderWidth: 4,
                            pointBackgroundColor: 'hsl(191, 100%, 50%)',
                            pointBorderColor: 'hsl(0, 0%, 100%)',
                            pointBorderWidth: 3,
                            pointRadius: bulletRadius,
                            pointHoverRadius: 10,
                            cubicInterpolationMode: 'monotone',
                            backgroundColor: [
                                'hsla(191, 100%, 50%,.15)'
                            ],
                            borderColor: [
                                'hsl(191, 100%, 50%)'
                            ],
                        },
                        {
                            label: 'ETH',
                            data: [1, 0.1, 0.2, 0.5, 0.8, 0.1, 1, 1, 0.1, 0.2, 0.5, 0.8, 0.1, 1, 1, 0.1, 0.2, 0.5, 0.8, 0.1, 1, 0.1, 0.2, 0.5, 0.8, 0.1, 1, 1, 0.1, 0.2, 0.5, 0.8, 0.1, 1, 1, 0.1, 0.2, 0.5, 0.8, 0.1, 1],
                            borderWidth: 4,
                            pointBackgroundColor: 'hsl(287, 100%, 48%)',
                            pointBorderColor: 'hsl(0, 0%, 100%)',
                            pointBorderWidth: 3,
                            pointRadius: bulletRadius,
                            pointHoverRadius: 10,
                            cubicInterpolationMode: 'monotone',
                            backgroundColor: [
                                'hsla(287, 100%, 48%,0.15)'
                            ],
                            borderColor: [
                                'hsl(287, 100%, 48%)'
                            ],

                        },

                    ]

                };
                let options = {
                    maintainAspectRatio: false,
                    legend: {
                        display: false,
                    },

                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 32,
                            bottom: 0
                        }
                    },
                    scales: {

                        xAxes: [{
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)",
                                drawBorder: false,
                                display: false,

                            },
                            ticks: {
                                fontFamily: "CoreSansG",
                                fontSize: 12,
                                fontColor: 'hsla(0, 0%, 11%,0.5)',
                                // callback: function (value, index, values) {
                                //     if (index == 0) {
                                //         return null;
                                //     } else {
                                //         return index;
                                //     }
                                // }
                            },

                        }],
                        yAxes: [{
                            gridLines: {
                                drawBorder: false,

                            },
                            pointLabels: false,
                            ticks: {
                                min: 0,
                                max: 3.2,
                                stepSize: 1,
                                beginAtZero: true,
                                callback: function (value, index, values) {
                                    if (index == 0) {
                                        return null;
                                    } else {
                                        return '';
                                    }
                                }
                            }
                        }]
                    }
                };

                let myLineChart = new Chart(ctx, {
                    type: 'line',
                    data: data,
                    options: options

                });
            }

        }
    });
    $(document).ready(function () {
        btcPay.init();
    });

})(jQuery);

// 



function showPopup(obj) {
    let el = obj.type,
        msg = obj.message,
        textEl = el.querySelector('.popup__text');

    textEl.innerHTML = msg;
    el.classList.add('visible');
    setTimeout(() => {
        el.classList.remove('visible');
    }, 5000);
}