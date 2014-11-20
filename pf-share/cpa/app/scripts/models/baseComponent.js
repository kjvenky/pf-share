define([
    'marionette',
    'backbone',
    'jquery',
    'underscore',
    'backbone.localStorage'],function(Marionette,Backbone,$,_,localStorage){

    // Abstract component used only for extending to other components
	var baseComponent = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage('gdsim-backbone'),
		// List of attribtues of base components
		defaults:{ 
			title: 'Component',
			label: '',
			cx: 20,
			cy: 20,	
			category: '', // To organize pallete
			created: 0,
			baseValue:0,
			type:'default',
			connectionPoints:[] //Every component has connectors
		},

		initialize:function(options){
			if (this.isNew()) { // Gen random fun. Not sure of the its purpose.
				this.set('created', Date.now()); // Set the created date. Not sure of the use.
			}
		},
		x: function(){ return this.get('cx')},
		y: function(){return this.get('cy')},
		baseValue: function(){return this.get('baseValue')},
		connections:function(){ // To note that all elements will have connectionPoints
		}
	})

	return{
		baseComponent : baseComponent
	}
});