
define(['jquery',
	'backbone',
	'underscore',
	'modules/cellBlockController',
	'modules/gridCreator'
], function($,
	Backbone,
	_,
	CellBlockController,
	GridCreator
	) {

	var GridController = function() {

		var that = {};
		
		
		that.initialize = function() {
		
			that.cellBlockController = new CellBlockController();
			that.gridCreator = new GridCreator();
			
			that.gridCreator.on('gridCreated', function() {
				this.cellBlockController.getAllBlocks();
			}, that);
			
		};
		
		that = new (Backbone.View.extend(that))();
		return that;
		
	};

	return GridController;

});