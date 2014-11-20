class App.Views.Footer extends Backbone.View
	
	initialize:->
		#Do nothing

	template:HandlebarsTemplates.footer
		

	render:->
		@$el.html(@template())
		@