function Controller() {

	var that = {};

    that.selectedImageSVG = "";
	that.body = "";
	that.isLoading = false;
	that.theme = "";
	
	that.single = "";
	that.pattern = "";
	that.thumbnail = "";
	that.patternThumbnail = "";

	

	that.initialize = function() {
	
		that.body = $("#middle-column");
	}  

		
	that.render = function() {

        that.unbindAll();
        that.body.empty();


		that.body.append(bodyTemplate);
		$("#greetings").append(greetingsTemplate);
		$("#selector-section").append(categoriesTemplate);
		$("#choose-image").append(chooseTemplate);
		
		that.bindTrashButton();
		that.bindChooseButton();
		that.bindSelectButton();
		that.bindBrandButton();
		that.bindLinkButton();
	}
	
	
	that.startLoading = function() {
		
		that.isLoading = true;	
	}


	that.stopLoading = function() {
		
		that.isLoading = false;
	}


	that.unbindAll = function() {
	    $( ".trash" ).off();
	    $( ".choose" ).off();
	    $( ".selector" ).off();
	    $('#back').off();
	    $(".shirt-wrapper").off();
		$('.logo').off();
		$('.logosmall').off();
		
		
	}
	
	
	that.bindLinkButton = function() {
		
		$('.footer-link').click(function() {
			
			$("#shirt-section").empty().append("<p style='color:black; font-family:Roboto; font-size:28px'>" + $(this).html() + "</p>")			
			
		})
		
	}
	
	
	
	that.bindTrashButton = function() {
		
		$( ".trash" ).click(function() {

            that.loadImage();

		});
	}


	that.bindSelectButton = function() {
		
		$( ".selector" ).click(function() {
			
			that.theme = $(this).data('value');
			
            that.loadImage();
		
	    })

    }
	
	that.bindChooseButton = function() {
		
		$( ".choose" ).click(function() {


		

			$( ".selector-image" ).empty()
			$( ".selector" ).empty()
			$( "#greetings").empty()
			
			that.getLoader("loading selection");

			
			setTimeout(function() {


                   that.body.empty().append(shirtTemplate)
         
                   that.addSingleImage()
				   
				   that.addMultipleImages();
				   that.bindShirtButton();


					$('#back').click(function() {

					    that.render();

					})
					
			},1200);
		})
		
	}
	

	that.bindShirtButton = function(){

        var sizeStyle = { "width": "50px", "height": "50px", "border":"1px solid red", "float": "left", "margin":"20px", "margin-left":"20px", "margin-top":"155px", "margin-bottom":"50px",  "text-align":"center", "cursor": "pointer"};


	    $(".shirt-container").click( function() {

            $(".shirt-container").off();
     
	        var id =  $(this).attr("id");
			
			
			$( "#shirt-section" ).empty().append('<div class="loader"></div>', '<div id="loader-text">' + "loading shirt" + '</div>' );
					
		
			setTimeout(function() {


                  that.body.empty().append(sizeTemplate)
				  
				  that.bindSizeButton()
				  
				  $('#back').click(function() {

					    that.render();

					})
				  
					
			},1200);
			
	    })


	}


	that.addSingleImage = function() {

		var image_style = {"width":"55px", "left":"165px","top":"100px", "height":"55px", "position":"absolute"}
	    $('#single').append('<img id="image-single" src="' + that.thumbnail + '" >');
		$("#image-single").css(image_style);		
	}
	
		
	that.addMultipleImages = function(svg) {


		var image_style = {"width":"260px", "left":"37px","top":"35px", "height":"260px", "position":"absolute"}
	    //$('#multi').append('<img id="image-multi" src="' + that.blackPattern + '" >');
		$('#multi').append('<img id="image-multi" src="' + that.patternThumbnail + '" >');
		$("#image-multi").css(image_style);	

	}

	


	that.getLoader = function(string) {
		$("#image-section").empty().append('<div class="loader"></div>', '<div id="loader-text">' + string + '</div>' );
	}


    that.loadImage = function() {

        if (that.isLoading == false) {

			that.getLoader("generating image");

			$(".selector-image").css("display","none")
			that.startLoading();

			var image_style = {"width":"300px", "margin-left":"100px", "margin-top":"25px", "height":"300px", "fill":"black", "color":"black"}
			
			$.ajax({

				url : 'https://21rzukwv7a.execute-api.eu-central-1.amazonaws.com/test/transactions?theme=' + that.theme,
				type : 'GET',
				dataType:'json',
				success : function(data) {              
								
					that.single = data['locations']['single'];
					that.pattern = data['locations']['pattern'];
					that.thumbnail = data['locations']['thumbnail'];
					that.patternThumbnail = data['locations']['patternThumbnail'];
					
					

					$("#image-section").empty().append("<div id='image-wrapper'></div>")
					$("#image-wrapper").append('<img id="image-thumbnail" src="' + that.thumbnail + '" >');
					$("#image-thumbnail").css(image_style);
					that.stopLoading();
					$(".selector-image").css("display","inline-block")
					
				},
				error : function(request,error)
				{
					console.log("Request: "+JSON.stringify(request));
					isLoading = false;
					that.stopLoading();
				}
			});					
		}
    };
	
	
	
	that.bindSizeButton = function() {
		
		$(".size-move-card").click(function() {
			
			$("#shirt-section").empty().append("<p style='color:black; font-family:Roboto; font-size:22px'>Shirt is moved to Card and can be ordered / paid.</p>")
			
			
		})
		
		
	}
	
	that.bindBrandButton = function() {
		
		
		$('.logo').click(function() {
							
						
					    that.render();

					})
					
		$('.logosmall').click(function() {
							
						
					    that.render();

					})
		
	}
	
	
		

	
	return that;

}