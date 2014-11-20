define(['backbone','js/utils/userUtils'],function(Backbone,userUtils){
	"use strict"

	var sessionModel = Backbone.Model.extend({
   		 defaults: {
   		 	username: undefined,
   		 	isallowed: undefined,
   		 	userdata: undefined,
   		 	outstandingA: undefined
   		 },

		initialize: function(options){ // Default options for the product
		},

		isAuthorized: function(){
			return Boolean(this.get("username"));
		},

		getUserData:function(){
			if(typeof this.userdata == "undefined"){
				this.userdata = userUtils.getUserData()
				return this.userdata
			}else{
				return this.userdata
			}
		},

		outstanding: function(username){
			if(typeof this.outstandingA == "undefined" || this.outstandingA.amount == 0){ // Bad hack
				this.outstandingA = userUtils.outstanding()
				return this.outstandingA
			}else{
				return this.outstandingA
			}		
		},

		isAllowed: function(){
			var user = this.getUserData()
			// Modified to allow only the pincodes			
			if(app.pinsAllowed.indexOf(user.personInfo.address4.toString())>=0){
				return true
			}else{
				return false
			}
		}

	})

	return {
		sessionModel: sessionModel
	}
})