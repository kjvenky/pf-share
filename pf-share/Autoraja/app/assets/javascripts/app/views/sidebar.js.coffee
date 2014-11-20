class App.Views.Sidebar extends Backbone.View
	
	initialize:->
		#Do nothing

	tagName: 'nav'

	className:'navbar-default navbar-static-side'

	attributes:
		id: 'sidebar'
		role: 'navigation'	

	events:->
		"click #newUser": "newUser"
		"click #userList": "userList"
		"click #tripList": "tripList"
		"click #newBooking": "newBooking"
		"click #cancelBooking": "cancelBooking"
		
	newUser:->
		App.Vent.trigger "user:new"
		Backbone.history.navigate '/users/new'

	userList:->
		App.Vent.trigger "user:reset"
		Backbone.history.navigate '/users'

	tripList:-> 
		App.Vent.trigger "trip:reset"
		Backbone.history.navigate '/trips'

	newBooking:->
		App.Vent.trigger "trip:new"
		Backbone.history.navigate '/trips/new'

	cancelBooking:->
		App.Vent.trigger "trip:cancel"
		Backbone.history.navigate '/trips/cancel'

	template:HandlebarsTemplates.sidebar

	render:->
		@$el.html(@template())
		@