define([
    'marionette',
    'backbone',
    'jquery',
    'underscore',
    'raphael',
    'backbone.localStorage'],function(Marionette,Backbone,$,_,Raphael,localStorage){
    var connectorComponent = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage('gdsim-canvas'),
		// Connector properties
		defaults:{ 
			title:"Connector",
			startX:0,
			startY:0,
			endX:0,
			endY:0,
			pathString:'',
			objs: [], // Objects that are connected
			strokeColor: '#fff',
			fillColor: 'Default',
			created:0,
		},
		initialize:function(options){
			if (this.isNew()) { // Gen random fun. Not sure of the its purpose.
				this.set('created', Date.now()); // Set the created date. Not sure of the use.
			} 
		},
		startX: function(){return this.get('startX')},
		startY: function(){return this.get('startY')},
		startX: function(){return this.get('startX')},
		startY: function(){return this.get('startY')},		
		sColor: function(){return this.get('strokeColor')},
		fColor: function(){return this.get('fillColor')},
		render: function(){
			return this
		}
	})

	return{
		connectorComponent : connectorComponent
	}
});