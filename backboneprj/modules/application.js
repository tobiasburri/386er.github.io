
define(['jquery',
	'modules/blogcollection',
	'modules/blogeditview',
	'modules/blogitem',
	'modules/blogcollectionview',
'modules/json'], function($,
	BlogCollection,
	BlogEditView,
	BlogItem,
	BlogCollectionView,
	dataJSON) {

	var pageloader = {

		init : function() {

			var 
				blogCollection = new BlogCollection(),
				blogCollectionView,
				blogEditView = new BlogEditView({
					model: new BlogItem(), collection: blogCollection});

			blogEditView.render();
			$('#form').html(blogEditView.el);
			
			
			$.ajax({url:"http://economicworldmap.net/backboneprj/getAllPosts.php",
					type:'jsonp'})
  				.done(function(result) {
				 result = JSON.parse(result);
				
				blogCollection.reset(result);

				blogCollectionView = new BlogCollectionView({
					collection: blogCollection});

				blogCollectionView.setEditFnc(function(model) {
					blogEditView.model = model;
					blogEditView.render();
				});

				blogCollectionView.render();
				$('#blogroll').html(blogCollectionView.el);
				 	 
  			})

		}

	};

	return pageloader;

});
