
define(['jquery',
	'backbone',
	'modules/blogView',
	'text!modules/radio.html'
], function($, Backbone, BlogView, Radiobutton) {

	var BlogCollectionView =  Backbone.View.extend({


		events: {
			'click .radio': 'changeSort',
		},

		initialize: function() {
			this.collection.on('add', this.addOne, this);
			this.collection.on('sort', this.render, this);
		},

		render: function() {
			this.$el.html('');
			this.$el.append(Radiobutton);
			this.$el.find('.radio[value=' +
				this.collection.compareBy +
				']').prop('checked', true);
			this.collection.forEach(this.addOne, this);
		},

		changeSort: function(event) {
			this.collection.compareBy = event.target.value;
			this.collection.sort();
		},


		addOne: function(blogItem) {
			var blogView  = new BlogView({model: blogItem,
				collection: this.collection});
			blogView.setEditFnc(this.editFnc);
			blogView.render();
			this.$el.append(blogView.el);
		},

		setEditFnc: function(editFnc) {
			this.editFnc = editFnc;
		}

	});

	return BlogCollectionView;

});
