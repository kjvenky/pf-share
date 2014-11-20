class App.Views.Header extends Backbone.View
	
	initialize:->
		# Do nothing
		
	template: HandlebarsTemplates.header

	render:->
		@$el.html(@template())
		@