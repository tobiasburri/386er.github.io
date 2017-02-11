define(['jquery',
	'backbone',
	'underscore',
	'd3'
], function($,
	Backbone,
	_,
	d3
	) {
		
	var CellCollection = function(parameterObj) { 	
	
		var that = {};
	
		that.assignProperties = function(parameterObj) {
			that.width = parameterObj.width;
			that.height = parameterObj.height;
			that.cellSize = parameterObj.cellSize;
			that.color = parameterObj.color;			
		};
		
		that.determineRowsAndColumns = function() {
			var range = {};
			var numberOfCellsPerRow = Math.floor( that.width / (that.cellSize + 1) ) ;
			var numberOfCellsPerColumn =  Math.floor( that.height / (that.cellSize + 1) );
			range.horizontal = _.range(numberOfCellsPerRow);
			range.vertical = _.range(numberOfCellsPerColumn);
			
			return range;
		};
		
				
		that.createCellData = function(range) {
			var cells = [];   
			_.each(range.vertical, function(i) {  
				_.each(range.horizontal, function(j){        
					var cellObject = {};
					cellObject.class = 'cell';
					cellObject.id = 'x' + j + 'y' + 'i' + Math.floor(Math.random() * 10000) ;
					cellObject.cellSize = that.cellSize;
					cellObject.width = that.cellSize;
					cellObject.height = that.cellSize;
					cellObject.x = j;
					cellObject.y = i;
					cellObject.colorValue = Math.random();
					cells.push(cellObject);
				});
			});

			that.add(cells);
		};
		
		
		that.getRandomCellModel = function() {

			var 
				numOfModels = that.models.length, 
				ranIndex =  Math.floor(Math.random() * numOfModels);
				model = that.models[ranIndex],
				modelID = model.get('id'),
				rect = d3.select('#' + modelID);
			
			if (rect.attr('class') === 'cell') {
				return model;
			}
			
			return that.getRandomCellModel();
		};
		
		
		that.getCells = function() {
			var cellModels = that.toJSON();
			
			return cellModels;
		};
			
		
		that.getWidth = function() {
			return that.width;
		};
		
		that.getColor = function() {
			return that.color;
		};
		
		that.getHeight = function() {
			return that.height;
		}
		
		that.getCellSize = function() {
			return that.cellSize;
		}
				
		that = new (Backbone.Collection.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
		
	};
		
	return CellCollection;

});	