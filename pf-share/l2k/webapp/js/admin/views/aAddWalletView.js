define(['jquery', 'backbone', 'underscore', 'text!js/admin/tpl/aAddWallet.tpl', 'js/admin/models/aAddOrderModel', 'js/admin/utils/messageutils',
	], function($, Backbone, _, Template, aAddOrderModel, messageUtils) {
		"use strict"
		var aAddWalletView = Backbone.View.extend({
			template: _.template(Template),
			initialize: function() {
            // Get list of vegetables for today to display
            _.bindAll(this,'update')
            this.model = new aAddOrderModel.aAddOrderModel()
        },

        events: {
        	"focusout #phoneNumber": "checkphone",
        	"click #submitForm": "submitOrder"
        },
        submitOrder:function(e){
        	var that = this;
        	e.preventDefault()
        	// Check for the outStanding amount
        		var inputs = this.$el.find('#aAddWalletForm').serializeArray()
        		var data = {} 
        		_.each(inputs,function(val){
        			data[val.name] = val.value
        		})
             $('#submitForm').attr('disabled', 'disabled').html('Processing ...') 
                            messageUtils.webMaskShow()
                            $.ajax({
                              type: 'POST',
                              data: data,
                              dataType: 'html',
                              cache: false,
                              url: contextUrl + '/admin/wallets/topUpCustomer',
                              success: function (data) {
                                messageUtils.webMaskHide()
                                $('#form-messages').css('display','block').html('<div class="alert alert-success" style="margin: 10px 65px 0px;font-size: 12px;">Amount added successfully!</div>').delay(5000).fadeOut('slow');
                                setTimeout(function(){admin.navigate('products',true)},2000)
                            },
                            errors: function (message) {
                                messageUtils.webMaskHide()
                                messageUtils.topMessages('Cartoning table is empty!','topFailure',3000)                                    
                                Backbone.history.navigate('/')
                                $('#form-messages').append('<div>' + message + '</div>').slideDown()
                            }
                        })


},


update:function(){
 $('#userName').val(this.model.attributes.userdata.username);
 var value = this.outstanding()
 $('#outAmount').val(value.amount.availableBalance);
},
outstanding:function(){
 var that = this;
 var amount = 0;
 var value;
 $.ajax({
  async:false,
  url: contextUrl+'/user/wallet?username='+that.model.attributes.userdata.username,
  type: 'GET',
  success:function(amountOutstanding){
   value = amountOutstanding
}
})

 return {
  amount:value,
}
},
checkphone: function() {
 var that = this;
 that.model.attributes.phoneNumber = $("#phoneNumber").val();
 var value = that.model.attributes.phoneNumber;
 if (value.trim() !== "") {
  var reg = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
  if (reg.test(value)) {
                    // Remove all the urls with
                    $("#phoneNumber").siblings().remove();
                    $("#phoneNumber").parent().removeClass('has-success has-error has-feedback');
                    // Ajax call to server
                    $.ajax({
                    	type: 'GET',
                    	url: contextUrl + '/user/register/checkPhoneNumber?phoneNumber=' +value,
                        // data :
                        // $("#phoneNumber").val(),
                        success: function(data) {
                        	if (!data) {
                        		$("#phoneNumber").parent().addClass('has-error has-feedback')
                        		$('<span class="glyphicon glyphicon-remove form-control-feedback"></span>'
                        			).insertAfter($('#phoneNumber'));
                        		$('<span class="error" style="font-size:11px;padding:5px 0px;;color:red">Phone number doesnot exist!</span>'
                        			).insertAfter($('#phoneNumber')).slideDown('slow');
                        	}
                        	else {
                        		$("#phoneNumber").parent().addClass('has-success has-feedback')
                        		$('<span class="glyphicon glyphicon-ok form-control-feedback"></span>'
                        			).insertAfter($('#phoneNumber'));
                        	}
                        	that.getUserdetails(that.model.attributes.phoneNumber)
                        	that.update()
                        },
                        errors: function(errors) {}
                    })
}
else {
	$("#phoneNumber").val('')
	$("#phoneNumber").attr('placeholder', 'Not valid phone number format').parent()
	.addClass('has-error')
}
}
},

        getUserdetails:function(){ // Get user by phonenumber
        	var that = this
        	$.ajax({
        		url: contextUrl + '/user/getUserDetailsByPhone?phoneNumber='+that.model.attributes.phoneNumber,
        		async:false,
             success:function(data){
               that.model.attributes.userdata = data
           }
       })

        	//Update the outStandingAmount also
        	this.getOutStandingAmount()
        },

        getOutStandingAmount:function(){
        	var that = this
        	$.ajax({
        		url: contextUrl + '/user/outstanding?username='+that.model.attributes.userdata.username,
        		async:false,
        		success:function(data){
        			that.model.attributes.outStandingAmount = data
        		}
        	})
        },

        render: function() {
        	this.$el.append(this.template({
        		user: this.model.attributes.userdata,
        		outStandingAmount: this.model.attributes.outStandingAmount,
        	}))
        	return this
        }
    })
return {
	aAddWalletView: aAddWalletView
}
})