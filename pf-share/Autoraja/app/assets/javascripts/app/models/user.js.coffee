class App.Models.User extends Backbone.Model
	urlRoot: '/users'

class App.Collections.Users extends Backbone.Collection
	model: App.Models.User
	url: '/users.json'
