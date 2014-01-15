(function($) {
	$.OSF = {
		defaults: {
			max: 10,
			min: 1
		}
	};

	$.fn.osf = function(config) {

		var config = $.extend({}, $.OSF.defaults, config);

		var $this = $(this);

		$this.addClass('OSF');

		var fieldsCounter = config.min;		
		
		$this.wrap("<div>"); //wraping in <div>
		$this.parent().addClass('multi-field-container'); //giving div a class
		
		$this.wrap("<div>");
		$this.parent().addClass('single-multi-field-box');

		config.mainContainer = $this.parent().parent();
		config.multiDiv = $this.parent();		
		
		// creating add and remove buttons
		$('<a>',{
    		class: 'remove_multi_input_field btn',
    		text: '-'
			}).appendTo($this);
		
		
		$('<a>',{
    		class: 'add_multi_input_field btn',
    		text: '+'
			}).insertAfter(config.multiDiv);

		$(this).minClone(config);

		config.mainContainer.children('.add_multi_input_field').click(function(){		

			if(fieldsCounter < config.max) 
			{
				$(this).clickAdd(config);
				fieldsCounter++;
			}
		});

		config.mainContainer.find('.remove_multi_input_field').click(function(){
			if(fieldsCounter > config.min) 
			{
				$(this).clickRemove(config);
				fieldsCounter--;
			}
		});

	};

	/* Initialize the number of fields present to match the minimum number specified in the config */

	$.fn.minClone = function(config) {

		$mainFieldDiv = $(this);

		/* Duplicate the main field div */

		for(var i=1; i<config.min; i++)
			$mainFieldDiv.clone(true).insertAfter($mainFieldDiv);
	};
			
	$.fn.clickAdd = function(config) {

		var $lastFieldDiv = config.multiDiv.children().last();

		var $fieldsClone = $lastFieldDiv.clone(true);
		$fieldsClone.children().val(null);
		$fieldsClone.insertAfter($lastFieldDiv);
	};
	
	$.fn.clickRemove = function(config) {

		$(this).parent().remove(); 
	};

})(jQuery);