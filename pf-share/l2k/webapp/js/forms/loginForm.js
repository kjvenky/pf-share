define(['jquery',
	'backbone',
	'underscore',
	'forms',	
	'js/models/userModel',
	'text!js/tpl/login.tpl'],function($,Backbone,_,forms,user, Template){

		var loginForm = Backbone.Form.extend({ // extend empty form
			schema: {
				email:      { validators: ['required', 'email'] },
				password:   'Password'
			},
			submitButton: 'Login',
			submit: function(e){
			}
		});

		return {
			loginForm: loginForm
		}

	});

