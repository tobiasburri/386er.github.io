function Controller() {

	var that = {};

    that.selectedImageSVG = "";
	that.body = "";
	that.isLoading = false;
	that.theme = "";

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
		$('#logo').off();
		
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


            var selectedSVG = $("#image-section").find(".svg-icon")[0];
			var svgInner = $("#image-section").find(".svg-icon")[0].innerHTML;
		
		
		

			$( ".selector-image" ).empty()
			$( ".selector" ).empty()
			$( "#greetings").empty()
			
			that.getLoader("loading selection");

			
			setTimeout(function() {


                   that.body.empty().append(shirtTemplate)
                   console.log(selectedSVG)
                   that.addSingleImage(selectedSVG)
				   that.addMultipleImages(svgInner)
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
			
			
			
			/*

	        if (id == "single") {


	
				$("#multi").remove();
				$('<div class="size-select" onclick="" >S</div><div class="size-select" onclick="" >M</div><div class="size-select" onclick="" >L</div><div class="size-select" onclick="">XL</div>').insertAfter("#single")
                $(".size-select").css(sizeStyle);

	        } else {


	            $("#single").remove()
				$('<div class="size-select">S</div><div class="size-select">M</div><div class="size-select">L</div><div class="size-select">XL</div>').insertAfter("#multi")
                $(".size-select").css(sizeStyle);

	        }
			
			

			
	        */

	    })


	}


	that.addSingleImage = function(svg) {

		
        var styles = {"position": "absolute", "width": "2.5em", "height": "2.5em", "top":"0px", "left":"0px", "fill":"white important", "z-index":"10000"};
	    $('#single').append('<div id="singleShirt"></div>');
	    
		$('#singleShirt').css({"position": "absolute", "width": "75px", "height": "75px", "top":"45px", "left":"70px"}).append(svg);
	        
			

	    $('#single').find(".svg-icon").css(styles);

        var styles2 = {"fill": "white"}
        $('#single').find(".svg-icon").find("path").css(styles2)
        $('#single').find(".svg-icon").find("polygon").css(styles2)
        $('#single').find(".svg-icon").find("rect").css(styles2)
		$('#single').find(".svg-icon").find("circle").css({"stroke": "white", "stroke-width": "1"})
		
	}
	
	

	
	
	that.addMultipleImages = function(svg) {


		var svgoutside = '<svg class="svg-icon" viewBox="0 0 20 20"></svg>'

        var styles = {"position": "absolute", "width": "0.8em", "height": "0.8em", "top":"0px", "left":"0px", "fill":"black important", "z-index":"10000"};

	    
		var gridheight = 8
		var gridwidth = 10
		var i, j;
		
		for (i = 0; i < gridheight; i++) {
			for (j = 0; j < gridwidth; j++) {
	
				
				
				
				var id = "multiShirt" + i.toString() + "_" + j.toString();
				var svgId = "svg" + id
				var tops = ( 30*i).toString() +"px"
				var lefts = (20 + 27*j).toString() +"px"
				
				$('#multi').append('<div id="' + id + '"></div>');
				$('#' + id ).css({"position": "absolute", "width": "15px", "height": "15px", "top": tops, "left": lefts});
				
				
				
				$('#' + id ).append('<svg id="'+ svgId +'" viewBox="0 0 20 20"> ' + svg +'</svg>')
				
				
				
				var styles2 = {"fill": "white"}
				$('#' + id).find('#' + svgId).find("path").css(styles2)
				$('#' + id).find('#' + svgId).find("polygon").css(styles2)
				$('#' + id).find('#' + svgId).find("rect").css(styles2)
				$('#' + id).find('#' + svgId).find("circle").css({"stroke": "white", "stroke-width": "1"})
				
			}
		}
	    
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
					
					var imageUrl = data['locations']['blackThumbnail']
					$("#image-section").empty().append("<div id='image-wrapper'></div>")
					$("#image-wrapper").append('<img id="image-thumbnail" src="' + imageUrl + '" >');
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
		
	}
	
	
		
	


	
	return that;

}