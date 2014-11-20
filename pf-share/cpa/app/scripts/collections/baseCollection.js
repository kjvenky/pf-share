define([
    'marionette',
    'backbone',
    'jquery',
    'underscore',
    'scripts/models/baseComponent',
    'backbone.localStorage'],function(Marionette,Backbone,$,_,baseComponent,localStorage){
    "use strict";
    // Abstract collection used only for extending to other components
	var baseCollection = Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage('gdsim-backbone'),
		model: baseComponent,
		initialize:function(options){
		},
	})

	return{
		baseCollection : baseCollection
	}
});