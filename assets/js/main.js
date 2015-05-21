jQuery(document).ready(function($) {

  $('.tooltip').jBox('Tooltip', {
    position: {
        x: 'left',
        y: 'center'
    },
    outside: 'x',
    animation: 'tada',
  });

  // Fix iOS Safari browser with viewport height (vh).
  if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {

    var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);

    if(isSafari) {

      $("#video-gallery-1").addClass('iOSdevicesCourseFixed');
      $("#video-gallery-2").addClass('iOSdevicesCourseFixed');
      $("#video-gallery-3").addClass('iOSdevicesCourseFixed');

      $("#intro-slider").addClass('iOSdevicesFullSlideFixed');

      // $("#student-portfolio-gallery").addClass('iOSdevicesStudentPortfolioFixed');
    }
  }

  function initCourseSlider(slideNumber) {
    var vd = '#video-gallery-' + slideNumber;
    $(vd).royalSlider({
      arrowsNav: false,
      fadeinLoadedSlide: true,
      controlNavigationSpacing: 0,
      controlNavigation: 'thumbnails',
      navigateByClick: false,
      slidesOrientation: 'vertical',
      thumbs: {
        autoCenter: false,
        fitInViewport: true,
        orientation: 'vertical',
        spacing: 0,
        paddingBottom: 0
      },
      keyboardNavEnabled: false,
      imageScaleMode: 'fill',
      imageAlignCenter:true,
      slidesSpacing: 0,
      loop: false,
      loopRewind: true,
      numImagesToPreload: 3,
      video: {
        autoHideArrows:true,
        autoHideControlNav:false,
        autoHideBlocks: true,
      },
      autoScaleSlider: false,
      // for fill height,
      // see http://help.dimsemenov.com/kb/royalslider-jquery-plugin-faq/how-stretch-slider-to-full-browser-width-and-height
      // autoScaleSliderWidth: 960, //960
      // autoScaleSliderHeight: 450, //450,
      autoHeight: false

    }).data('royalSlider');
  } // End init slider


  initCourseSlider(1);
  initCourseSlider(2);
  initCourseSlider(3);


  /*---	Tabbed Navigation	---*/
  var tabItems = $('.cd-tabs-navigation a'),
    tabContentWrapper = $('.cd-tabs-content');

  tabItems.on('click', function(event){

    event.preventDefault();

    var selectedItem = $(this);
    if( !selectedItem.hasClass('selected') ) {

      var selectedTab = selectedItem.data('content'),
        selectedContent = tabContentWrapper.find('li[data-content="'+selectedTab+'"]');
        // slectedContentHeight = selectedContent.innerHeight();

        tabItems.removeClass('selected');
        selectedItem.addClass('selected');
        selectedContent.addClass('selected').siblings('li').removeClass('selected');
        //animate tabContentWrapper height when content changes
        // tabContentWrapper.animate({
        // 	'height': slectedContentHeight
        // }, 200);

        $('.royalSlider').each(function(){

          var slider = $(this).data('royalSlider');
          if(slider !== undefined) {
            slider.stopVideo();
            slider.updateSliderSize(true);
          }

        });
    }

  }); // End Tab Click function

  //hide the .cd-tabs::after element when tabbed navigation has scrolled to the end (mobile version)
  function checkScrolling(tabs){
    var totalTabWidth = parseInt(tabs.children('.cd-tabs-navigation').width()),
       tabsViewport = parseInt(tabs.width());
    if( tabs.scrollLeft() >= totalTabWidth - tabsViewport) {
      tabs.parent('.cd-tabs').addClass('is-ended');
    } else {
      tabs.parent('.cd-tabs').removeClass('is-ended');
    }
  }

  checkScrolling($('.cd-tabs nav'));
  $(window).on('resize', function(){
    checkScrolling($('.cd-tabs nav'));
    tabContentWrapper.css('height', 'auto');
  });
  $('.cd-tabs nav').on('scroll', function(){
    checkScrolling($(this));
  });

  /*---	End Tabbed Navigation	---*/


  /*---	Home Slider	---*/
  jQuery.rsCSS3Easing.easeOutBack = 'cubic-bezier(0.175, 0.885, 0.320, 1.275)';
    $('#intro-slider').royalSlider({
      arrowsNav: true,
      arrowsNavAutoHide: false,
      fadeinLoadedSlide: false,
      controlNavigationSpacing: 0,
      controlNavigation: 'bullets',
      imageScaleMode: 'fill',
      imageAlignCenter:true,
      blockLoop: true,
      loop: true,
      numImagesToPreload: 6,
      transitionType: 'fade',
      keyboardNavEnabled: true,
      block: {
        delay: 500
      },autoPlay: {
        // autoplay options go gere
        enabled: true,
        pauseOnHover: true,
        delay: 5000
      },
      autoScaleSlider:false,
      autoHeight: false
    });
    /*---End Home Slider	---*/

    /*---Student Portfolio Slider	---*/
    // Fix iOS Safari browser with viewport height (vh).

    $('#student-portfolio-gallery').royalSlider({
      fullscreen: {
        enabled: true,
        nativeFS: true
      },
      controlNavigation: 'thumbnails',
      autoScaleSlider: false,
      autoHeight: false,
      loop: false,
      imageScaleMode: 'fit',
      navigateByClick: true,
      numImagesToPreload:2,
      arrowsNav:true,
      arrowsNavAutoHide: true,
      arrowsNavHideOnTouch: true,
      keyboardNavEnabled: true,
      fadeinLoadedSlide: true,
      globalCaption: false,
      globalCaptionInside: false,
      thumbs: {
        appendSpan: true,
        firstMargin: true,
        paddingBottom: 4
      },
      usePreloader: true,
    });

}); // End jQuery ready.
