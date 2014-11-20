define([
    'marionette',
    'backbone',
    'jquery',
    'underscore',
    'raphael',
    'scripts/views/baseComponentView',
    'text!scripts/tpl/canvas.tpl',],function(Marionette,Backbone,$,_,Raphael,BaseView,Template){
    "use strict";
    var squareComponentView = BaseView.baseComponentView.extend({
		template: _.template(Template),
		initialize: function(options){
			squareComponentView.__super__.initialize.call(this, options)		
		},
        render: function(){
            return this
        }
	})

	return{
		squareComponentView: squareComponentView
	} 
});