define(['jquery',
	'backbone',
	'underscore',
	'text!js/tpl/settings.tpl',
	'js/utils/userUtils',
	'js/utils/jsonUtils',
	'bootstrap'
	],function($,Backbone,_,Template,userUtils,Utils){

		"use strict"
		// Add regex and validation to this
		var settingsView = Backbone.View.extend({
			template: _.template(Template),
			initialize:function(options){
				_.bindAll(this, 'render', 'closemessages', 'passwordChange','updateDetails');
				this.data = userUtils.getUserData()
			},

			events:{
				"click a#closemessage" : "closemessages",
				"click button#passwordchange": "passwordChange",
				"click button#detailsupdate": "updateDetails"
			},

			updateDetails:function(e){
				e.preventDefault();
				var data = $("#updateForm").serializeArray();
				var formData = _.object(_.pluck(data, 'name'), _.pluck(data, 'value'));
				var that = this
				$.ajax({
					url: contextUrl+'/user/updateUserDetails',
					type:'POST',
					data: formData,
					async:false,
					success:function(data){
						if(data){
							$('#changemessages').css('display','block').html('<div class="alert alert-success" style="margin: 10px 65px 0px;font-size: 12px;">Your details are updated successfully!</div>').delay(5000).fadeOut('slow');
						}else{
							$('#changemessages').css('display','block').html('<div class="alert alert-danger" style="margin: 10px 65px 0px;font-size: 12px;">Your update failed. Please try again!</div>').delay(5000).fadeOut('slow');
						}
					}
				})
			},

			passwordChange:function(e){
				e.preventDefault();
				// Write the ajax call here
				if($('#newPass').val()){
				$.ajax({
					url:contextUrl+'/user/changePassword?username='+app.session.attributes.username+'&newPassword='+$('#newPass').val()+'&oldPassword='+$('#currentPass').val(),
					type:'GET',
					success:function(data){
						if(data){
							$('#changemessages').css('display','block').html('<div class="alert alert-success" style="margin: 10px 65px 0px;font-size: 12px;">Your password changed successfully!</div>').delay(5000).fadeOut('slow');
						}else{
							$('#changemessages').css('display','block').html('<div class="alert alert-danger" style="margin: 10px 65px 0px;font-size: 12px;">Your password change failed. Please try again!</div>').delay(5000).fadeOut('slow');
						}
					}
				});
				}
			},

			previousOrders:function(){
				var orders;
				$.ajax({
					url:contextUrl+'/user/getPastOrders?username='+app.session.attributes.username,
					type:'GET',
					async: false,
					success:function(data){
						orders = data
					}
				});
				// Process orders to get data of only particular keys
				orders = Utils.getDataofKeys(orders,["transactionID","amount","status","paymentDone"])
				return orders
			},

			closemessages : function() {
				$('#messages').slideUp(function() {
					$(this).html();
				})
			},

			render: function() {
				this.$el.html(this.template({
					data: this.data,
					previousorders: this.previousOrders()
				}));
				return this;
			}
		});
		
		return {
			settingsView: settingsView
		}
	})