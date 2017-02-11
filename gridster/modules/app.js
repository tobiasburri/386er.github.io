
define(['jquery',
	'backbone',
	'underscore',
	'modules/gridController',
	'colorpicker'
], function($,
	Backbone,
	_,
	GridController
	) {

	var app = {

		init : function() {

			var gridController = new GridController();
			
/* 			gridController.initialize(); */
			
		}
	};

	return app;

});