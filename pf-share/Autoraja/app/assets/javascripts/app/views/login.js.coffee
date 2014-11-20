class App.Views.Login extends Backbone.View
	
	initialize:->
		#Do nothing

	template: HandlebarsTemplates.login
		

	render:->
		@$el.html(@template())
		@