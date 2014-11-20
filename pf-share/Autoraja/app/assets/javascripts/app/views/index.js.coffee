class App.Views.Index extends Backbone.View
	
	initialize:->
		# Do Nothing

	template: HandlebarsTemplates.index

	render:->
		@$el.html(@template())
		@