class App.Views.Content extends Backbone.View

	className: 'row'

	initialize:->
		@listenTo App.Vent, "trip:new", @swapMaintoNew
		@listenTo App.Vent, "trip:reset", @swapMaintoTripList
		@listenTo App.Vent, "trip:cancel", @swapMaintoCancel
		@listenTo App.Vent, "user:new", @swapMaintoNewUser
		@listenTo App.Vent, "user:reset", @swapMaintoUserList
		#Do nothing

	template:HandlebarsTemplates.content

	swapMaintoNewUser:->
		@swapMain(new App.Views.NewUser({model: new App.Models.User}))

	swapMaintoTripList:->
		@swapMain(new App.Views.TripsList({collection: new App.Collections.Trips}))

	swapMaintoUserList:->
		console.log "Userlis"
		@swapMain(new App.Views.UsersList({collection: new App.Collections.Users}))

	swapMaintoCancel:->
		@swapMain(new App.Views.TripCancel())

	swapMaintoNew:->
		@swapMain(new App.Views.NewTrip({model: new App.Models.Trip }))

	swapMain: (v)->
		@changeMainView(v)
		$('#main-area').html(@currentMainView.render().el)
			
	changeMainView:(v)-> 
		@currentMainView.remove() if @currentMainView
		@currentMainView = v

	render:->
		@$el.html(@template())
		@