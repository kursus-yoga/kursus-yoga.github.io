var CommonClass = (function($){



	function CommonClass(){
		this.randomInt = function(min, max) {
	    var rand = min + Math.random() * (max + 1 - min);
	    rand = Math.floor(rand);
	    return rand;
	  }

		this.onResize = function onResize(params){
			var _defautParams = {
				before: function(){},
				after: function(){},
				breakPoint: 992
			}
			params = $.extend(_defautParams, params);

			var a = 1, b = 0, flag = false, stop = true;
			$(window).on('resize', function () {
				$(this).width() < params.breakPoint
					? b = 1
					: b = 0
				a == b 
					? flag = true
					: flag = false
			});

			$(window).on('resize', function(){
				if(flag && !stop){
					stop = true;
					params.before();
				}

				if(!flag && stop){
					stop = false;
					params.after();
				}
			})
		}


		
		this.bxInnit = function(elem,opt){

			if(!elem.length) return false;

			var defaultOptions = {
				view: 'all'
			}
			var currentOpt = $.extend(defaultOptions, opt);
			var init = {
				breakPoint: 992,
				sliderActive : false,
				initBreakpoint: null,
				resizeBreakpointMore: null,
				resizeBreakpointLess: null,
				windowWidht: window.innerWidth
			}
			var flag = false;
			var slider;
			var options = opt;
			function createSlider() {
			  slider = $(elem).bxSlider(options);
		    return slider;
			}
		
			if(flag){
				createSlider();
				init.sliderActive = true;
			}
		
		
			function createBreakpoints(){
				switch(currentOpt.view){
					case 'mobile':
						init.initBreakpoint = init.windowWidht < init.breakPoint;
						init.resizeBreakpointMore = init.windowWidht >= init.breakPoint;
						init.resizeBreakpointLess = init.windowWidht < init.breakPoint;
						break;
		
					case 'desktop':
						init.initBreakpoint = init.windowWidht >= init.breakPoint;
						init.resizeBreakpointMore = init.windowWidht < init.breakPoint;
						init.resizeBreakpointLess = init.windowWidht >= init.breakPoint;
						init.resizeBreakpointLess;
						break;
		
					case 'all':
						init.initBreakpoint = true;
						init.resizeBreakpointMore = false;
						init.resizeBreakpointLess = false;
						break;
				}
			}
		
			createBreakpoints();
		
		
			if (init.initBreakpoint) {
			  slider = createSlider();
			  init.sliderActive = true;
			}
		
			$(window).resize(function () {
				init.windowWidht = window.innerWidth;
		
				createBreakpoints();
		
			  if (init.resizeBreakpointMore){
			   	if(init.sliderActive){
			   		slider.destroySlider();
			   		init.sliderActive = false;
			   		options.onResize(slider);
			   	}
			  }
		
			  if(init.resizeBreakpointLess){
			  	if(!init.sliderActive){
			  		slider = createSlider();
			  		init.sliderActive = true;
			  		options.onResize(slider);
			  	}
				}
			});
		
			var a,b;
			a = 1;
			b = 0;
		
			if(opt.auto){
				$(window).on('scroll',function(){
					if(init.sliderActive == true){
						if(slider.isOnScreen()){
							b = 1;
						}else{
							b = 0;
						}
			
						if(a == b){
								slider.startAuto();
						}
						else{
							slider.stopAuto();
						}
					}
				});
			}

			return slider;
		}

		this.toForm = function(params){
			var _defautParams = {
				elem: '.pre_toform',
				speed: 1000,
			}

			var params = $.extend(_defautParams, params);

			$(params.elem).on('click', function(e) {
				e.preventDefault();
				var a = $('.js_submit');
				var b = a.closest('form');

				if($('form#toform').length){
					a = $('#toform .js_submit');
					b = a.closest('form#toform');
				}

				if(b.length && a.is(':visible')){
					$("html,body").animate({scrollTop: b.last().offset().top}, params.speed);
				}
				return false;
			});
		}

		jqueryExtend = function(){
			$.fn.isOnScreen = function(shift){
				if(!shift){
					shift = 0;
				}
			  var viewport = {};
			  viewport.top = $(window).scrollTop();
			  viewport.bottom = viewport.top + $(window).height();
			  var bounds = {};
			  bounds.top = this.offset().top + shift;
			  bounds.bottom = bounds.top + this.outerHeight() - shift;
			  return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
			};
		}

		constructor = function(){
			jqueryExtend();
		}

		constructor();
	}


	return CommonClass;

})($)