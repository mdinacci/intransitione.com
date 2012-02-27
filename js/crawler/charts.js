/* 
 This file initialise the Google Visualization API and perform the AJAX calls
 to retrieve the data for all the charts.
 It requires JQuery, Google Visualization API and RaphaelJS
 */

String.prototype.ucfirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function handleError(response) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
}

function load() {
    google.load("visualization", "1", {packages:["corechart"]});
}

function fetchData(vizURL) {
    return $.ajax({
        type: "GET",
        url: "/cgi-bin/proxy.php?v=" + vizURL,
        dataType:"json",
        async: false
        }).responseText;
}

// Display a country based intensity map 
function drawJobsByCountry() {
}

// Display data regarding remote and local jobs as a pie chart
function drawJobsRemoteVsLocal() {
    var data = new google.visualization.DataTable(fetchData('remotevslocal'));
    var visualization = new google.visualization.PieChart(document.getElementById('remote_vs_local_chart'));
    visualization.draw(data, {is3D:true});
}

// This also requires swfobject.js, currently unused as it's not very useful (though pretty...)
function drawJobsByTagCumulus() {
    var data = new google.visualization.DataTable(fetchData('tagcumulus'));
    var visualization = new gviz_word_cumulus.WordCumulus(document.getElementById('tag_chart_cumulus'));
    visualization.draw(data, {text_color: '#000000', speed: 30, width:400, height:400});
}

// Display the occurrence of tags as a term cloud. Nothing particularly fancy, the style is defined externally.
function drawJobsByTagCloud() { 
    var data = new google.visualization.DataTable(fetchData('tagcloud'));
    var visualization = new TermCloud(document.getElementById("tag_chart_cloud"));
    visualization.draw(data, null);
}

function randomColor() {
    return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}

function drawTagsRelated() {
    var data = $.parseJSON(fetchData('tagsgraph'));

	var size = 0, max_occurrence = 0, min_occurrence = 999;
	var colors = {};
    if(data != null) {
	    var key;
		for (key in data) {
			if (data.hasOwnProperty(key)) {
				size++;
				 if(colors[key] === undefined)
				       colors[key] = randomColor();
			   	var length = data[key].length;
			   	for(var i=0; i < length; i++) {
				   tag = data[key][i][0];
				   if(colors[tag] === undefined)
				       colors[tag] = randomColor();
			   	   occurrence = data[key][i][1]
				   if(occurrence > max_occurrence)
				       max_occurrence = occurrence;
				   if(occurrence < min_occurrence)
				       min_occurrence = occurrence;
				}
			}
		}
    	var row_height = 90;
    	var row_width = 600;
        var paper = Raphael("tagsgraph", row_width, row_height * (size+1));
		
		var max_radius = 43, min_radius = 9;
		var factor = (max_radius - min_radius)/max_occurrence ;
		var font_factor = (35 - 10)/max_occurrence ;
		var y = 50;
		var voffset_text_circle = 8;
		var hoffset_circle_circle = 10;
		for (key in data) {
		   if (data.hasOwnProperty(key))  {
			   var x=115;
			   paper.text(35, y, key.ucfirst() + ": ").attr("font-size",15);
			   var length = data[key].length;
			   for(var i=0; i < length; i++) {
			   		   occurrence = data[key][i][1]
					   tag = data[key][i][0];
					   
					   // Shorten some very long tags to improve the aesthetic. hackish.
					   if(tag == "ruby-on-rails")
					       tag = "ror";
					   else if (tag == "objective-c")
					       tag = "obj-c";
					   else if (tag == "javascript")
					       tag = "js";
					       
					   radius = occurrence * factor + min_radius;
					   paper.circle(x, y, radius).attr("fill",colors[tag]);
					   paper.text(x, y, occurrence).attr("font-size",occurrence * font_factor + 10);
					   paper.text(x, y+radius+voffset_text_circle, tag);

					   // increase x by: radius current + radius next + constant offset
					   if(i < length-1) { 
					   	   var next_radius = data[key][i+1][1]*factor+min_radius;
					       x+= radius + next_radius + hoffset_circle_circle;
					   }
			   }
			   y+=row_height;
		   }
		}
    }
}

function debug(str) {
	document.getElementById('debug').innerHTML += str;
}
