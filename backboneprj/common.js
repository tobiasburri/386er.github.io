/*global require*/
require.config({

	baseUrl: '.',
	paths: {
		text: 'library/text',
		jquery: 'library/jquery',
		underscore: 'library/underscore',
		backbone: 'library/backbone',
		mustache: 'library/mustache'
	}
});

require(['modules/application'], function(application) {

	application.init();

});

