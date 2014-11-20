define([
    'marionette',
    'backbone',
    'jquery',
    'underscore',
    'raphael',
    'scripts/views/baseComponentView',
    'text!scripts/tpl/canvas.tpl',],function(Marionette,Backbone,$,_,Raphael,BaseView,Template){
    "use strict";
    var circleComponentView = BaseView.baseComponentView.extend({
		template: _.template(Template),
		initialize: function(options){
			circleComponentView.__super__.initialize.call(this, options)
		},
		render:function(){			
			return this
		}
	})

	return{
		circleComponentView: circleComponentView
	}
});