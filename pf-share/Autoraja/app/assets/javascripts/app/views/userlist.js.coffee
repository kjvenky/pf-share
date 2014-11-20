class App.Views.UsersList extends Backbone.View
	
	initialize:->
		@listenTo @collection, "reset", @render		
		@collection.fetch({reset: true})

	template: HandlebarsTemplates.users

	renderEach: (model)->
		v = new App.Views.User({model: model})
		@$('table#UsersTable').append(v.render().el)

	render:->
		@$el.html(@template())
		@collection.forEach @renderEach, @		
		@