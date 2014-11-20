define([
    'marionette',
    'backbone',
    'jquery',
    'underscore',
    'raphael',
    'scripts/views/baseComponentView',
    'text!scripts/tpl/palleteComponent.tpl'],function(Marionette,Backbone,$,_,Raphael,BaseView,Template){
    "use strict";

    var palleteComponentView = BaseView.baseComponentView.extend({
    	template: _.template(Template),
		initialize: function(options){
			this.paper = options.paper || undefined
			this.palleteSet = options.palleteSet || undefined
			palleteComponentView.__super__.initialize.call(this, options)
			// _.bindAll(this,'start','end','move','raphaelEvents')

			// Render component elements based on the type
			// temp fix
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
			// Bind the required drag functionalities	
			// this.element.drag(this.move, this.start, this.end)
			// this.element.id gives id of the each element on the paper
			// Not sure of how this working 
			// this.model.on('change', this.render, this)
			// console.log(this.setElement(this.element.node))
			// Extend element events to add backbone events
			_.extend(this.element.events, Backbone.events) 

			// Bind the backbone events to Rapheal manual. Should be a better way to do this
			this.raphaelEvents()
		},

		events:{
			'click': 'raphaelEvents'
		},
		raphaelEvents:function(){
			// On double click add model to the canvas
			this.element.dblclick(function(){			
				// Render a view with the properties on doubleclick in the canvas
				// Clone is not clean as it needs to also clone the other connection points
				app.canvasCollection.add(this.model.canvasClone())
			},this)			
		},
		// start:function(){
		// 	this.ox = this.model.x()
		// 	this.oy = this.model.y()
		// 	this.element.animate({r: 40, opacity: .8, fill: "red"}, 500, ">"); // Just trying out animate
		// },

		// move:function(dx,dy){
		// 	this.model.set({
		// 		'cx': this.ox + dx,
		// 		'cy': this.oy + dy
		// 	})
		// },

		// end:function(){
		// 	this.element.animate({r: 30, opacity: .5, fill: "green"}, 500, ">");
		// },

		// Restrict the element from going out of the canvas
		// Prevent element overlap
		// Create vertices for element to connect
		// Should just move the element not re-draw it
		render:function(){
			palleteComponentView.__super__.render.call(this);    		
			// This is autorendering the element setting the attributes
			this.element.attr('cx',this.model.x());
			this.element.attr('cy',this.model.y());
			return this
		}
	})

	return{
		palleteComponentView: palleteComponentView
	}
});	