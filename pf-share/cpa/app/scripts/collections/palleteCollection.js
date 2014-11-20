	define([
    'marionette',
    'backbone',
    'jquery',
    'underscore',
    'scripts/models/baseComponent',
    'scripts/models/circleComponent',
    'scripts/models/squareComponent',	
    'scripts/collections/baseCollection'],function(Marionette,Backbone,$,_,baseComponent,circleComponent,squareComponent,baseCollection){

    // Extends base component
	var palleteCollection = baseCollection.baseCollection.extend({
		model: baseComponent,
		initialize:function(options){
			palleteCollection.__super__.initialize.call(this, options)

			// Write a js that automatically does this. Say Palletelist.js
			this.add(new circleComponent.circleComponent({cx:50, cy: 50, baseValue: 30, type: "circle"}))
			this.add(new circleComponent.circleComponent({cx:125, cy: 50, baseValue: 30, type: "circle"}))
			this.add(new circleComponent.circleComponent({title: 'Circle 2', cx:50, cy: 125, baseValue: 30, type: "circle"}))
			this.add(new circleComponent.circleComponent({cx:125, cy: 125, baseValue: 30, type: "circle"}))
		}
	});

	return{
		palleteCollection: palleteCollection
	}
});