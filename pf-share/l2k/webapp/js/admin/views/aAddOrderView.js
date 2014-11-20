define(['jquery', 'backbone', 'underscore', 'text!js/admin/tpl/aAddOrder.tpl', 'js/admin/models/aAddOrderModel', 'js/admin/utils/messageutils',
	], function($, Backbone, _, Template, aAddOrderModel, messageUtils) {
		"use strict"
		var aAddOrderView = Backbone.View.extend({
			template: _.template(Template),
            initialize: function() {
            // Get list of vegetables for today to display
            this.model = new aAddOrderModel.aAddOrderModel()
            this.getProducts();            
            _.bindAll(this,'update')    
        },

        events: {
        	"focusout #phoneNumber": "checkphone",
        	"click #submitOrder": "submitOrder"
        },

        submitOrder:function(e){
        	var that = this;
        	e.preventDefault()
        	// Check for the outStanding amount
        	if($('#outAmount').val() < 0){
        		$('#form-messages').css('display','block').html('<div class="alert alert-danger" style="margin: 10px 15px 0px;font-size: 12px;font-weight:bold;">Users has payment dues. Cannot process the order.</div>').delay(5000).fadeOut('slow');										
        	}else{
        		// Parse the order
        		var inputs = $('#aAddOrderForm').serializeArray()
        		var data = {}
        		_.each(inputs,function(val){
        			data[val.name] = val.value
        		})
        		var cart = [];
        		_.each(_.keys(data),function(dat){
        			if(data[dat]>0 && dat !== "username" && dat !== "phoneNumber" && dat !== "outAmount"){
        				var item = _.find(that.model.attributes.products,function(product){return product.productName === dat})
        				item.qty = data[dat]
                        cart.push(item)
                    }
                })
        		// Place the order
        		if (this.getTotalWeight(cart) <= 10) {
        			if (this.getTotalCost(cart) >= 20) {
	                        var cartdata = this.cartConvert(cart) // Trigger the send here
                          if($('#outAmount').val()==0){
	                         cartdata.payLater = true;
                         }else  {
                            cartdata.payFromBalance = true;
                         }

                            $('#submitOrder').attr('disabled', 'disabled').html('Processing ...') 
                            messageUtils.webMaskShow()
                            $.ajax({
                              type: 'POST',
                              data: JSON.stringify(cartdata),
                              dataType: 'html',
                              cache: false,
                              url: contextUrl + '/product/checkout',
                              success: function (data) {
                                messageUtils.webMaskHide()
                                $('#form-messages').append('<div>' + data + '</div>').slideDown()
                                Backbone.history.navigate('/')
                            },
                            errors: function (message) {
                                messageUtils.webMaskHide()
                                messageUtils.topMessages('Cartoning table is empty!','topFailure',3000)                                    
                                Backbone.history.navigate('/')
                                $('#form-messages').append('<div>' + message + '</div>').slideDown()
                            }
                        })
}
else {
  $('#form-messages').html(
     '<div class="alert alert-info">Minimum order value is Rs 20.</div>').slideDown()
}
}
else {
  $('#form-messages').html('<div class="alert alert-info">Maximum weight allowed is 10kg per order.</div>').slideDown()
}
}
},

getTotalCost:function(data){
   var TotalCost = 0;
   _.each(data,function(item){           
      TotalCost += parseInt(item.qty)*item.sellingPrice
  })
   return TotalCost
},

        getTotalWeight: function(data){ 
            var totalWeight = 0
            _.each(data.models,function(model){
                if(model.get('baseUnit') !== "No."){
                    totalWeight += model.attributes.qty // 
                    }
            })
            return totalWeight
        },

cartConvert: function (cart) {
    var that = this;
    var c = {};
    c.username = that.model.attributes.userdata.username;
    c.cartDetailBeanList = [];
    c.resolvingTransactionIDs = [];
    _.each(cart, function (model, iterator) {
        var value = parseFloat(model.qty) / model.baseUnit.unitValue;
        var p = {};
        p.productName = model.productName;
        p.baseQuadrupleQty = Math.floor(value / 4);
        p.baseDoubleQty = Math.floor((value % 4) / 2);
        p.baseQty = Math.floor(((value % 4)) % 2);
        c.cartDetailBeanList.push(p);
    });
    return c;
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

        getProducts:function(){
        	var that = this
        	$.ajax({
        		url: contextUrl + '/product/list',
        		async:false,
        		success:function(data){
        			that.model.attributes.products = data
        		}
        	})
        },

        render: function() {
        	this.$el.append(this.template({
        		products: this.model.attributes.products,
        		user: this.model.attributes.userdata,
        		outStandingAmount: this.model.attributes.outStandingAmount,
        	}))
        	return this
        }
    })
return {
	aAddOrderView: aAddOrderView
}
})