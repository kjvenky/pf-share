class App.Views.NewTrip extends Backbone.View
	initialize:->
		# Do nothing

	className: 'row'

	template: HandlebarsTemplates.new_trip
			
	render:->
		@$el.html(@template(@model.toJSON()))
		@