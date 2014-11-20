define([
    'marionette',
    'backbone',
    'jquery',
    'underscore',
    'text!scripts/tpl/header.tpl'],function(Marionette,Backbone,$,_,HeaderTpl){
    "use strict";
	var headerView = Marionette.ItemView.extend({
		template: _.template(HeaderTpl),
	})

	return{
		headerView: headerView
	}
});