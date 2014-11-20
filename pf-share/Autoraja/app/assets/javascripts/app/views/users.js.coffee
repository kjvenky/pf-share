class App.Views.Users extends Backbone.View
	
	initialize:->
		@listenTo @collection, "reset", @render		
		@collection.fetch({reset: true})
		
	template: HandlebarsTemplates.users

	events:
		'click tr': 'test'

	test:->
		console.log 'Wow@'

	renderEach: (model)->
		v = new App.Views.User({model: model})
		@$('table#usersTable').append(v.render().el)

	render:->
		@$el.html(@template())
		@collection.forEach @renderEach, @
		@
