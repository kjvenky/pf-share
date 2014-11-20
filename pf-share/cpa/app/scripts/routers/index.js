define([
    'marionette',
    'backbone',
    'jquery',
    'underscore'],function(Marionette,Backbone,$,_){


	var router = Marionette.AppRouter.extend({
		appRoutes: {
			'*filter': 'setFilter'
		}		
	})

	return{
		router: router
	}
});