define([
    'marionette',
    'backbone',
    'jquery',
    'underscore'],function(Marionette,Backbone,$,_){
    "use strict";
    
	var footerView = Marionette.ItemView.extend({
		template: _.template('<p></p>')
	})

	return{
		footerView: footerView
	}
});