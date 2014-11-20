class App.Views.Trip extends Backbone.View
	
	initialize:->
		#Do nothing

	template: HandlebarsTemplates.trip

	tagName: 'tr'

	render:->
		@$el.html(@template(@model.toJSON()))
		@