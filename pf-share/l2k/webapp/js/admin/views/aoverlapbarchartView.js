define(['jquery',
	'backbone',
	'underscore',
	'd3',
	'js/admin/views/abarChartView'
	],function($,Backbone,_,d3,abarChartView){
		"use strict"

		var aoverlapbarchartView =  abarChartView.abarChartView.extend({// Can be extended from the basic chart view itself
			
			initialize:function(options){
				this.constructor.__super__.initialize.call(this, options)
			},

			draw:function(){ // Draw a plot with the given data
				var width = this.options.width;
				var xoffset = 3;
				var xAxisHeight = this.options.xAxisHeight;
				var yAxisWidth = 40;
				var ylabel = this.options.ylabel;
				var xlabel = this.options.xlabel;
				var xPadding = this.options.xPadding;
				var xFormat = this.options.xFormat;
				var xTitleHeight = this.options.xTitleHeight;
				var xtickRotate = this.options.xtickRotate;
				var height = this.options.height;
				// Finding the max of array
				var mFactor = (height-xTitleHeight-xAxisHeight-20)/this.max(_.clone(this.data));
				var barWidth = (width-this.data.length*xoffset-yAxisWidth)/this.data.length;

				//  Create chart area
				var chart = d3.select(this.el).append("svg") // Needs to be taken from the view
								.attr("width", width) // To be based on the size of the window itself
								.attr("height", height)
								.append("g") // Grouping the graph
								.attr("transform", "translate("+yAxisWidth+", 0)"); // Space for x and y axis

				//  XAxis Formatting
				if(xFormat === "Dates"){
					var x = d3.time.scale()
									.domain([d3.time.day.offset(new Date(), -this.data.length), new Date()])
									.range([0, width-yAxisWidth])
					var xAxis = d3.svg.axis() // X axis
								.scale(x)
								.orient("bottom")
								.ticks(this.data.length-1)
								.tickFormat(d3.time.format("%d-%m"))

				} else if(xFormat === "labels"){
					var range = [];
					_.each(this.data,function(d,i){
								return range.push(i*(barWidth+xoffset)+barWidth/2);
							}, this);
					var x = d3.scale.ordinal()
							  .domain(this.options.xlabels)	
							  .range(range)
					var xAxis = d3.svg.axis() // X axis
								.scale(x)
								.orient("bottom")
				}else{
					var x = d3.scale.linear()
							  .domain([0, data.length])
							  .range([0, width-yAxisWidth])		
				
					var xAxis = d3.svg.axis() // X axis
								.scale(x)
								.orient("bottom")
								.ticks(this.data.length-1)
				}

				chart.append("g")
					.attr("class", "x axis")
					.attr('transform', 'translate(0, '+(height-xAxisHeight-xTitleHeight)+')')
					.style({ 'stroke': 'Black', 'fill': 'none'})
					.call(xAxis)
					.selectAll("text")  
			            .style("text-anchor", "end")
			            .attr("dx", this.options.xTickdx)
			            .attr("dy", this.options.xTickdy)
			            .attr("transform","rotate("+xtickRotate+")");	

				chart.append("text")
					.attr("x",width/2)
					.attr("y",height-xTitleHeight)
					.attr("dy", "1em")
					.style({"text-anchor": "middle", 'font-size': '20px', 'font-family': this.options.fontFamily})
					.text(xlabel);

				//  Y axis Formatting
				var y = d3.scale.ordinal()
						.rangeRoundBands([0, width], xoffset);	

				chart.append("text")
					.attr("transform", "rotate(-90)")
					.attr("x",0 - (height / 2))
					.attr("y",0 - yAxisWidth)
					.attr("dy", "1em")
					.style({"text-anchor": "middle", 'font-size': '20px', 'font-family': this.options.fontFamily})
					.text(ylabel);				


				var bars = chart.selectAll(".bar")
								.data(this.data)
								.enter().append('g')
				// Plot the bars
				bars.append("rect")
					.attr("x", function(d,i) {
						return i*(barWidth+xoffset); 
					})
					.attr("y", (height-xAxisHeight-xPadding-xTitleHeight))
					.attr('height',0)
					.attr("width",barWidth) // Auto calculate width?
					.attr("class", function(d){
						if(d<0){
							return'bar-negitive';
						}else{
							return 'bar';
						}
					})
				    .attr("fill", "teal")
				    .transition()
					    .delay(function(d, i) { return i * 50; })
					    .attr('y', function(d) { 
					    	var d = (d<0)?-1*d:d;
					    	return height-mFactor*d-xAxisHeight-xPadding-xTitleHeight; 
					    })
					    .attr('height', function(d) { 							        
					    	var barHeight = (d<0)?-1*mFactor*d:mFactor*d;
					    	return barHeight + "px"; 
						    });

				// Append text information to each bar    
				bars.append("text")
					.attr("x",function(d,i) { return i*(barWidth+xoffset)+barWidth/2; })
					.attr("y", function(d) {
						var d = (d<0)?-1*d:d;
						if(mFactor*d<18){ // Change thse to global options
							return height-mFactor*d-xAxisHeight-xTitleHeight-25;
						}else{
							return height-mFactor*d-xAxisHeight-xTitleHeight-4;
						};	
					})
					.attr("dy", "1em")
					.attr("fill",function(d){ // Change thse to global options
						var d = (d<0)?-1*d:d;
						return (mFactor*d<18)?"black":"white"
					})
					.style({"text-anchor": "middle", 'font-size': toString(this.options.fontSize)+'px','font-family': this.options.fontFamily})
					.text(function(d){return d.toFixed(0)});

			}

		})
		return {
			aoverlapbarchartView: aoverlapbarchartView
		}
})