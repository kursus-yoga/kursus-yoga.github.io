function App(params){
	CommonClass.call(this);
	var _self = this;
	var state = {
		body: $('body'),
		aciveClass: 'active',
		slider: null,
		sliderDestroy: false,
		activeSlideIndex: 0,
		answerData: {
			card: '.card',
			item: '.card__item',
			map: {

			}
		}
	}


	this.setState = function(value){
		state = $.extend(true, state, value);
	}

	this.getState = function(){
		return state;
	}

	nextSlide = function(slider){
		slider.goToNextSlide();
	}

	validateMap = function(map){
		var output = false;

		for(key in map){
			if(map[key] === null){
				output = true;
			}else{
				state.activeSlideIndex = key; 
			}
		}

		return output;
	}

	this.mapToItems = function(){
		var state = _self.getState(),
				map = state.answerData.map;

		for(key in map){
			if(map[key] !== null){
				$('.s-answer__item').not('.bx-clone').eq(key).find('.card__item').eq(map[key]).addClass('active');
			}
		}
	}

	function initAnswer(){
		var body = state.body,
				item = state.answerData.item,
				$item = $(item),
				card = state.answerData.card,
				aciveClass = state.aciveClass,
				map = state.answerData.map,
				next = true,
				valid = true;

		$(card).each(function(idx){
			$(this).attr('data-index', idx);
			state.answerData.map[idx] = null;			
		})

		body.on('click', item, function(){
			var $this = $(this),
					$siblings = $this.siblings(),
					$parent = $this.closest(card),
					slider = state.slider;

			if(valid){
				map[$parent.attr('data-index')] = $this.index();
				valid = validateMap(map);
				if(!valid) params.callback() || function(){};
			}else{
				return false;
			}

			$parent.addClass(aciveClass);
			$siblings.removeClass(aciveClass);
			$this.addClass(aciveClass);

			if(slider){
				if(next){
					if(!state.sliderDestroy){
						nextSlide(slider);
					}
				}
				if(slider.getCurrentSlide() === slider.getSlideCount() - 1) next = false;
			}
		})

		return $item;
	}

	(function constructor(){
		initAnswer();
	})();
}


$(function(){
	var app,
			slider;

	app = new App({
		callback: function(){
			$('.card, .bx-wrapper').addClass('hide');
			$('.result').fadeIn(400);
		}
	});
	app.toForm();
	slider = app.bxInnit('.s-answer__slider',{
		view: 'mobile',
	  adaptiveHeight: false,
	  swipeThreshold: 40,
	  controls: false,
	  auto: false,
	  touchEnabled: false,
	  pause: 0,
	  autoHover: true,
	  slideSelector: '.s-answer__item',
	  slideMargin: 5,
	  pager: false,
	  onResize: function(elem){
	  	app.setState({
				slider: elem
			});
	  }
	});
	app.setState({
		slider: slider,
		sliderDestroy: slider ? false : true
	});

	app.onResize({
		before: function(){
			app.setState({
				sliderDestroy: false
			})

			var state = app.getState(),
					index = parseInt(state.activeSlideIndex);
					slider = state.slider;
					slider.goToSlide(index + 1);
		},
		after: function(){
			app.mapToItems();
			app.setState({
				sliderDestroy: true
			})
		}
	})

	$('.s-comments__num').text($('.comment').length);
})












