class App.Views.User extends Backbone.View
	
	initialize:->
		#Do nothing

	tagName: 'tr'

	template: HandlebarsTemplates.user_details

	render:->
		@$el.html(@template(@model.toJSON()))
		@
