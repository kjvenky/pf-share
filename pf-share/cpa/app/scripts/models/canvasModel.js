define([
    'marionette',
    'backbone',
    'jquery',
    'underscore',
    'raphael',
    'backbone.localStorage'],function(Marionette,Backbone,$,_,Raphael,localStorage){
    // Abstract component used only for extending to other components
	var canvasModel = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage('gdsim-canvas'),
		// Canvas properties
		defaults:{ 
			title:"",
			startX:0,
			startY:0,
			width:0,
			height:0,
			color: '#fff',
			theme: 'Default',
			created:0,
		},
		initialize:function(options){
			if (this.isNew()) { // Gen random fun. Not sure of the its purpose.
				this.set('created', Date.now()); // Set the created date. Not sure of the use.
			} 
			this.canvas = Raphael(this.startX(),this.startY(),this.width(),this.height())
			this.canvas.canvas.style.backgroundColor = this.color();
		},
		height: function(){ return this.get('height')},
		width: function(){return this.get('width')},
		startX: function(){return this.get('startX')},
		startY: function(){return this.get('startY')},
		color: function(){return this.get('color')},
		render: function(){
			return this
		}
	})

	return{
		canvasModel : canvasModel
	}
});