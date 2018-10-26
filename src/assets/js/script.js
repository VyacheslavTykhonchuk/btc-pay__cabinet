(function($) {
  'use strict';

  window.btcPay = $.extend(
    {},
    {
      winWidth: $(window).width(),
      winHeight: $(window).height(),
      winScroll: $(window).scrollTop(),
      preloader: $('.preloader'),
      modalWindow: $('.modal'),

      init: function() {
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
        btcPay.initCopyBlock();
        btcPay.initPlansForm();
      },
      initPlansForm() {
        if (!$('.select-form-hidden').length) return;
        const selectFormHidden = $('.select-form-hidden');
        const btn = $('.showSelectForm');
        btn.each(function() {
          const btn = $(this);
          btn.on('click', function(e) {
            e.preventDefault();
            const block = btn.parent('.billing-plan');
            block.find('.select-form-hidden').addClass('visible');
            block.find('.billing-plan__price').hide();
            block.find('.billing-plan__text-title').hide();
            block.find('.billing-plan__text').hide();
            btn.hide();
          });
        });
      },
      initCopyBlock: function() {
        let copyBlock = $('.copyBlock'),
          btn = copyBlock.find('.copyInputVal'),
          input = copyBlock.find('.inputToCopy');

        btn.on('click', function() {
          input.select();
          document.execCommand('copy');
          input.blur();
          copyBlock.addClass('show-copy');
          setTimeout(() => {
            copyBlock.removeClass('show-copy');
          }, 1750);
        });
      },
      initHeader: function() {
        let main = $('main'),
          mainHeader = $('#mainHeader'),
          openAside = $('#openHeaderAside'),
          closeAside = $('#closeHeaderAside');

        if (btcPay.winWidth < 500) {
          mainHeader.removeClass('aside_visible');
          main.removeClass('aside_visible');
        }
        openAside.on('click', function() {
          mainHeader.addClass('aside_visible');
          main.addClass('aside_visible');
        });
        closeAside.on('click', function() {
          mainHeader.removeClass('aside_visible');
          main.removeClass('aside_visible');
        });
      },
      initTableDropdown: function() {
        if (!$('.openSortDropdown').length) return false;

        let openDropdown = $('.openSortDropdown');
        openDropdown.each(function() {
          $(this).on('click', function() {
            $(this).toggleClass('drop_opened');
            $(this)
              .parent('th')
              .toggleClass('drop_opened');
          });
        });

        toggleFilters();

        function toggleFilters() {
          let toggle = $('.toggleFilters');
          toggle.on('click', function() {
            $(this).toggleClass('filtersVisible');
          });
        }
      },
      initCheckbox: function() {
        if (!$('.haveCheckbox').length) return false;

        let parent = $('.haveCheckbox'),
          checkbox = $('.fakeCheckbox'),
          hiddenCheckbox = $('.hiddenCheckbox');

        checkbox.each(function() {
          $(this).on('click', function() {
            if ($(this).hasClass('fakeRadio')) {
              if (
                $(this)
                  .closest(parent)
                  .find(hiddenCheckbox)
                  .prop('checked')
              ) {
                return;
              } else {
                $(this)
                  .closest(parent)
                  .siblings()
                  .find('.fakeCheckbox')
                  .removeClass('checked');
                $(this)
                  .closest(parent)
                  .siblings()
                  .find(hiddenCheckbox)
                  .prop('checked', false);
                $(this)
                  .closest(parent)
                  .siblings()
                  .removeClass('radioActive');
                $(this)
                  .closest(parent)
                  .addClass('radioActive');
                $(this)
                  .closest(parent)
                  .find(hiddenCheckbox)
                  .prop('checked', true);
                $(this).toggleClass('checked');
              }
            } else {
              $(this).toggleClass('checked');

              if (
                $(this)
                  .closest(parent)
                  .find(hiddenCheckbox)
                  .prop('checked')
              ) {
                $(this)
                  .closest(parent)
                  .find(hiddenCheckbox)
                  .prop('checked', false);
              } else {
                $(this)
                  .closest(parent)
                  .find(hiddenCheckbox)
                  .prop('checked', true);
              }
            }
            $(this)
              .closest(parent)
              .find(hiddenCheckbox)
              .change();
          });
        });
        function initLoadCheckboxes() {
          checkbox.each(function() {
            if ($(this).hasClass('fakeRadio')) {
              if (
                $(this)
                  .closest(parent)
                  .find(hiddenCheckbox)
                  .prop('checked')
              ) {
                $(this)
                  .closest(parent)
                  .find(checkbox)
                  .addClass('checked');
                $(this)
                  .closest(parent)
                  .addClass('radioActive');
                $(this)
                  .closest(parent)
                  .siblings()
                  .find('.fakeCheckbox')
                  .removeClass('checked');
                $(this)
                  .closest(parent)
                  .siblings()
                  .removeClass('radioActive');
                $(this)
                  .closest(parent)
                  .siblings()
                  .find(hiddenCheckbox)
                  .prop('checked', false);
              } else {
                $(this)
                  .closest(parent)
                  .find(checkbox)
                  .removeClass('checked');
                $(this)
                  .closest(parent)
                  .removeClass('radioActive');
              }
            } else {
              if (
                $(this)
                  .closest(parent)
                  .find(hiddenCheckbox)
                  .prop('checked')
              ) {
                $(this)
                  .closest(parent)
                  .find(checkbox)
                  .addClass('checked');
              } else {
                $(this)
                  .closest(parent)
                  .find(checkbox)
                  .removeClass('checked');
              }
            }
          });
        }
        initLoadCheckboxes();
      },
      initSupportInfo: function() {
        if (!$('.showInfo').length) return false;
        let showInfo = $('.showInfo'),
          hideInfo = $('.hideInfo');
        showInfo.each(function() {
          $(this).on('click', function() {
            $(this).addClass('showInfo__visible');
            $(this).removeClass('transparent');
          });
        });
        hideInfo.each(function(e) {
          $(this).on('click', function(e) {
            $(this)
              .closest(showInfo)
              .removeClass('showInfo__visible');
            $(this)
              .closest(showInfo)
              .addClass('transparent');
            e.stopPropagation();
          });
        });
      },
      initBalances: function() {
        if (!$('.balanceItem').length) return false;
        let balanceItem = $('.balanceItem'),
          openWithdraw = $('.openWithdraw');

        btcPay.dynamicLayout();
        initOpenWithdraw();
        initScrollReveal();

        function initScrollReveal() {
          let el = $('.balanceItem.transparent');

          el.each(function() {
            let elCenter = 0,
              elOffset = $(this).offset().top,
              $this = $(this);

            $(window).on('scroll', function() {
              let scroll =
                $(window).scrollTop() + $(window).innerHeight() - 250;

              if (elOffset - elCenter < scroll) {
                $this.removeClass('transparent');
              }
            });
          });
        }
        function initOpenWithdraw() {
          openWithdraw.each(function(e) {
            $(this).on('click', function(e) {
              if (
                !$(this)
                  .closest(balanceItem)
                  .hasClass('withdraw_opened')
              )
                e.preventDefault();

              $(this).addClass('noTransition');
              $(this)
                .closest(balanceItem)
                .addClass('withdraw_opened');
              e.stopPropagation();

              // call re-shuffle
              btcPay.dynamicLayout();

              $(this).removeClass('noTransition');
            });
          });
        }
      },
      dynamicLayout() {
        let grid = document.querySelector('.dynamic_layout');

        if (btcPay.winWidth > 430) {
          let msnry = new Masonry(grid, {
            itemSelector: '.dynamic_layout__item',
            columnWidth: '.dynamic_layout__item',
            percentPosition: true,
            horizontalOrder: true,
          });
        }
      },
      initUploadPhoto: function(e) {
        if (!$('#uploadPhoto').length) return false;
        let uploadPhoto = $('#uploadPhoto'),
          hiddenInput = $('#upload');
        uploadPhoto.on('click', function() {
          document.querySelector('input#upload').click();
        });
      },
      initCustomSelect: function() {
        if (!$('.custom_select').length) return false;
        const selectOption = $('.selectOption'),
          showOptions = $('.showOptions'),
          hideOptions = $('.hideOptions');
        $(document).on('click', '.toggleSelect', function() {
          $(this)
            .closest('.custom_select')
            .toggleClass('opened');
        });
        $(document).on('click', '.selectOption', function() {
          const newCurrency = $(this).attr('data-currency');
          $(this)
            .closest('.custom_select')
            .find('.custom_select__choosen span')
            .text(newCurrency);
          $(this)
            .closest('.custom_select')
            .toggleClass('opened');
        });
        // selectOption.each(function() {
        //   $(this).on('click', function() {
        //     const newCurrency = $(this).attr('data-currency');
        //     $(this)
        //       .closest('.custom_select')
        //       .find('.custom_select__choosen span')
        //       .text(newCurrency);
        //     $(this)
        //       .closest('.custom_select')
        //       .toggleClass('opened');
        //   });
        // });
      },
      initGraphMenu: function() {
        if (!$('.graphMenu').length) return false;
        let graphMenu = $('.graphMenu'),
          openMenu = $('.openGraphMenu'),
          closeMenu = $('.closeGraphMenu');
        openMenu.on('click', function() {
          $(this)
            .closest(graphMenu)
            .addClass('opened');
        });
        closeMenu.on('click', function() {
          $(this)
            .closest(graphMenu)
            .removeClass('opened');
        });
      },
      initImagePreview() {
        if (!$('#upload').length) return false;

        $('#upload').change(function() {
          readURL(this);
          $('#uploadPhoto')
            .find('svg')
            .hide();
          $('#uploadPhoto')
            .find('span')
            .hide();
        });

        function readURL(input) {
          if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
              $('#uploadedImage').attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
          }
        }
      },
      initComission() {
        if (!$('.comissionHolder').length) return false;
        let wrap = $('.comissionHolder');

        wrap.each(function() {
          let abs = $(this).find('input[name="absolute"]'),
            per = $(this).find('input[name="percents"]');

          abs.on('change', function() {
            let checked = this.checked;
            if (checked) {
              $(this)
                .closest('.comissionHolder')
                .find('.comissionPercent')
                .hide();
            }
          });
          per.on('change', function() {
            let checked = this.checked;
            if (checked) {
              $(this)
                .closest('.comissionHolder')
                .find('.comissionPercent')
                .show();
            }
          });
        });
      },
      initMainGraph: function() {
        if (!$('.mainGraph').length) return false;
        let initRange = 7;
        const oneWeekData = window.graphOneWeek;
        const twoWeeksData = window.graphTwoWeeks;
        const monthData = window.graphMonth;
        // test arr

        drawGraph(oneWeekData);
        findRange();

        function findRange() {
          $('.fakeCheckbox').on('click', function() {
            const newRange = $(this)
              .closest('.haveCheckbox')
              .attr('data-range');

            // clear old canvas
            $('.mainGraphCanvas').remove();
            $('.mainGraph').append('<canvas class="mainGraphCanvas"></canvas>');

            if (newRange == 14) {
              drawGraph(twoWeeksData);
              window.bulletRadius = 8;
            } else if (newRange > 25) {
              drawGraph(monthData);
              window.bulletRadius = 6;
            } else {
              drawGraph(oneWeekData);
              window.bulletRadius = 10;
            }
          });
        }

        function drawGraph({ graphData, graphLabels }) {
          // make arr copy
          if (!window.graphDataSet) findRange();
          // graph initialization
          let ctx = $('.mainGraphCanvas');
          let data = {
            labels: graphLabels,
            datasets: graphData,
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
                bottom: 0,
              },
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    color: 'rgba(0, 0, 0, 0)',
                    drawBorder: false,
                    display: false,
                  },
                  ticks: {
                    fontFamily: 'CoreSansG',
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
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    drawBorder: false,
                  },
                  pointLabels: false,
                  ticks: {
                    min: 0,
                    max: 3.2,
                    stepSize: 1,
                    beginAtZero: true,
                    callback: function(value, index, values) {
                      if (index == 0) {
                        return null;
                      } else {
                        return '';
                      }
                    },
                  },
                },
              ],
            },
          };

          let myLineChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: options,
          });
        }
      },
    }
  );
  $(document).ready(function() {
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
