class App.Views.TripsList extends Backbone.View
	
	initialize:->
		@listenTo @collection, "reset", @render		
		@collection.fetch({reset: true})

	template: HandlebarsTemplates.trips

	renderEach: (model)->
		v = new App.Views.Trip({model: model})
		@$('table#tripsTable').append(v.render().el)

	render:->
		@$el.html(@template())
		@collection.forEach @renderEach, @		
		@