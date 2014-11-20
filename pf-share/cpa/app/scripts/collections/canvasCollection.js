	define([
    'marionette',
    'backbone',
    'jquery',
    'underscore',
    'scripts/models/canvasComponent',
    'scripts/models/circleComponent',
    'scripts/models/squareComponent',	
    'scripts/collections/baseCollection'],function(Marionette,Backbone,$,_,canvasComponent,circleComponent,squareComponent,baseCollection){

    // Extends base component
	var canvasCollection = baseCollection.baseCollection.extend({		
		model: canvasComponent,
		initialize:function(options){
			canvasCollection.__super__.initialize.call(this, options)

			// Write a js that automatically does this. Say Palletelist.js
			// this.add(new circleComponent.circleComponent({cx:50, cy: 50, baseValue: 30, type: "circle"}))
			// this.add(new circleComponent.circleComponent({cx:125, cy: 50, baseValue: 30, type: "circle"}))

			// this.add(new circleComponent.circleComponent({title: 'Circle 2', cx:50, cy: 125}))
			// this.add(new squareComponent.squareComponent({cx:125, cy: 125}))
			
		},
		add:function(options){
			canvasCollection.__super__.add.call(this,options)
			// Also clone the connection points
		}
	});

	return{
		canvasCollection: canvasCollection
	}
});