	define([
    'marionette',
    'backbone',
    'jquery',
    'underscore',
    'scripts/models/connectorComponent',
    'scripts/models/circleComponent',
    'scripts/models/squareComponent',	
    'scripts/collections/baseCollection'],function(Marionette,Backbone,$,_,ConnectorComponent,circleComponent,squareComponent,baseCollection){

    // Extends base component
	var connectorCollection = baseCollection.baseCollection.extend({		
		model: ConnectorComponent.connectorComponent,
		initialize:function(options){
			connectorCollection.__super__.initialize.call(this, options)

			// Write a js that automatically does this.
			// Initialize a connector component for test
			this.add(new ConnectorComponent.connectorComponent({
					title:"Connector1",
					startX:100,
					startY:100,
					endX:300,
					endY:300,
					pathString:"M114 253 L345 293 434 393",
					objs: [], // Objects that are connected
					strokeColor: 'black',
					fillColor: 'black',
					created:0,	
			}));
			this.add(new ConnectorComponent.connectorComponent({
					title:"Connector2",
					startX:300,
					startY:300,
					endX:100,
					endY:100,
					pathString:"M214 353 L645 233 534 393",
					objs: [], // Objects that are connected
					strokeColor: 'black',
					fillColor: 'black',
					created:0,	
			}));

		},
		add:function(options){
			connectorCollection.__super__.add.call(this,options)		
		}
	});

	return{
		connectorCollection: connectorCollection
	}
});