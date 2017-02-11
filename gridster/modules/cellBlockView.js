define(['jquery',
	'backbone',
	'underscore',
	'd3',
	'modules/cellBlockCollection'
], function($,
	Backbone,
	_,
	d3,
	CellCollection
	) {

	var CellBlockView = function() {
		
		var that = {};

		that.instanceID = 'view' + Date.now();
		
		that.render = function() {
			var 
				cellRange,
				cells;
			
			that.$el.css({'background-color':'transparent'});
			cellRange = that.collection.determineRowsAndColumns();
			that.createScales(cellRange);
			that.createColorScale();
			that.createSVG(that.width, that.height);
			that.drawBackground(cellRange);
			that.collection.createCellData(cellRange);
			cells = that.collection.getCells();
			that.renderGrid(cells);
		};

			
		that.createSVG = function(width, height) {
			that.svg = d3.select(that.el).append('svg')
				.attr('width',width)
				.attr('height', height);
		};
												
		that.drawBackground = function(range) {
						
			that.bgWidth = ((range.horizontal.length - 2) * (that.cellSize + 1));
			that.bgHeight = ((range.vertical.length - 2) * (that.cellSize + 1));
			var ranNum = Math.random();
			
			that.background = that.svg.append('rect')
			.attr('width',that.bgWidth + 1) //TODO find better, more explanatory way of computing height and width
			.attr('height', that.bgHeight + 1)
			.style('fill', that.randomColorScale(ranNum))
			.attr('opacity', 0.175)
			.attr('transform', 'translate('+ that.cellSize + ',' + that.cellSize + ')');
		};
						
						
		that.changeBackgroundColor = function() {
			var ranNum = Math.random();
			that.background.transition().duration(1500).style('fill', that.randomColorScale(ranNum));
		};
							
							
		that.createScales = function(range) {
			var xDomain = range.horizontal;
			that.xDomain = xDomain;
			var xRange = _.map(xDomain, function(position) {
				return position * that.cellSize + position * 1;
			});
			var yDomain = range.vertical;
			that.yDomain = yDomain;
			var yRange = _.map(yDomain, function(position) {
				return position * that.cellSize + position * 1;
			});
			
			that.xScale = d3.scale.ordinal()
			.domain(xDomain)
			.range(xRange);
			
			that.yScale = d3.scale.ordinal()
			.domain(yDomain)
			.range(yRange);
			
		};
								
																	
		that.renderGrid =  function(cells) {
			that.selection = that.svg.selectAll('placeholder').data(cells,  function (d) { return d.id });
			
			that.selection.enter()
				.append('rect')
				.attr('class', function(d) {return d.class + ' ' + that.instanceID;})
				.attr('id', function(d) {return d.id})
				.attr('width', function(d) {return d.width;})
				.attr('height', function(d) {return d.height;})
				.attr('x', function(d) {return that.xScale(d.x);})
				.attr('y', function(d) {return that.yScale(d.y);})
				.attr('opacity',1)
				.style('fill', function(d) {return that.getColor(d.colorValue);});
			
		};
										
										
		that.changeColorOfACell = function(){
			
			var cellToBeChanged = that.pickRandomCell();
			var ranNum = Math.random();
			var cellColor = that.getColor(ranNum);
			
			d3.select(cellToBeChanged)
				.transition().duration(800)
				.style('fill', cellColor);
		};
											
											
		that.validateCoordinates = function(coordinates) {
			
			if (coordinates.x < 0) {
				coordinates.x *= -1;
			}
			if (coordinates.y < 0) {
				coordinates.y *= -1;
			}    
			if (coordinates.x > d3.max(that.xDomain)) {
				coordinates.x -= 1;
			}
			if (coordinates.y > d3.max(that.yDomain)) {
				coordinates.y -= 1;
			}
			
			return coordinates;
		};
												
												
		that.moveCell = function(direction) {
				
			var
				coordinates,
				cellToBeMoved = that.collection.getRandomCellModel(),
				cellID = '#' + cellToBeMoved.get('id'),
				selectedCell = d3.select(cellID);

			coordinates = that.getNewCoordinates(cellToBeMoved);
			coordinates = that.validateCoordinates(coordinates);
			cellToBeMoved.set({'x':coordinates.x})
			cellToBeMoved.set({'y':coordinates.y})
			
			if (direction === 'x') {
				selectedCell.transition("x").duration(2000)
				.attr('x', that.xScale(coordinates.x))
				.each("start", lock)
				.each("end", unlock);
			} else {
				selectedCell.transition("y").duration(2000)
				.attr('y', that.yScale(coordinates.y))
				.each("start", lock)
				.each("end", unlock);
			}
			
			function lock (d, i) {
				d3.select(this).classed({ cell: false, locked: true}); 
			}
			
			function unlock (d, i) {
				d3.select(this).classed({cell: true, locked: false});
			}  
		};
		

		that.getNewCoordinates = function(cell) {
			
			var
				coordinates = {},
				cellSize = cell.get('cellSize'),
				currentX = cell.get('x'),
				currentY = cell.get('y');
				
			coordinates.x = currentX + that.getPlusOrMinus();
			coordinates.y = currentY + that.getPlusOrMinus();
			
			return coordinates;
		};	
			
			
		that.pickRandomCell = function() {
			
			var 
				cells = d3.selectAll('.' + that.instanceID)[0], 
				numOfCells = cells.length,
				randomNumber = Math.floor(Math.random() * numOfCells),
				randomCell = cells[randomNumber];
			
			return randomCell;
		};
		
		that.getPlusOrMinus = function() {
			var sign = Math.random() < 0.5 ? -1 : 1;
			return sign;
		};
		
		that.createColorScale = function() {
			
			var color = that.color;
			
			if (color === 'rgb(230, 230, 230)') {
				return;
			}
			
			var bright = d3.rgb(color);
			var sBright = bright.brighter();
			var ssBright = sBright.brighter();
			var sssBright = ssBright.brighter();
			var ssssBright = sssBright.brighter();
			
			that.colorScale = d3.scale.linear()
				.domain([0, 0.5, 0.65, 0.8, 0.9, 1])
				.range([color, bright, sBright, ssBright, sssBright, ssssBright]);
		};
		
		
		that.getColor = function(ranNum) {
			
			if (that.colorScale) {
				var perc = Math.random();
				
				if (perc > 0.975) {
					return that.randomColorScale(ranNum)
				}
				
				return that.colorScale(ranNum);
			}
			
			return that.randomColorScale(ranNum);
			
		}
		
		
/* 		that.getColorScale = function() {
			return that.colorScale;	
		}; */
		
		
		that.randomColorScale = function(ranNum) {
				var n = Math.floor(ranNum*255*255*255);
				var hex = Number(n).toString(16);
				while(hex.length < 6) {
					hex = "0"+hex;
				}
				return '#' + hex;
		};
		
		
		that.assignCollection = function(collection) {
			that.collection = collection;
			that.width = that.collection.getWidth();
			that.height = that.collection.getHeight();
			that.cellSize = that.collection.getCellSize();
			that.color = that.collection.getColor();
		};
			
		that = new (Backbone.View.extend(that))();
		that.constructor.apply(that, arguments);
			
		return that;
	};
	
	return CellBlockView;

});