
define(['jquery',
	'backbone',
    'modules/blogItem'], function($, Backbone, BlogItem) {

	var BlogCollection = Backbone.Collection.extend({
		model: BlogItem,
		compareBy: 'title',
		comparator:  function(item) {
			return item.get(this.compareBy);
		}
	});

	return BlogCollection;

});
