#= require_self
#= require_tree ./templates
#= require_tree ./models
#= require_tree ./views
#= require_tree ./routers

window.App =
	Routers: {}
	Views:{}
	Collections:{}
	Models:{}
	Vent: _.clone(Backbone.Events)
	initialize: -> 
		new App.Routers.MainRouter() #Main routers
		Backbone.history.start()