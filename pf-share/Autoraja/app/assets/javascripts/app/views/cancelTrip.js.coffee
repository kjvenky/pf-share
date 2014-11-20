class App.Views.TripCancel extends Backbone.View
	
	initialize:->
		#Do nothing

	template: HandlebarsTemplates.trip_cancel

	render:->
		@$el.html(@template())
		@