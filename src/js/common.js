import slick from "slick-carousel";
import fancybox from "@fancyapps/fancybox";
import device from "current-device";
import Scrollbar from 'smooth-scrollbar';
import 'lazysizes';
lazySizes.cfg.lazyClass = 'lazy';
lazySizes.cfg.loadedClass = 'loaded';
lazySizes.cfg.init = false;
import { gsap } from "gsap";
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import tippy from 'tippy.js';
import autosize from 'autosize';
import Inputmask from "inputmask";


$(document).ready(function(){
  hoverTouchEvents();
  modals();
  passToggle();
  $checkbox.init();
  inputs.init();
  calc.init();
  catalogue.init();
  tooltips.init();
  slider();
  scroll();
  filter();
  nav();
  mask();
  autosize($('textarea'));
})

//загрузили все
window.onload = function() {
  setTimeout(()=>{
    toggleblocks();
    lazySizes.init();
    preloader.hide();
  }, 500)
};

//preloader
let preloader = {
  element: $('.preloader'),
  hide: function() {
    let animation = gsap.timeline({onComplete:function(){preloader.element.remove()}})
      .to(preloader.element, {duration:0.5,autoAlpha:0,ease:'power2.inOut'})
  }
}
//hover/touch custom events
function hoverTouchEvents() {
  $(document).on('mouseenter mouseleave touchstart touchend mousedown mouseup', 'a,button,label', function(event) {
    let $target = $(this);

    //mobile events
    if(!device.desktop()) {
      if(event.type=='touchstart') {
        $target.addClass('touch');
      } else if(event.type=='touchend') {
        setTimeout(function(){
          $target.removeClass('touch');
        }, 250)
      }
    }

    //desktop events
    else {
      if(event.type=='mouseenter') {
        $target.addClass('hover');
      } else if(event.type=='mousedown') {
        $target.addClass('mousedown');
      } else if(event.type=='mouseup') {
        $target.removeClass('mousedown');
      } else {
        $target.removeClass('hover');
        $target.removeClass('mousedown');
      }
    }  
  })
}
//modals/popups
function modals() {
  $.fancybox.defaults.btnTpl.close = '<button data-fancybox-close class="button fancybox-button fancybox-button--close" title="{{CLOSE}}"></button>';
  $.fancybox.defaults.btnTpl.arrowLeft = '<button data-fancybox-prev class="button fancybox-button fancybox-button--arrow_left" title="{{PREV}}"></button>';
  $.fancybox.defaults.btnTpl.arrowRight = '<button data-fancybox-prev class="button fancybox-button fancybox-button--arrow_right" title="{{PREV}}"></button>';
  $.fancybox.defaults.btnTpl.zoom = '<button data-fancybox-zoom class="button fancybox-button fancybox-button--zoom" title="{{ZOOM}}"></button>';
  $.fancybox.defaults.btnTpl.download = '<a download data-fancybox-download class="button fancybox-button fancybox-button--download" href="javascript:;" title="{{DOWNLOAD}}"></a>';
  $.fancybox.defaults.btnTpl.slideShow = '<button data-fancybox-play class="button fancybox-button fancybox-button--play" title="{{PLAY_START}}"></button>';
  $.fancybox.defaults.btnTpl.smallBtn = '<button type="button" data-fancybox-close class="button fancybox-button fancybox-close-small" title="{{CLOSE}}"><i class="fas fa-times"></i></button>';
  $.fancybox.defaults.btnTpl.thumbs = '<button data-fancybox-thumbs class="button fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"></button>';
  $.fancybox.defaults.i18n.ru = {
    CLOSE       : 'Закрыть',
    NEXT        : 'Следующий слайд',
    PREV        : 'Предидущий слайд',
    ERROR       : 'Ошибка загрузки, попробуйте позже.',
    PLAY_START  : 'Запустить слайд-шоу',
    PLAY_STOP   : 'Остановить слайд-шоу',
    FULL_SCREEN : 'Полноэкранный режим',
    THUMBS      : 'Миниатюры',
    DOWNLOAD    : 'Загрузить',
    SHARE       : 'Поделиться',
    ZOOM        : 'Увеличить'
  };
  $.fancybox.defaults.lang = 'ru';
  $.fancybox.defaults.loop = true;
  $.fancybox.defaults.autoFocus = false;
  $.fancybox.defaults.animationEffect = 'fade';
  $.fancybox.defaults.touch = false;
  $.fancybox.defaults.backFocus = 'false';
  $.fancybox.defaults.animationDuration = 500;



  let $old;
  $('[data-fancybox]').fancybox({
    beforeShow: function(instance) {
      if($old!==undefined) {
        setTimeout(function(){
          $old.close();
          $old = instance;
        })
      } else {
        $old = instance;
      }
    }
  });




  $('.slide [data-fancybox]').on('click', function() {
    let $selector = $(this).parents('.slider').find('.slick-slide:not(.slick-cloned) a');

    $.fancybox.open( $selector, {
        selector : $selector,
        backFocus : false
    }, $selector.index( this ) );

    return false;
  });
  
}




