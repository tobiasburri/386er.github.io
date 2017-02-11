require.config({

	baseUrl: '.',
	paths: {
		jquery: 'library/jquery',
		underscore: 'library/underscore',
		backbone: 'library/backbone',
		colors: 'library/colors',
		colorpicker:'library/jqColorpicker',
		mustache: 'library/mustache',
		gridster: 'library/jquery.gridster',
		d3: 'library/d3'
	},
	shim:{
		d3:{
			exports:'d3'
		},
		colorpicker: {
			deps: ['jquery','colors'],
			exports: 'colorpicker'
		},
		gridster: {
			deps: ['jquery'],
			exports: 'gridster'
		}
	}
});

require(['modules/app'], function(app) {
	
	app.init();

});