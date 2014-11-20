define([
    'marionette',
    'backbone',
    'jquery',
    'underscore',
    'raphael',
    'scripts/views/baseComponentView',
    'text!scripts/tpl/palleteComponent.tpl'],function(Marionette,Backbone,$,_,Raphael,BaseView,Template){
    "use strict";

    var connectionPointView = Marionette.CollectionView.extend({
    	template: _.template(Template),
		initialize: function(options){
			connectionPointView.__super__.initialize.call(this, options)			
			this.paper = options.paper || undefined
			this.palleteSet = options.palleteSet || undefined
			this.parent = options.parent || undefined
			// _.bindAll(this,'start','end','move','raphaelEvents')
			
			// Set the model values based on the parent
			this.model.set({
				px: this.parent.x(),
				py: this.parent.y(),
			})

			this.element = this.paper.circle(this.model.cx(),this.model.cy(),this.model.baseValue()).attr({
				fill: "white",
				stroke: "black"
			})

			// console.log(this.model);
			// Bind the required drag functionalities	
			// this.element.drag(this.move, this.start, this.end)
			// this.element.id gives id of the each element on the paper
			// Not sure of how this working 
			// Change the connection points also on changing
			this.model.on('change', this.render, this)

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
			// this.element.dblclick(function(){
			// 	console.log("Start a new connection path with this starting point")
			// 	// Render a view with the properties on doubleclick
			// })
			this.element.click(function(){
				console.log("Start a new connection path with this starting point")
				
				// Create a new connnection object and start rendering it
				

			})
			this.element.mouseover(function(){
				this.element.animate({
					fill:"black",
					r:5
				}).animate(	)
			},this)	
			this.element.mouseout(function(){
				this.element.attr({
					fill: "white",
					r:3
				})
			},this)	
		},

		//  This doesnt need drag functionality
		// start:function(){
		// 	this.ox = this.model.x()
		// 	this.oy = this.model.y()
		// 	this.element.animate({r: this.model.baseValue()*1.75, opacity: .8, fill: "red"}, 500, ">"); // Just trying out animate
		// },

		// move:function(dx,dy){
		// 	this.model.set({
		// 		'cx': this.ox + dx,
		// 		'cy': this.oy + dy
		// 	})
		// },
 
		// end:function(){
		// 	this.element.animate({r: this.model.baseValue()*1.5, opacity: .5, fill: "green"}, 500, ">");
		// },

		render:function(){
			connectionPointView.__super__.render.call(this);    		
			// This is autorendering the element setting the attributes
			this.element.attr('cx',this.model.cx());
			this.element.attr('cy',this.model.cy());
			return this
		}
	})

	return{
		connectionPointView: connectionPointView
	}
});