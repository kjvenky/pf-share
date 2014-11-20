define(['jquery',
	'backbone',
	'underscore'],function($,Backbone,_){

		"use strict";
		var topMessages = function (message,className, timer){
			$('#topMessages').html('<div>'+message+'</div>').addClass(className).hide().slideDown(300)

			setTimeout(function(){
				$('#topMessages').slideUp('slow').html('').attr('class','topMessages')
			},timer)
		}

		var webMaskShow = function (){$('#webMask').show()}
		var webMaskHide = function (){$('#webMask').hide()}
	
		var outstanding = function(username){
			var amount = 0;
			var value;
			$.ajax({
				async:false,
				url: contextUrl+'/user/wallet?username='+app.session.attributes.username,
				type: 'GET',
				success:function(amountOutstanding){
					value = amountOutstanding
				}
			})

			// var outs = []
			// _.each(_.keys(value),function(val){
			// 	var t = {};
			// 	t.transactionKey = val
			// 	t.outstandingValue = value[val]
			// 	outs.push(t)
			// })

			// if(outs.length){
			// 	_.each(outs,function(data){						
			// 		amount = amount + parseInt(data.outstandingValue);
			// 		app.cart.txnIds.push(data.transactionKey);
			// 	})
			// }

			return {
				amount:value,
				txnIds: app.cart.txnIds
			}
		};

		var getUserData = function(){ // get seesion user data
				var user;
				$.ajax({
					url: contextUrl+'/user/getUserDetails?username='+app.session.attributes.username,
					type:'GET',
					async:false,
					success:function(userdata){
						user = userdata		
					}
				})
				return user
			};


	return {
		outstanding : outstanding,
		getUserData : getUserData,
		topMessages: topMessages,
		webMaskHide: webMaskHide,
		webMaskShow: webMaskShow
	}
})