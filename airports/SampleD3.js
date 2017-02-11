angular.module('cel.ng').directive('pluginSampleD3', function() {
	return {
		link: function(scope, elem) {
			// Unwrap jquery/jqLite wrapped element.


			// Do stuff with root elem.


			// hook up the reload events
			scope.component.$reload = function() {
				// The reload event is triggered by the application when the component is required to get new data.
				// This can be for example due to a change in filters.
				// You can use the pql service to send queries to the server.
				// You can use the selection service to updated and set selections.
				console.log('reload event has been triggered.');


			//	pqlService.query('filter temporary  "SourceAirports.csv"."Longitude" > 0; TABLE("SourceAirports.csv"."Airport ID", "SourceAirports.csv"."Name", "SourceAirports.csv"."City", "SourceAirports.csv"."Country", "SourceAirports.csv"."IATA", "SourceAirports.csv"."Longitude", "SourceAirports.csv"."Latitude", "SourceAirports.csv"."Altitude", "SourceAirports.csv"."Timezone", "SourceAirports.csv"."DST", "SourceAirports.csv"."TZ database") LIMIT 25000', false, scope.component).then(function(result) {
					//console.log(result);
				pqlService.query('SELECT TEMPORARY "AirlineRoutes.csv"."Airline" LIKE \'\';TABLE("SourceAirports.csv"."Airport ID", "SourceAirports.csv"."Name", "SourceAirports.csv"."City", "SourceAirports.csv"."Country", "SourceAirports.csv"."IATA", "SourceAirports.csv"."Longitude", "SourceAirports.csv"."Latitude", "SourceAirports.csv"."Altitude", "SourceAirports.csv"."Timezone", "SourceAirports.csv"."DST", "SourceAirports.csv"."TZ database") LIMIT 25000', false, scope.component).then(function(result) {	

					
					d3.json('http://localhost:9550/css/world.geojson', function(data){
						
						
					
						var currentSource = undefined;
						var currentInterval = undefined;
					
/////////////////////////////////////////////////
///////////////////////////////////////////////// Functions
/////////////////////////////////////////////////			

						 var pathStartPoint =  function(path) {
							var d = path.attr("d"),
							dsplitted = d.split(" ");
							return dsplitted[1];
						 };
		
		
		
						var removeTemporaryView = function() {
							var temporaryView = d3.selectAll('.temporaryData');
							if (temporaryView) {
								d3.selectAll('.text-block').remove();
								temporaryView.remove();
							}
							clearInterval(currentInterval);
						} 
		
		
		
						var prepareArcs = function(array) {
							var container = []
							
							for (var i = 0; i <array.length; i++) {
								container.push(
								{'source':[currentSource.lat, currentSource.lon],
								  'target': [array[i].lat, array[i].lon]}
								)
							}
							return container;
						}
						
						var orderData = function(array) {
							var container = [];
							for (var i = 0; i < array.data.length; i++) {
								container.push(
									{'id': array.data[i][0],
									'name': array.data[i][1],
									'city': array.data[i][2],
									'country': array.data[i][3],
									'IATA': array.data[i][4],
									'lon': array.data[i][5],
									 'lat': array.data[i][6],
									 'altitude': array.data[i][7],
									 'timezone': array.data[i][8],
									 'DST': array.data[i][9],
									 'valueId': array.ids[i][0]}
									 )
							}
							return container;
						};
						
						var showAirPortDetails = function(dataObj) {
							

							var text = svg.selectAll('placeholder')
								.data([dataObj.data])
								.enter().append('text')
								.attr('class', 'text-block')
								.text( function (d) { return  d[dataObj.attr]; })
								.attr('x', dataObj.x)
								.attr('y', dataObj.y) 
								.attr("text-anchor", "middle")
								.style('fill', dataObj.fontColor)
								.style('font-size', dataObj.fontSize);
						}
						
						var showAirPortDestinations = function(dataObj) {
							
					
							var text = svg.selectAll('placeholder')
								.data([dataObj.data])
								.enter().append('text')
								.attr('class', 'text-block')
								.text( dataObj.text)
								.attr('x', dataObj.x)
								.attr('y', dataObj.y) 
								.attr("text-anchor", "middle")
								.style('fill','white')
								.style('font-size', dataObj.fontSize); 
						}
						
																		
						var getTargetAirports = function(sourceId) {
							pqlService.query('SELECT TEMPORARY "SourceAirports.csv"."Airport ID" IDS [' + sourceId + ']; TABLE("TargetAirports.csv"."Airport ID", "TargetAirports.csv"."Name", "TargetAirports.csv"."City", "TargetAirports.csv"."Country", "TargetAirports.csv"."IATA", "TargetAirports.csv"."Longitude", "TargetAirports.csv"."Latitude") LIMIT 2000',  false, scope.component).then(function(result) {
								
								
								
								var transitionPath = function (pathy, i) {
									pathy = d3.select(pathy);
									var marker = d3.select('.marker' + i);
									marker.transition()
									.duration(2000)
									.attr('opacity', 0.6)
									.attrTween("transform", translateAlong(pathy.node()))
									.each("end", function() {
										marker.remove();
									});// infinite loop
									}
  
								var translateAlong =  function (path) {
									var l = path.getTotalLength();
									return function(i) {
									  return function(t) {
										var p = path.getPointAtLength(t * l);
										return "translate(" + p.x + "," + p.y + ")";
									  }
									}
								  }
								
								
								
								
								
								var temporaryData = orderData(result);
								var links = prepareArcs(temporaryData);
								var pathStartPoint =  function(path) {
									var d = d3.select(path).attr("d");
									var L = d.indexOf('L')
									d = d.substr(1,L - 1); 
									return d
								 };
								
								

								
								d3.selectAll('.place-label:not(.source)')
									.style('opacity',0)
								console.log(result)
								console.log(temporaryData)

								arcs.selectAll("peter")
									.data(links)
									.enter().append("path")
									.attr('class','temporaryData')
									.style("stroke-width", 0.5)
									.style("stroke", "#FFBF00")
									.style("fill", "none")
									.attr("d", function(d) { return path(arc(d)); });

									
								var showFlights = function() {
									
									var paths = d3.selectAll('path.temporaryData')[0];
									for (var i = 0; i< paths.length; i++) {
										

										var startPoint = pathStartPoint(paths[i]);

										  var marker = svg.append("circle");
											marker
												.attr("r", 1)
												.attr('class', 'marker' + i + ' temporaryData' )
												.style('fill', 'white')
												.attr("transform", "translate(" + startPoint + ")");
										
										transitionPath(paths[i], i)
										
									}
								}
								
								showFlights();
								currentInterval = setInterval( showFlights, 2500);
									
									
							
								
								temporaryData.push(currentSource);
								
								var temporaryPorts = svg.selectAll("placeholder")
									.data(temporaryData)
									.enter().append("circle")
									.attr("class", "temporaryData")
									.attr("cx", function(d) {
										return projection([d.lat, d.lon])[0];
									})
									.attr("cy", function(d) {
										return projection([d.lat, d.lon])[1];
									})
									.attr('r', 2)
									.style('fill', '#ff1910');
									
									debugger;
									title = {'data' : '', 'x': 900 , 'y': 710, 'fontSize':12, 'text': 'Destinations: ' + (temporaryData.length -1) },
								showAirPortDestinations(title)

									
							}	)
						};
						
/////////////////////////////////////////////////
///////////////////////////////////////////////// Setup
/////////////////////////////////////////////////	
						

						elem.empty();
						var rootElem = d3.select(elem.get(0)).append('div')
							.style('position', 'absolute')
							.style('width', '100%')
							.style('height', '100%')
							.attr('class', 'd3-wrapper');
							
							d3.select('body')
							.on('keydown', function() {
								if(d3.event.keyCode == 32) {
									d3.selectAll('.place-label')
									.style('opacity',1)
									.style('fill','#FFBF00');
									
									removeTemporaryView();
		
								d3.selectAll('.flight-paths').remove();
								d3.select('.source')
									.attr('r',2)
									.style("fill", '#FFBF00')
									.classed('source',false)
									.attr('class', 'place-label')
																	
								}
							});
		
						var svg  = rootElem.append('svg')
                                     .attr("width", 2000)
                                     .attr("height", 800)
									.style('position', 'absolute');
						var group = svg.selectAll('g')
							.data(data.features)
							.enter()
							.append('g');
							
						var projection = d3.geo.orthographic().scale(200).translate([600, 480]);
						var path = d3.geo.path().projection(projection);
						var areas = group.append('path')
									.attr('d',path)
									.attr('class', function(d) { return "subunit" + d.id; })  
									.attr('fill','black')
									.attr('stroke', 'white')
									.attr('stroke-width', '1px')
									.attr('opacity','0.7');
						
						var circle = svg.append("circle")
							.attr("cx", 900)
							.attr("cy", 650)
							.attr("r", 100)
							.style('fill', 'black')
							.style('stroke','yellow')
							.style('stroke-width', '2px');
							
						var arcs = svg.append("g").attr("id", "arcs");
						var arc = d3.geo.greatArc().precision(3);
				
				
						var tooltip = rootElem.append('div')
											.style('position', 'absolute')
											.style('width', '250px')
											.style('height', '70px')
											.style('border', '2px solid black')
											.attr('class', 'tool-tip')
											.style('opacity', 0)
											.style('background-color', 'whitesmoke')
											.style('border-radius', '2em');
											
				
				
						var infoBox = rootElem.append('div')
											.style('position', 'absolute')
											.style('width', '150px')
											.style('height', '150px')
											.style('border', '2px solid black')
											.attr('class', 'tool-tip')
											.style('opacity', 0)
											.style('background-color', 'whitesmoke')
											.style('border-radius', '2em');
				
				
/////////////////////////////////////////////////
///////////////////////////////////////////////// Rendering
/////////////////////////////////////////////////
				
				
						var airportData = orderData(result);
						
						
						var airports = svg.selectAll(".airport-label")
							.data(airportData)
							.enter().append("circle")
							.attr("class", "place-label")
							.attr("cx", function(d) {
								return projection([d.lat, d.lon])[0];
							})
							.attr("cy", function(d) {
								return projection([d.lat, d.lon])[1];
							})
							.attr('r', 2)
							.style('fill', '#FFBF00');
							
						airports
							.on('mouseover', function(d){
								d3.select(this).style("fill", 'red')
								tooltip.style("opacity", 1)							
								tooltip.html('<p style="margin-bottom:0px; margin-top:6px; padding:0px; text-align: center; font-weight:bold">' + d.name + '</p> </br>' + '<p style="margin-top:-10px; padding:2px;text-align: center;">( '+ d.IATA + ' )<p>' )
								   .style("left", (d3.mouse(this)[0] + 10)  + "px")
									.style("top", (d3.mouse(this)[1] - 70)  + "px")})
							.on("mousemove", function(d) {													
								tooltip.html('<p style="margin-bottom:0px; margin-top:6px; padding:0px; text-align: center; font-weight:bold">' + d.name + '</p> </br>' + '<p style="margin-top:-10px; padding:2px;text-align: center;"> (' + d.IATA+ ') <p>' )
								   .style("left", (d3.mouse(this)[0] + 10) + "px")
								   .style("top", (d3.mouse(this)[1] - 70)  + "px");
								})	
							.on("mouseout", function(d) {
								d3.selectAll(".place-label").style("fill", '#FFBF00')
								tooltip.style("opacity", 0)})	
							.on("click", function(d) {
								currentSource = d;
								d3.select(this)
									.attr('class','source');
									
								var
									iata = {'data' : d, 'x': 900, 'y': 605, 'fontSize':28, 'attr': 'IATA', 'fontColor': 'gray'},
									title = {'data' : d, 'x': 900, 'y': 635, 'fontSize':20, 'attr': 'name', 'fontColor': 'white' },
									city = {'data' : d, 'x': 900, 'y': 660, 'fontSize':12, 'attr': 'city', 'fontColor': 'white' },
									country = {'data' : d, 'x': 900, 'y': 685, 'fontSize':16, 'attr': 'country', 'fontColor': '#FFBF00'}
								svg.selectAll('.text-block').remove();
								svg.selectAll('.text-block').remove();
								showAirPortDetails(iata)								
								showAirPortDetails(title)
								showAirPortDetails(city)
								showAirPortDetails(country)
								getTargetAirports(d.valueId)});

								
		

						
					});
										
					
					// CONCAT("SourceAirports.csv"."Airport ID", "SourceAirports.csv"."Airport ID")
					// the result returned by the pql service contains a tabular view on the data table as well as some meta data.
					// You can access the data using the result.data property. result.data is a two-dimensional array which contains
					// the values for the selected data field.

					// If you have errors in your query or it can not be processed for a specific reason, there is a result.message property which
					// contains the error message generated by the server.

					// In the next step, you need to update your data binding in the d3 component using the enter and exit selections.
				});
			}
		}
	}
});






					
							

														





