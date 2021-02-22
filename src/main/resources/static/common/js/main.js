/*  ---------------------------------------------------
    Template Name: Aler
    Description:  Aler property HTML Template
    Author: Colorlib
    Author URI: https://colorlib.com
    Version: 1.0
    Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        // $(".loader").fadeOut();
        //$("#preloder").fadeOut();
        // $("#preloder").delay(200).fadeOut("slow");
        $.showDocProgressBar(false);
        /*------------------
            Property filter
        --------------------*/
        $('.property-controls li').on('click', function () {
            $('.property-controls li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.property-filter').length > 0) {
            var containerEl = document.querySelector('.property-filter');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Canvas Menu
    $(".canvas-open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".canvas-close, .offcanvas-menu-overlay").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    /*------------------
		Navigation
	--------------------*/
    $(".nav-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Carousel Slider
    --------------------*/
    var hero_s = $(".hs-slider");
    hero_s.owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        items: 1,
        dots: false,
        navText: ['<i class="arrow_left"></i>', '<i class="arrow_right"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*------------------
        Team Slider
    --------------------*/
    $(".fp-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        navText: ['<i class="arrow_left"></i>', '<i class="arrow_right"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*------------------
        Testimonial Slider
    --------------------*/
    $(".testimonial-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 2,
        dots: false,
        nav: true,
        navText: ['<i class="arrow_left"></i>', '<i class="arrow_right"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });

    /*------------------
        Logo Slider
    --------------------*/
    $(".lc-slider").owlCarousel({
        loop: true,
        margin: 115,
        items: 6,
        dots: false,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            0: {
                items: 2
            },
            480: {
                items: 3
            },
            768: {
                items: 4
            },
            992: {
                items: 5
            },
            1200: {
                items: 6
            }
        }
    });

    /*------------------------
        Property pic slider
    -------------------------*/
    $(".property-pic-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ['<i class="arrow_left"></i>', '<i class="arrow_right"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*------------------------
        Sidebar Feature slider
    -------------------------*/
    $(".sf-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*------------------------
        Agent slider
    -------------------------*/
    $(".as-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ['<i class="arrow_left"></i>', '<i class="arrow_right"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*------------------
        Video Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
        Nice Select
    --------------------*/
    $('select').niceSelect();

    /*-------------------
		Radio Btn
	--------------------- */
    $(".cb-item label").on('click', function () {
        $(".cb-item label").removeClass('active');
        $(this).addClass('active');
    });

    /*-------------------
		Range Wrap
	--------------------- */

    //room size
    $("#roomsize-range").slider({
        range: true,
        min: 0,
        max: 2100,
        step: 300,
        values: [300, 1200],
        slide: function (event, ui) {
            $("#roomsizeRange").val("[" + ui.values[0] + "-" + ui.values[1] + "]" + "sqft");
        }
    });
    $("#roomsizeRange").val("[" + $("#roomsize-range").slider("values", 0) + "-" + $("#roomsize-range").slider("values", 1) + "]" + "sqft");

    //price range
    $("#price-range").slider({
        range: true,
        min: 0,
        max: 1500,
        step: 100,
        values: [100, 1000],
        slide: function (event, ui) {
            $("#priceRange").val("[ " + ui.values[0] + " - " + ui.values[1] + " ]" + " $");
        }
    });
    $("#priceRange").val("[ " + $("#price-range").slider("values", 0) + " - " + $("#price-range").slider("values", 1) + " ]" + " $");

     //Text editor
    $('.texteditor-content').richText();

    $('.texteditor-switch').on('click', function () {
        if(!$(this).hasClass('active')) {
            $(".richText-btn[data-command='toggleCode']").click();
        }
    });

     //Drag Upload
    $('.feature-image-content').imageUploader();
    //Login/Signup modal window - by CodyHouse.co
    function ModalSignin( element ) {
        this.element = element;
        this.blocks = this.element.getElementsByClassName('js-signin-modal-block');
        this.switchers = this.element.getElementsByClassName('js-signin-modal-switcher')[0].getElementsByTagName('a');
        this.triggers = document.getElementsByClassName('js-signin-modal-trigger');
        this.hidePassword = this.element.getElementsByClassName('js-hide-password');
        this.init();
    };

    ModalSignin.prototype.init = function() {
        var self = this;
        //open modal/switch form
        for(var i =0; i < this.triggers.length; i++) {
            (function(i){
                self.triggers[i].addEventListener('click', function(event){
                    if( event.target.hasAttribute('data-signin') ) {
                        event.preventDefault();
                        self.showSigninForm(event.target.getAttribute('data-signin'));
                    }
                });
            })(i);
        }

        //close modal
        this.element.addEventListener('click', function(event){
            if( hasClass(event.target, 'js-signin-modal') || hasClass(event.target, 'js-close') ) {
                event.preventDefault();
                removeClass(self.element, 'cd-signin-modal--is-visible');
            }
        });
        //close modal when clicking the esc keyboard button
        document.addEventListener('keydown', function(event){
            (event.which=='27') && removeClass(self.element, 'cd-signin-modal--is-visible');
        });

        //hide/show password
        for(var i =0; i < this.hidePassword.length; i++) {
            (function(i){
                self.hidePassword[i].addEventListener('click', function(event){
                    self.togglePassword(self.hidePassword[i]);
                });
            })(i);
        }

        //IMPORTANT - REMOVE THIS - it's just to show/hide error messages in the demo
        this.blocks[0].getElementsByTagName('form')[0].addEventListener('submit', function(event){
            event.preventDefault();
            self.toggleError(document.getElementById('signin-email'), true);
        });
        this.blocks[1].getElementsByTagName('form')[0].addEventListener('submit', function(event){
            event.preventDefault();
            self.toggleError(document.getElementById('signup-username'), true);
        });
    };

    ModalSignin.prototype.togglePassword = function(target) {
        var password = target.previousElementSibling;
        ( 'password' == password.getAttribute('type') ) ? password.setAttribute('type', 'text') : password.setAttribute('type', 'password');
        target.textContent = ( 'Hide' == target.textContent ) ? 'Show' : 'Hide';
        putCursorAtEnd(password);
    }

    ModalSignin.prototype.showSigninForm = function(type) {
        // show modal if not visible
        !hasClass(this.element, 'cd-signin-modal--is-visible') && addClass(this.element, 'cd-signin-modal--is-visible');
        // show selected form
        for( var i=0; i < this.blocks.length; i++ ) {
            this.blocks[i].getAttribute('data-type') == type ? addClass(this.blocks[i], 'cd-signin-modal__block--is-selected') : removeClass(this.blocks[i], 'cd-signin-modal__block--is-selected');
        }
        //update switcher appearance
        var switcherType = (type == 'signup') ? 'signup' : 'login';
        for( var i=0; i < this.switchers.length; i++ ) {
            this.switchers[i].getAttribute('data-type') == switcherType ? addClass(this.switchers[i], 'cd-selected') : removeClass(this.switchers[i], 'cd-selected');
        }
    };

    ModalSignin.prototype.toggleError = function(input, bool) {
        // used to show error messages in the form
        toggleClass(input, 'cd-signin-modal__input--has-error', bool);
        toggleClass(input.nextElementSibling, 'cd-signin-modal__error--is-visible', bool);
    }

    var signinModal = document.getElementsByClassName("js-signin-modal")[0];
    if( signinModal ) {
        new ModalSignin(signinModal);
    }

    // toggle main navigation on mobile
    var mainNav = document.getElementsByClassName('js-main-nav')[0];
    if(mainNav) {
        mainNav.addEventListener('click', function(event){
            if( hasClass(event.target, 'js-main-nav') ){
                var navList = mainNav.getElementsByTagName('ul')[0];
                toggleClass(navList, 'cd-main-nav__list--is-visible', !hasClass(navList, 'cd-main-nav__list--is-visible'));
            }
        });
    }

    //class manipulations - needed if classList is not supported
    function hasClass(el, className) {
        if (el.classList) return el.classList.contains(className);
        else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
    function addClass(el, className) {
        var classList = className.split(' ');
        if (el.classList) el.classList.add(classList[0]);
        else if (!hasClass(el, classList[0])) el.className += " " + classList[0];
        if (classList.length > 1) addClass(el, classList.slice(1).join(' '));
    }
    function removeClass(el, className) {
        var classList = className.split(' ');
        if (el.classList) el.classList.remove(classList[0]);
        else if(hasClass(el, classList[0])) {
            var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
            el.className=el.className.replace(reg, ' ');
        }
        if (classList.length > 1) removeClass(el, classList.slice(1).join(' '));
    }
    function toggleClass(el, className, bool) {
        if(bool) addClass(el, className);
        else removeClass(el, className);
    }

    //credits http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
    function putCursorAtEnd(el) {
        if (el.setSelectionRange) {
            var len = el.value.length * 2;
            el.focus();
            el.setSelectionRange(len, len);
        } else {
            el.value = el.value;
        }
    };
})(jQuery);