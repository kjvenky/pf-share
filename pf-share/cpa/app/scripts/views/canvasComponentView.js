define([
    'marionette',
    'backbone',
    'jquery',
    'underscore',
    'raphael',
    'scripts/views/baseComponentView',
    'scripts/views/connectionPointView',
    'text!scripts/tpl/palleteComponent.tpl'],function(Marionette,Backbone,$,_,Raphael,BaseView,connectionPointView,Template){
    "use strict";

    var canvasComponentView = BaseView.baseComponentView.extend({
    	template: _.template(Template),
		initialize: function(options){
			this.paper = options.paper || undefined
			this.palleteSet = options.palleteSet || undefined
			canvasComponentView.__super__.initialize.call(this, options)
			_.bindAll(this,'start','end','move','raphaelEvents')

			this.connectionPtsViews = []
			// Make the element based on the data
			// Render the model as square or circle or other type 
			// Render the model and attach to wrapper
			// Add element to the Canvas by doubleclick
			// Add element to Canvas by drag
			// Paper.setViewbox can give the ability to zoom
			// this.element.id gives id of the each element on the paper			
			// Useful to change the path on node drag
			// http://stackoverflow.com/questions/18122072/how-to-draw-a-polygon-with-control-point-for-each-corner-using-raphael-js
			
			// Start with two components
			
			// Render a unique Raphel view
			if(this.model.get('type') == 'circle'){	
			this.element = this.paper.circle(this.model.x(),this.model.y(),this.model.baseValue()).attr({
					fill: "green",
					cursor: "move",
					opacity: 0.5,
					stroke: "none"
				})
			}else if(this.model.get('type') == "square"){
				this.element = this.paper.rect(this.model.x(),this.model.y(),this.model.baseValue(),this.model.baseValue()).attr({
					fill: "red",
					cursor: "move",
					opacity: 0.5,
					stroke: "none"
				})			
			} else{
				alert('Component not found')
			}

			this.element.drag(this.move, this.start, this.end)
			// Not sure of how this working 
			// Change the connection points also on changing
			this.model.on('change', this.render, this)
			this.model.on('change', this.connectionPoints, this)

			// Extend element events to add backbone events
			// _.extend(this.element.events, Backbone.events) 

			this.raphaelEvents()// Bind the backbone events to Rapheal manual. Should be a better way to do this
			this.connectionPoints()	// Render the connection points
		},

		// Not sure why this is working
		events:{
			'click': 'raphaelEvents'
		},

		// Create and handle connection points
		connectionPoints:function(){
			if(this.connectionPtsViews.length){	// Update the connection model information based on the parent view
				_.each(this.model.connections(),function(model){
					model.update(this.model)
				},this);			
			}else{
			_.each(this.model.connections(),function(model){
				this.connectionPtsViews.push(new connectionPointView.connectionPointView({
						model: model,
						paper: this.paper,
						parent: this.model,
						size: 5
					}))
				},this);
			}
		},

		raphaelEvents:function(){
			this.element.dblclick(function(){
				console.log("Open a div with properties to update the model")
				// Render a view with the properties on doubleclick
			})
			this.element.mouseover(function(){
				this.element.attr({
					opacity:1,
					stroke:"black"
				})
			},this)	
			this.element.mouseout(function(){
				this.element.attr({
					opacity:0.5,
					stroke:"none"
				})
			},this)	
		},

		start:function(){
			this.ox = this.model.x()
			this.oy = this.model.y()
			this.element.animate({r: this.model.baseValue(), opacity: .9, fill: "green"}, 500, ">"); // Just trying out animate
		},

		move:function(dx,dy){
			this.model.set({
				'cx': this.ox + dx,
				'cy': this.oy + dy
			})
		},
 
		end:function(){
			this.element.animate({r: this.model.baseValue(), opacity: .5, fill: "green"}, 500, ">");
		},

		// Restrict the element from going out of the canvas
		// Prevent element overlap
		// Create vertices for element to connect
		// Should just move the element not re-draw it
		render:function(){
			canvasComponentView.__super__.render.call(this);    		
			// This is autorendering the element setting the attributes
			this.element.attr('cx',this.model.x());
			this.element.attr('cy',this.model.y());
			return this
		}
	})

	return{
		canvasComponentView: canvasComponentView
	}
});