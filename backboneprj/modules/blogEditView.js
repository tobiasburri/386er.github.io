
define(['jquery',
	'backbone',
	'mustache',
	'modules/blogItem',
	'text!modules/form.html'
], function($, Backbone, Mustache, BlogItem, formHTML ) {

	var BlogEditView = Backbone.View.extend({

		events: {
			'click #submit' : 'changePost',
			'change .radio' : 'sortBlog'
		},

		initialize:  function(options) {
			this.model.resetEmpty();
			this.model.on('change', this.render, this);
			this.collection = options.collection;
		},

		render: function() {
			var attributes = this.model.toJSON();
			this.$el.html(Mustache.render(formHTML,
				attributes));
		},

		changePost: function() {

			if ( this.model.get('id') == 'emptyform' ) {

				var 
					title = $('.input')[0].value,
					description = $('.input')[1].value,
					author = $('.input')[2].value,
					that = this;
				
				var newblogItem = new BlogItem(
					{title: title, description: description, author:author});

				that.model = new BlogItem (
					{title:'', description:'', author:'', id:'emptyform'}
				);

				$.post( "http://economicworldmap.net/backboneprj/getAndSetPost.php", 
					{ "title": title, "description": description, "author": author})
					.done(function(){
					that.render();
					that.collection.add(newblogItem);
				});
				
				
			}

			else {

				var titleElse = $('.input')[0].value;
				var descriptionElse = $('.input')[1].value;
				var authorElse = $('.input')[2].value;

				this.model.set({
					title: titleElse,
					description: descriptionElse,
					author: authorElse
				});

				this.model = new BlogItem (
					{title:'', description:'', author:'', id:'emptyform'}
				);

				this.render();

			}
		},

		sortBlog: function() {

			this.collection.sort();

		}


	});

	return BlogEditView;

});
