
define(['backbone'], function( Backbone ) {

	var BlogItem =  Backbone.Model.extend({
		resetEmpty: function() {
			this.set({title:'', description:'', author:'', id:'emptyform'});
		}
	});

	return BlogItem;

});
