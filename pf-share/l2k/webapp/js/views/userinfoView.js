define(['jquery',
	'backbone',
	'underscore',
	'text!js/tpl/userinfo.tpl',
	'text!js/tpl/userinfo2.tpl',
	'js/views/settingsView',
	'js/views/outStandingView',
	'js/views/zoneFailView',
	'js/views/historyView',
	'js/views/topUpView',
	'js/views/clearBalanceView',
	'js/utils/userUtils'
	],function($,Backbone,_,Template,Template2,settingsView,outStandingView,zoneFailView,historyView,topUpView, clearBalanceView,userUtils){

		"use strict"

		var userinfoView = Backbone.View.extend({
			template: _.template(Template),
			initialize:function(){
				_.bindAll(this,'render','logout','uSettings','update');
			},

		// el element is important in binding the views
		events:{ // http://stackoverflow.com/questions/12433485/backbone-events-not-binding-to-dom-element
			'click button#submitLogin': 'sendLogin',
			'click #registerL': 'register',
			'click #logout': 'logout',
			'click #uSettings': 'uSettings',
			'click #transactionHistory': 'History',
			'click #orderHistory': 'History',
			'click #topUp': 'topUp',
			'click #clearBalance': 'clearBalance',
		},
		clearBalance:function(){
			$('#messages').html(new clearBalanceView.clearBalanceView().render().el).slideDown();
		},
		History:function(e){
			$('#messages').html(new historyView.historyView({type: e.target.id }).render().el).slideDown();
		},
		topUp:function(){
			$('#messages').html(new topUpView.topUpView().render().el).slideDown();
		},
		checkusername : function(username) { // Make form check
			var value;
			$.ajax({
				type : 'GET',
				url : contextUrl+ '/user/register/checkUsername?username='+ username,
				success : function(data) {
					value = data
				}
			})
			return !value
		},

		uSettings: function(){
			$('#messages').html(new settingsView.settingsView().render().el).slideDown();
		},

		logout: function(){
			app.session.attributes.username = undefined;
			app.session.attributes.userdata = undefined;
			app.session.attributes.outstandingA = undefined;
			app.session.attributes.isallowed = undefined;
			app.session.outstandingA = undefined;

			userUtils.topMessages('You are logged out Successfully!','topSuccess',5000)

			$('#pmessages').slideUp().html('')
			$('#messages').slideUp().html('')
			// Trigger change on logout
			$('#userinfo').append(this.$el.html(this.template()))
			$.removeCookie('is_logged');
		},
		update:function(){
			console.log("updating the view")
			// Check for user existance
			var userCheck =  this.checkusername($.cookie('username')) // Check if user is delete or deactivated by admin
			if($.cookie('is_logged') && userCheck){
				app.session.attributes.username = $.cookie('username') 
			}
			if(app.session.isAuthorized() || ($.cookie('is_logged') && userCheck)){
				var value = app.session.outstanding(app.session.attributes.username)
				this.$el.html(_.template(Template2,{username: app.session.attributes.username,walletAmount:100}))
			}else{
				this.$el.html(this.template())
			}
		},
		render: function(){
			// Check for user existance
			var userCheck =  this.checkusername($.cookie('username')) // Check if user is delete or deactivated by admin
			if($.cookie('is_logged') && userCheck){
				app.session.attributes.username = $.cookie('username') 
			}
			if(app.session.isAuthorized() || ($.cookie('is_logged') && userCheck)){
				var value = app.session.outstanding(app.session.attributes.username)
				this.$el.html(_.template(Template2,{username: app.session.attributes.username,walletAmount: value.amount.availableBalance}))
			}else{
				this.$el.html(this.template())
			}
			return this
		}

	})
		return {
			userinfoView: userinfoView
		}
	})