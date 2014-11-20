class App.Views.NewUser extends Backbone.View
	
	initialize:->
		#Do nothing

	template:HandlebarsTemplates.new_user

	render:->
		@$el.html(@template(@model.toJSON()))
		@