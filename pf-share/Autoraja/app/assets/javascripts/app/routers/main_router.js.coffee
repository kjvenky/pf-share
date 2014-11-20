class App.Routers.MainRouter extends Backbone.Router
	initialize:->
		@headerView = new App.Views.Header()
		@sidebarView = new App.Views.Sidebar()
		@contentView = new App.Views.Content()
		@footerView = new App.Views.Footer()
		
	routes:
		"":"index" # Show Triplist by default
		"trips":"index"
		"users":"users"
		"login":"login"
		"signup": "signup" 
		"users":"users" # Controllers could have helped here?
		"users/new":"newUser" 
		"trips/new":"newTrip"
	
	users:->
		@layoutViews()
		@contentView.swapMain(new App.Views.Users({collection: new App.Collections.Users}))

	newTrip:->
		@layoutViews()
		@contentView.swapMain(new App.Views.NewTrip({model: new App.Models.Trip}))

	signup:->
		@layoutViews()
		alert "signup"

	login:->
		@loginView = new App.Views.Login()
		$('body').html(@loginView.render().el).addClass('login-body')

	index:->
		#Check for user loggedin or else render login view
		if 1==2
			@login() 
		else
			@layoutViews()
			@contentView.swapMain(new App.Views.TripsList({collection: new App.Collections.Trips}))
			
	layoutViews:->
		$('body').prepend(@sidebarView.render().el)
		$('#header').html(@headerView.render().el)
		$('#content').html(@contentView.render().el)
		$('#footer').html(@footerView.render().el)