define([
	'marionette',
	'backbone',
	'jquery',
	'underscore',
	'scripts/app'],function(Marionette,Backbone,$,_,app){
	'use strict';

	return {
		setFilter: function (param) {
			app.vent.trigger('todoList:filter', param && param.trim() || '');
		}
	};
});