//password toggle
function passToggle() {
  let $button = $('.pass-toggle');
  $button.on('click', function() {
    let input = $(this).siblings('input'),
        type = input.attr('type') == "text" ? "password" : 'text';
    input.prop('type', type);
    $(this).toggleClass('active');
  }) 
}
function scroll() {
  let $elements = document.querySelectorAll('.scroll-container');
  for (let $element of $elements) {
    let scroll = Scrollbar.init($element, {
      damping: 0.1,
      alwaysShowTracks: true
    });
  }
}
//checkboxes
window.$checkbox = {
  init: function() {
    $checkbox.check();

    $(document).on('click', '.checkbox', function() {
      $checkbox.check();
    })
    
    $(document).on('click', '.radio', function() {
      $checkbox.check();
    })

  },
  check: function() {
    $('.checkbox, .radio').each(function() {
      let input = $(this).find('input');
      if(input.prop('disabled')) {
        $(this).addClass('disabled');
      } else {
        $(this).removeClass('disabled');
      }
      if(input.prop('checked')) {
        $(this).addClass('checked');
      } else {
        $(this).removeClass('checked');
      }
    })
  }
}

function slider() {
  let $slider = $('.slider');

  $slider.each(function () {
    $(this).on('init', function(event, slick) {
      $(this).addClass('visible');
    });

    let slideCount = 1,
      slideCount1210 = 1,
      slideCount1024 = 1,
      slideCount768 = 1,
      slideCount576 = 1,
      slideCount420 = 1,
      arrows = false,
      dots = false,
      centerMode = false,
      adaptiveHeight = false,
      autoplay = false;

    if($(this).hasClass('dots')) {
      dots = true;
    }
    if($(this).hasClass('arrows')) {
      arrows = true;
    }
    if($(this).hasClass('banner-slider')) {
      autoplay = true;
    }
    
    if($(this).is('.catalogue-slider')) {
      slideCount = 4;
      slideCount1210 = 4;
      slideCount1024 = 3;
      slideCount768 = 2;
      slideCount576 = 1;
      slideCount420 = 1;
    }
    if($(this).is('.brands-slider')) {
      slideCount = 5;
      slideCount1210 = 5;
      slideCount1024 = 4;
      slideCount768 = 3;
      slideCount576 = 2;
      slideCount420 = 2;
    }

    if(!$(this).is('.js-custom-slider')) {
      $(this).slick({
        infinite: true,
        dots: dots,
        arrows: arrows,
        speed: 600,
        centerMode: centerMode,
        slidesToShow: slideCount,
        slidesToScroll: slideCount,
        autoplay: autoplay,
        autoplaySpeed: 6000,
        rows: 0,
        responsive: [{
            breakpoint: 1201,
            settings: {
              slidesToShow: slideCount1210,
              slidesToScroll: slideCount1210
            }
          },
          {
            breakpoint: 1025,
            settings: {
              slidesToShow: slideCount1024,
              slidesToScroll: slideCount1024
            }
          },
          {
            breakpoint: 769,
            settings: {
              slidesToShow: slideCount768,
              slidesToScroll: slideCount768
            }
          },
          {
            breakpoint: 577,
            settings: {
              slidesToShow: slideCount576,
              slidesToScroll: slideCount576
            }
          },
          {
            breakpoint: 421,
            settings: {
              slidesToShow: slideCount420,
              slidesToScroll: slideCount420
            }
          }
        ]
      });
    } else {
      if($(this).is('.item-slider')) {
        $(this).slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          rows: 0,
          asNavFor: '.nav-slider'
        });
      }
      if($(this).is('.nav-slider')) {
        $(this).slick({
          slidesToShow: 6,
          slidesToScroll: 1,
          asNavFor: '.item-slider',
          dots: false,
          rows: 0,
          focusOnSelect: true,
          responsive: [{
            breakpoint: 576,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          }]
        });
      }
    }

    if($(this).is('.m-item-slider')) {
      $(this).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        rows: 0,
        fade: true,
        asNavFor: '.m-nav-slider'
      });
    }
    if($(this).is('.m-nav-slider')) {
      $(this).slick({
        slidesToShow: 7,
        slidesToScroll: 1,
        asNavFor: '.m-item-slider',
        dots: false,
        rows: 0,
        focusOnSelect: true,
        responsive: [{
          breakpoint: 576,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1
          }
        }]
      });
    }
  
  });
}

function mask() {
  let $mask = document.querySelectorAll('.masked');
  if($mask!==null) {
    Inputmask({
      mask: "+7 999 999-9999",
      clearIncomplete: true
    }).mask($mask);
  }

}

function nav() {
  let $nav = $('.mobile-nav'),
      $toggle = $('.nav-toggle'),
      $overlay = $('.overlay'),
      state = false;

  $toggle.on('click', function() {
    if(!state) {
      open();
    } else {
      close();
    }
  })

  $overlay.on('click touchstart', function() {
    close();
  })

  function open() {
    state = true;
    $nav.addClass('active');
    $toggle.addClass('active');
    $overlay.addClass('active');
    disablePageScroll();
  }
  function close() {
    state = false;
    $nav.removeClass('active');
    $toggle.removeClass('active');
    $overlay.removeClass('active');
    enablePageScroll();
  }

  $(window).on('resize', function() {
    if($(this).width()>1024 && state) {
      close();
    }
  })
}

