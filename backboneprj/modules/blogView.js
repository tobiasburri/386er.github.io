
define([
	'backbone',
	'jquery',
	'mustache',
	'text!modules/post.html'
], function( Backbone, $, Mustache, postHTML) {

	var BlogView =  Backbone.View.extend({

		className: 'blogpost',

		events: {
			'mouseover': 'highLight',
			'mouseout' : 'unhighLight',
			'click .edit': 'editPost' ,
			'click .delete' : 'removeItem'
		},

		initialize:  function() {
			this.model.on('change', this.render, this);
		},

		highLight: function() {
			this.el.style.backgroundColor = 'whitesmoke';
			$(this.el).find('.edit')[0].style.display = 'inline';
			$(this.el).find('.delete')[0].style.display = 'inline';
		},

		unhighLight: function() {
			this.el.style.backgroundColor = 'transparent';
			$(this.el).find('.edit')[0].style.display = 'none';
			$(this.el).find('.delete')[0].style.display = 'none';
		},

		setEditFnc: function(editFnc) {
			this.editFnc = editFnc;
		},

		editPost: function() {
			this.editFnc(this.model);
		},

		removeItem: function() {
			this.remove();
			this.collection.remove(this.model);

		},

		render: function() {
			var attributes = this.model.toJSON();
			this.$el.html(Mustache.render( postHTML, attributes));
		}

	});

	return BlogView;

});


