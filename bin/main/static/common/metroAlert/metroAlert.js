/**
*
* jQuery Metro Alert
* URL: http://www.codecanyon.net/user/bamdaa
* Version: 1.1
* Author: BamDaa
* Author URL: http://www.codecanyon.net/user/bamdaa
*
*/

if( typeof Object.create !== 'function'){
	Object.create = function( obj ){
		function F(){};
		F.prototype = obj;
		return new F();
	};
}

$.alert = {};
$.alert.theme;
$.alert.localize;

(function( $, window, document, undefined ){

	var Notif = {
		init: function(options, defaultOptions){
			var self = this;
				self.options = $.extend( {}, defaultOptions, options );

			if($.alert.theme != undefined && self.options.theme == null)
				self.options.theme = $.alert.theme;

			self.options.localize = {
				yes: 'Yes',
				no: 'No',
				ok: 'OK',
				cancel: 'Cancel',
				close: 'Close'
			};

			if($.alert.localize != undefined)
				self.options.localize = $.extend({}, self.options.localize, $.alert.localize);

			self.setLocalize();

			if( self.options.type != "notification")
				self.show();
			else
				self.showNotification();
		},

		show: function(){
			var self = this;

			var windowHeight 	= $(window).height();

			self.shade = $(self.template.shade);						
			self.notif = $(self.template.alert);
			self.wrap  = $(self.template.wrap);

			self.wrap.css({
//				paddingTop: self.options.vspace, 
//				paddingBottom: self.options.vspace,
//				paddingLeft: self.options.hspace, 
//				paddingRight: self.options.hspace
			});


			self.content  = $(self.template.content);

			if(self.options.maxheight  != null)
				self.content.css({maxHeight: self.options.maxheight, overflowY: 'auto', overflowX: 'hidden', });

			self.foot  = $(self.template.foot);

			if(self.options.title != null)
			{
				self.title = $(self.template.title);
				self.title.html(self.options.title);
				self.title.prependTo(self.wrap);
			}

			self.content.html(self.options.message);
			self.content.appendTo(self.wrap);

			switch(self.options.type)
			{
				
				case 'confirm': {


					self.noBtn = $(self.template.buttons.no);
					if (typeof self.options.no == "string")
						self.noBtn.html(self.options.no);

					self.noBtn.appendTo(self.foot);
					self.noBtn.bind("click", function(){ self.hide(false); });


					self.yesBtn = $(self.template.buttons.yes);
					if (typeof self.options.yes == "string")
						self.yesBtn.html(self.options.yes);

					self.yesBtn.appendTo(self.foot);
					self.yesBtn.bind("click", function(){ self.hide(true); });
				} break;

				case 'prompt': {

					self.input = $(self.template.input);

					if(self.options.placeholder != '')
						self.input.find("input").attr("placeholder", self.options.placeholder);

					self.input.appendTo(self.wrap);	


					self.cancelBtn = $(self.template.buttons.cancel);
					if (typeof self.options.no == "string")
						self.cancelBtn.html(self.options.no);

					self.cancelBtn.appendTo(self.foot);
					self.cancelBtn.bind("click", function(){ self.hide(false); });				

					self.okBtn = $(self.template.buttons.ok);
					if (typeof self.options.yes == "string")
						self.okBtn.html(self.options.yes);

					self.okBtn.appendTo(self.foot);
					self.okBtn.bind("click", function(){

						if(self.input.find("input").val() == '')
							self.input.find("input").focus();
						else
							self.hide( self.input.find("input").val() );
					});

				} break;

				default: {

					self.customButton = new Array();
					$.each(self.options.buttons, function(key, val){
						self.customButton[key] = $(self.template.buttons.btn);
						self.customButton[key].html(val);
						self.customButton[key].attr("id", key);
						self.customButton[key].bind("click", function(){ self.hide(key); });
						self.customButton[key].appendTo(self.foot);
					});

					
					if(self.options.close)
					{
						self.closeBtn = $(self.template.buttons.close);

						if (typeof self.options.close == "string")
							self.closeBtn.html(self.options.close);

						self.closeBtn.appendTo(self.foot);
						self.closeBtn.bind("click", function(){ 						
							self.hide(false);
						});
					}

				} break;
			}

			if(!self.foot.is(':empty'))
				self.foot.appendTo(self.wrap);

			if($(window).width() > self.options.width && self.options.width !== null )				
				self.wrap.css({width: self.options.width});

			self.wrap.appendTo(self.notif);

			// Setting theme
			if(self.options.theme != null)
			{
				self.notif.addClass(self.options.theme);
				self.shade.addClass(self.options.theme);
			}
			
			self.shade.appendTo("body");
			self.shade.addClass("is-active");

//			self.shade.css({height: $(document).height(), width: '100%'}).fadeIn("fast");
//			self.notif.appendTo("body");
			self.notif.appendTo(self.shade);
//			self.notif.css({top: (windowHeight/2 - self.notif.height()/2)});
//			self.notif.fadeIn("fast");

			if(self.options.backdrop === true){
				self.shade.bind("click", function(){ self.hide(false); });
			}
			if(self.options.esc === true){
				self.hide_on_esc();
			}

			self.foot.find('button:first-child').focus();
		},

		showNotification: function(){
			var self = this;

			if($("#bmd-notify-" + self.options.position).length == 0)
			{
				self.notify = $(self.template.notify);
				self.notify.addClass(self.options.position);
				self.notify.attr("id", "bmd-notify-" + self.options.position);
				self.notify.appendTo("body");
			}				
			else
			{
				self.notify = $("#bmd-notify-" + self.options.position);
			}
				

			self.message = $(self.template.message);
			self.wrap  = $(self.template.wrap);

			self.wrap.css({
				paddingTop: self.options.vspace, 
				paddingBottom: self.options.vspace,
				paddingLeft: self.options.hspace, 
				paddingRight: self.options.hspace
			});

			self.content  = $(self.template.content);

			if(self.options.maxheight  != null)
				self.content.css({maxHeight: self.options.maxheight, overflowY: 'auto', overflowX: 'hidden', });

			if(self.options.title != null)
			{
				self.title = $(self.template.title);
				self.title.html(self.options.title);
				self.title.prependTo(self.wrap);
			}

			self.content.html(self.options.message);
			self.content.appendTo(self.wrap);
			self.wrap.appendTo(self.message);

			if( self.options.width !== null )
				self.message.css({width: self.options.width});
			
			// Setting theme
			if(self.options.theme != null)
				self.message.addClass(self.options.theme);

			self.message.appendTo(self.notify);

			switch(self.options.position)
			{
				
				case 'tl': 
					self.notify.css({top: self.options.margin, left: 0, borderLeftWidth: 0 });
					break;
				case 'bl':
					self.notify.css({bottom: self.options.margin, left: 0, borderLeftWidth: 0  });
					break;
				case 'br':
					self.notify.css({bottom: self.options.margin, right: 0, borderRightWidth: 0  });
					break;
				case 'bc':
					self.notify.css({bottom: 0, left: ($(window).width() - self.message.width())/2, borderBottomWidth: 0  });
					break;
				case 'tc':
					self.notify.css({top: 0, left: ($(window).width() - self.message.width())/2, borderTopWidth: 0  });
					break;
				case 'cc':
					self.notify.css({top: ($(window).height() - self.message.height())/2, left: ($(window).width() - self.message.width())/2});
					break;
				default:
					self.notify.css({top: self.options.margin, right: 0, borderRightWidth: 0 });
					break;
			}

			self.message.slideDown("normal", function(){
				setTimeout(
					function(){ 
						self.message.animate({height: 0, opacity: 0}, "normal", function(){ 
							self.message.remove();
						});
					},
					self.options.interval
				);
			});
		},

		hide: function(returnValue){
			var self = this;
			if(self.notif != undefined)
			{
				self.notif.fadeOut();
				self.shade.fadeOut("fast", function(){
					self.notif.remove();
					self.shade.remove();

					self.options.callback(returnValue);
				});
				if(self.options.esc === true ){
					$("body").unbind("keydown");
				}
			}
			$("input").blur();
		},

		hide_on_esc: function(){
			var self = this;
			$("body").bind("keydown", function(event){
				if(event.keyCode == 27){
					self.hide(false);
				}else if(event.keyCode == 13 || event.keyCode == 32){
					self.hide(true);
				}else{
					return false;
				}
			});

		},

		template:{
			shade: 			'<div class="bmd-alert-shade"></div>',
			alert: 			'<div class="bmd-alert-alert"></div>',
			wrap: 			'<div class="bmd-alert-wrap"></div>',
			notify: 		'<div class="bmd-alert-notify"></div>',
			message: 		'<div class="bmd-alert-message"></div>',
			title: 			'<div class="bmd-alert-title"></div>',
			content: 		'<div class="bmd-alert-content"></div>',
			foot: 			'<div class="bmd-alert-foot"></div>',
			input: 			'<div class="bmd-alert-input"><input type="text" id="bmd-promt-input"/></div>',
			buttons: {
				no: '<button id="bmd-button-not">|lang|no|/lang|</button>',
				yes: '<button id="bmd-button-yes">|lang|yes|/lang|</button>',
				cancel: '<button id="bmd-button-cancel">|lang|cancel|/lang|</button>',
				ok: '<button id="bmd-button-ok">|lang|ok|/lang|</button>',
				close: '<button id="bmd-button-close">|lang|close|/lang|</button>',
				btn: '<button class="bmd-custom-button"></button>'
			}
		},

		setLocalize: function(){
			var self = this;			
			$.each(self.options.localize, function(i, val){
				$.each(self.template.buttons, function(j, btn){
					self.template.buttons[j] = btn.replace('|lang|' + i + '|/lang|', val);
				});
			});
		}
	};


	var globalOptions = {
			type: 'alert',
			width: null,
			maxheight: null,
			vspace: 0,
			hspace: 0,
			backdrop: false,
			title: null,
			position: 'tr', // tr, tl, br, bl, bc, tc, cc
			margin: 0,
			interval: 2000, // milliseconds
			message: 'Please write a message',			
			buttons: {},
			theme: null,
			close: true,
			placeholder: '',
			esc: false,
			callback: function(res){ return true; }
		};

	
	$.alert = function(settings){
		
		var options = globalOptions;
			options.type = "alert";

		var myAlert = Object.create( Notif );
			myAlert.init(settings, options);
	};

	$.confirm = function(settings){

		var options = globalOptions;
			options.type = "confirm";

		var myAlert = Object.create( Notif );
			myAlert.init(settings, options);
	};

	$.prompt = function(settings){

		var options = globalOptions;
			options.type = "prompt";

		var myAlert = Object.create( Notif );
			myAlert.init(settings, options);
	};

	$.notification = function(settings){

		var options = globalOptions;
			options.type = "notification";

		var myAlert = Object.create( Notif );
			myAlert.init(settings, options);
	};
})(jQuery, window, document);


$.alert.localize = {
	yes: 	'확인',
	no: 	'취소',
	ok: 	'확인',
	cancel: '취소',
	close: 	'확인'
};
$.confirm.localize = {
	yes: 	'확인',
	no: 	'취소',
	ok: 	'확인',
	cancel: '취소',
	close: 	'확인'
};
$.prompt.localize = {
	yes: 	'확인',
	no: 	'취소',
	ok: 	'확인',
	cancel: '취소',
	close: 	'확인'
};
$.notification.localize = {
	yes: 	'확인',
	no: 	'취소',
	ok: 	'확인',
	cancel: '취소',
	close: 	'확인'
};