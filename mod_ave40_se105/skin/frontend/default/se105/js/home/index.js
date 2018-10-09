~function ($) {

    $(function () {
        /**
         *  home brands carousl
         */
        var homeBrandsSwiper = new multipleProductCarousl({
            parentSelector: '.home-brands',
            elmSelector: '.swiper-container-home-brands',
            pageWidth: 180,
            isLoop: false,
            slidesPerColumn: 2,
            slidesPerView : 6,
            nextBtnSelector: '.home-brands .swiper-button-next',
            prevBtnSelector: '.home-brands .swiper-button-prev',
            breakpoints:{
                320: {
                    slidesPerView: 1
                },

                500: {
                    slidesPerView: 2
                },
                640: {
                    slidesPerView: 3
                },
                768: {
                    slidesPerView: 4
                },
                1199: {
                    slidesPerView: 5
                },
                1920:{
                    slidesPerView: 6
                }
            }

        });
    });


    $(function () {







        /*
        $('.home-banner').bxSlider({
            auto: true,
            controls: false,
            autoControls: false,
            autoHover: true,
            startSlide: 0,
            preloadImages: 'all'
        });*/

        /**
         *  home banner
         */
        var homeBannerSwiper = new Swiper('.swiper-container-home-banner', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay: 4000,
            speed: 600,
            loop: true,
            autoplayDisableOnInteraction: false,
            nextButton: '.home-banner-main .swiper-button-next',
            prevButton: '.home-banner-main .swiper-button-prev'
        });

        $('.home-banner-main').mouseenter(function () {
            homeBannerSwiper.stopAutoplay();
            homeBannerSwiper.nextButton.show();
            homeBannerSwiper.prevButton.show();
        });

        $('.home-banner-main').mouseleave(function () {
            homeBannerSwiper.startAutoplay();
            homeBannerSwiper.nextButton.hide();
            homeBannerSwiper.prevButton.hide();
        });

        var ariBannerSwiper = new Swiper('.swiper-container-ari-banner', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay: 4000,
            speed: 600,
            loop: true,
            autoplayDisableOnInteraction: false,
            nextButton: '.ari-banner-main .swiper-button-next',
            prevButton: '.ari-banner-main .swiper-button-prev'
        });

        var selBannerSwiper = new Swiper('.swiper-container-sel-banner', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay: 4000,
            speed: 600,
            loop: true,
            autoplayDisableOnInteraction: false,
            nextButton: '.sel-banner-main .swiper-button-next',
            prevButton: '.sel-banner-main .swiper-button-prev'
        });

        var productBannerSwiper = new Swiper('.swiper-container-arrival-product', {
            pagination: '.arrival-product-banner .swiper-pagination',
            paginationType: 'fraction',
            paginationClickable: true,
            autoplay: 0,
            speed: 1500,
            loop: false,
            autoplayDisableOnInteraction: false,
            nextButton: '.arrival-product-banner .swiper-button-next',
            prevButton: '.arrival-product-banner .swiper-button-prev',
            onSlideNextEnd: function(swiper){
                // 点击轮播后重新初始化lazyload
                $("img.lazy").lazyload({
                    container: $(options.elmSelector),
                    skip_invisible: false,
                    failure_limit: 1000,
                    effect: "show",
                    threshold: 200
                });
            },
            onAfterResize: function(swiper){
                $("img.lazy").lazyload({
                    container: $(options.elmSelector),
                    skip_invisible: false,
                    failure_limit: 1000,
                    effect: "show",
                    threshold: 200
                });
            }
        });

        var productsellersBannerSwiper = new Swiper('.swiper-container-sellers-product', {
            pagination: '.sellers-product-banner  .swiper-pagination',
            paginationType: 'fraction',
            paginationClickable: true,
            /*autoplay: 4000,*/
            speed: 1500,
            loop: false,
            autoplayDisableOnInteraction: false,
            nextButton: '.sellers-product-banner .swiper-button-next',
            prevButton: '.sellers-product-banner .swiper-button-prev',
            onSlideNextEnd: function(swiper){
                // 点击轮播后重新初始化lazyload
                $("img.lazy").lazyload({
                    container: $(options.elmSelector),
                    skip_invisible: false,
                    failure_limit: 1000,
                    effect: "show",
                    threshold: 200
                });
            },
            onAfterResize: function(swiper){
                $("img.lazy").lazyload({
                    container: $(options.elmSelector),
                    skip_invisible: false,
                    failure_limit: 1000,
                    effect: "show",
                    threshold: 200
                });
            }
        });


        /* var swiper = new Swiper('.swiper-container-home-banner', {
            /!* grabCursor : true,
             paginationClickable : true,
             autoplay : 3000,
             loop : true,
             pagination : '.swiper-pagination'*!/
         });*/


        /* home about_us background  */
        $('#newhome_about_us_content_wrap').css('backgroundImage', 'url(' + $('#newhome_about_us_background_image').find('img').prop('src') + ')');

        /* home Floor carousl  */
        imgscrool('.home-product-list-b ')
        imgscrool('.home-product-list-a ')
        imgscrool('.home-product-list-c ')
        imgscrool('.home-product-list-d ')
        imgscrool('.home-product-list-e ')
        imgscrool('.home-product-list-f ')


    });


}(jQuery)