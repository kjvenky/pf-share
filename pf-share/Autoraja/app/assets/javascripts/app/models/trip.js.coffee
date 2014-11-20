class App.Models.Trip extends Backbone.Model
	
	initialize:->
		# Do Nothing		

	urlRoot: '/trips'


class App.Collections.Trips extends Backbone.Collection
	model: App.Models.Trip
	url: '/trips'	