let tooltips = {
  el: '[data-tippy-content]',
  init: function() {
    tippy(tooltips.el, {
      duration: 300,
      theme: 'light-border',
      animation: 'scale-extreme',
      inertia: true
    });
  }
}

//toggle blocks
function toggleblocks() {
  let initialized = false;

  function check() {
    $('.toggle-group').each(function(){
      let $content = $(this).find('.toggle-content').eq(0),
          $button = $(this).find('.toggle-button').not($content.find('.toggle-button'));

      if($(this).hasClass('active')) {
        if(!initialized) {
          $content.show();
        } else {
          $content.stop().slideDown(250);
        }
        $button.addClass('active');
        if($button.data('hide-text')!==undefined) {
          if($button.find('span').length>0) {
            $button.find('span').text($button.data('hide-text'))
          } else {
            $button.text($button.data('hide-text'))
          }
        }
      } else {
        if(!initialized) {
          $content.hide();
        } else {
          $content.stop().slideUp(250);
        }
        $button.removeClass('active');
        if($button.data('show-text')!==undefined) {
          if($button.find('span').length>0) {
            $button.find('span').text($button.data('show-text'))
          } else {
            $button.text($button.data('show-text'))
          }
        }
      }

    })
    initialized=true;
  }

  check();
  
  $(document).on('click', '.toggle-button', function(event) {
    event.preventDefault();
    $(this).closest('.toggle-group').toggleClass('active');
    check();
  })

}

function filter() {
  let $filter = $('.filter'),
      flag = false;

  function change() {
    if ($(window).width()<=768 && !flag) {
      flag=true;
      $filter.insertAfter($('.catalogue .section-head'))
    }
    else if ($(window).width()>768 && flag) {
      flag=false;
      $filter.prependTo($('.aside'));
    }
  }

  change();
  $(window).resize(function() {
    change();
  })
}

let inputs = {
  init: function() {

    $(document).on('change input', 'input', function(event) {
      let $target = $(this);
      if($target.hasClass('num-only')) {
        $target.val( $target.val().replace(/\D/, '') )
      }
    })
    
  }
}
//calc
let calc = {
  element: $('.calc-count-block'),
  init: function() {
    this.element.each(function() {
      let $this = $(this),
          $plus = $this.find('.js-plus'),
          $minus = $this.find('.js-minus'),
          $input = $this.find('input'),
          val = +$input.val();
      
      check();
      $plus.on('click', function() {
        val++;
        check();
      })
      $minus.on('click', function() {
        val--;
        check();
      })
      $input.on('change input', function() {
        setTimeout(function() {
          val = +$input.val();
          check();
        },100)
      })

      function check() {
        console.log(val)
        if(val<1 || val==1) {
          val=1;
          $minus.addClass('disabled');
        } else {
          $minus.removeClass('disabled');
        }
        $input.val(val);
      }
    })
  }
}
//ctlg
let catalogue = {
  $toggle: $('.nav__catalogue-trigger'),
  $navTrigger: $('.ctlg-nav-m__item'),
  $nav: $('.ctlg-nav'),
  state: false,
  init: function() {

    let $parent = $('.ctlg-nav-m'),
        h = $parent.find('.ctlg-nav-m__list').height(),
        $subnav = $('.ctlg-nav-s__list'),
        $trigger = $('.ctlg-nav-m__item');
    
    $parent.css('min-width', catalogue.$toggle.outerWidth() + 2)
    
    this.$navTrigger.on('click mouseenter mouseleave', function(event) {
      let $this = $(this);

      function isLink() {
        if($this.find('.ctlg-nav-s').length>0 && $(event.target).closest('.ctlg-nav-s').length==0) {
          return false;
        } else {
          return true;
        }
      }

      if(event.type=='mouseenter' && device.desktop()) {
        $(this).addClass('active');
      } else if(event.type=='mouseleave' && device.desktop()) {
        catalogue.$navTrigger.removeClass('active');
      } 

    })

    catalogue.$toggle.on('mouseenter mouseleave', function(event) {
      if(device.desktop() && event.type=='mouseenter') {
        catalogue.open();
      } else if(device.desktop() && event.type=='mouseleave') {
        catalogue.close();
      }
    })
    $parent.on('mouseenter mouseleave', function(event) {
      if(device.desktop() && event.type=='mouseenter') {
        catalogue.open();
      } else if(device.desktop() && event.type=='mouseleave') {
        catalogue.close();
      }
    })

  },
  open: function() {
    catalogue.state=true;
    catalogue.$toggle.addClass('active');
    catalogue.$nav.addClass('active');
  }, 
  close: function() {
    catalogue.state=false;
    catalogue.$toggle.removeClass('active');
    catalogue.$nav.removeClass('active');
    catalogue.$navTrigger.removeClass('active');
  }
}


// $.fancybox.open([{src:'#cart'}]);