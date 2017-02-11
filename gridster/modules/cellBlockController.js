
define(['jquery',
	'backbone',
	'underscore',
	'd3',
	'modules/cellBlockView',
	'modules/cellBlockCollection'
], function($,
	Backbone,
	_,
	d3,
	CellBlockView,
	CellBlockCollection
	) {

	var CellBlockController = function() {

		var that = {};
		
		
		that.initialize = function() {
		
		};
		
		
		that.getAllBlocks = function() {
			
			var blocks = $('.gs-w');
			
			blocks.each(function(i, element) {
				
				var
					className = element.classList[0],
					$element = $(element),
					height = $element.height(),
					width = $element.width(),
					color = $element.css('background-color');
				
				var 
					collection = new CellBlockCollection(),
					view = new CellBlockView({el: '.' + className})
				
				collection.assignProperties({
					width: width,
					height: height,
					cellSize: 15,
					color: color
				});
				
				view.assignCollection(collection);
				
				view.render();
				window.setInterval(function(){view.changeColorOfACell();}, 1);
				window.setInterval(function(){view.changeBackgroundColor();}, 1500);
/* 				window.setInterval(function(){view.moveCell('x');}, 1800);
				window.setInterval(function(){view.moveCell('y');}, 1800); */
							
			})

			
		};
		

		that.render =  function() {
			
				
			that.cellBlockView.render();
			console.log(that.cellBlockCollection.models);

			window.setInterval(function(){that.cellBlockView.changeColorOfACell();}, 1);
			window.setInterval(function(){that.cellBlockView.changeColorOfACell();}, 1);
			window.setInterval(function(){that.cellBlockView.changeColorOfACell();}, 1);
			window.setInterval(function(){that.cellBlockView.changeColorOfACell();}, 1);
			window.setInterval(function(){that.cellBlockView.changeBackgroundColor();}, 1500);
			window.setInterval(function(){that.cellBlockView.moveCell('x');}, 50);
			window.setInterval(function(){that.cellBlockView.moveCell('y');}, 50);
		}
		
		return that;
		
	};

	return CellBlockController;

});