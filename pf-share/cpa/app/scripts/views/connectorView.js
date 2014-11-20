define([
    'marionette',
    'backbone',
    'jquery',
    'underscore',
    'raphael',
    'scripts/views/baseComponentView',
    'scripts/views/connectionPointView',
    'scripts/models/connectorComponent',],function(Marionette,Backbone,$,_,Raphael,BaseView,connectionPointView,ConnectorComponent){
    "use strict";

    var connectorView = BaseView.baseComponentView.extend({
		initialize: function(options){
			this.paper = options.paper || undefined
			connectorView.__super__.initialize.call(this, options)
			
			// Start with two components
			// this.element.drag(this.move, this.start, this.end)
			
			// Change the connection points also on changing
			// this.model.on('change', this.render, this)

			// Draw path from model on the same paper
			this.element = this.paper.connection();

			// Extend element events to add backbone events
			this.raphaelEvents()// Bind the backbone events to Rapheal manual. Should be a better way to do this
		},

		// Not sure why this is working
		events:{
			'click': 'raphaelEvents'
		},


		raphaelEvents:function(){
			// this.element.dblclick(function(){
			// 	console.log("Clicking on the path")
			// },this)
		},


		// Restrict the element from going out of the canvas
		// Prevent element overlap
		// Create vertices for element to connect
		// Should just move the element not re-draw it
		render:function(){
			connectorView.__super__.render.call(this);    		
			return this
		}
	})

	return{
		connectorView: connectorView
	}
});