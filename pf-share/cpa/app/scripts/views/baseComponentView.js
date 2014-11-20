define([
	'marionette',
	'backbone',
	'jquery',
	'underscore',
	'raphael',    
	],function(Marionette,Backbone,$,_,R){
		"use strict";

    // Abstract class tp be extended
    var baseComponentView = Marionette.ItemView.extend({
    	initialize: function(options){
    		this.paper = options.paper || undefined
    	},
    	render: function(){
    		// Get information from the acutall model initialize
    		// One method is to render based on the model type
    		return this 
    	}
    })

    return{
    	baseComponentView: baseComponentView
    }
}); 