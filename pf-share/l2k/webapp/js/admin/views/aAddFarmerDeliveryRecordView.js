define(['jquery', 'backbone', 'underscore', 'text!js/admin/tpl/addFarmerDeliveryRecord.tpl', 'js/admin/models/ainventoryRefillRecordModel'], function($, Backbone, _, Template, ainventoryRefillRecordModel) {
    "use strict"
    var aAddFarmerDeliveryRecordView = Backbone.View.extend({
        template: _.template(Template),
        model: new ainventoryRefillRecordModel.ainventoryRefillRecordModel(),
        initialize: function() {
            this.getProducts();
            _.bindAll(this, 'update', 'convertData')
        },

        events: {
            "focusout #phoneNumber": "checkphone",
            "click #submitOrder": "submitOrder"
        },
        getUserdetails: function() { // Get user by phonenumber
            var that = this
            $.ajax({
                url: contextUrl + '/user/getUserDetailsByPhone?phoneNumber=' + that.model.attributes.phoneNumber,
                async: false,
                success: function(data) {
                    that.model.attributes.userdata = data
                }
            })

            //Update the outStandingAmount also
            this.getOutStandingAmount()
        },
        update: function() {
            $('#userName').val(this.model.attributes.userdata.username);
            var value = this.outstanding()
            $('#outAmount').val(value.amount.availableBalance);
        },
        getOutStandingAmount: function() {
            var that = this
            $.ajax({
                url: contextUrl + '/user/outstanding?username=' + that.model.attributes.userdata.username,
                async: false,
                success: function(data) {
                    that.model.attributes.outStandingAmount = data
                }
            })
        },
        getProducts: function() {
            var that = this
            $.ajax({
                url: contextUrl + '/product/list',
                async: false,
                success: function(data) {
                    that.model.attributes.products = data
                }
            })
        },

        outstanding: function() {
            var that = this;
            var amount = 0;
            var value;
            $.ajax({
                async: false,
                url: contextUrl + '/user/wallet?username=' + that.model.attributes.userdata.username,
                type: 'GET',
                success: function(amountOutstanding) {
                    value = amountOutstanding
                }
            })

            return {
                amount: value,
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
                        url: contextUrl + '/user/register/checkPhoneNumber?phoneNumber=' + value,
                        // data :
                        // $("#phoneNumber").val(),
                        success: function(data) {
                            if (!data) {
                                $("#phoneNumber").parent().addClass('has-error has-feedback')
                                $('<span class="glyphicon glyphicon-remove form-control-feedback"></span>').insertAfter($('#phoneNumber'));
                                $('<span class="error" style="font-size:11px;padding:5px 0px;;color:red">Phone number doesnot exist!</span>').insertAfter($('#phoneNumber')).slideDown('slow');
                            } else {
                                $("#phoneNumber").parent().addClass('has-success has-feedback')
                                $('<span class="glyphicon glyphicon-ok form-control-feedback"></span>').insertAfter($('#phoneNumber'));
                            }
                            that.getUserdetails(that.model.attributes.phoneNumber)
                            that.update()
                        },
                        errors: function(errors) {}
                    })
                } else {
                    $("#phoneNumber").val('')
                    $("#phoneNumber").attr('placeholder', 'Not valid phone number format').parent()
                        .addClass('has-error')
                }
            }
        },

        submitOrder: function(e) {
            var that = this;
            e.preventDefault()
                // Check for the outStanding amount
                // Parse the order
            var inputs = $('#aAddFarmerDeliveryRecord').serializeArray()
            var data = {}
            _.each(inputs, function(val) {
                    data[val.name] = val.value
                })
            if (this.validate(data)) {
                $('#submitOrder').attr('disabled', 'disabled').html('Processing ...')
                $.ajax({
                    type: 'POST',
                    datatype: "JSON",
                    data: "farmerMobileNumber=" + that.model.attributes.phoneNumber + "&beanList=" + that.convertData(data),
                    url: contextUrl2 + '/admin/inventory/addFarmerDelivery',
                    success: function(data) {
                        $('#form-messages').css('display','block').html('<div class="alert alert-success" style="margin: 10px 65px 0px;font-size: 12px;">Delivery record added successfully!</div>').delay(5000).fadeOut('slow');
                        setTimeout(function(){admin.navigate('inventory/farmerdeliveryRecords',true)},2000)
                    },
                    errors: function(message) {
                        $('#form-messages').css('display','block').html('<div class="alert alert-danger" style="margin: 10px 65px 0px;font-size: 12px;">Adding delivery record failed. Please try again!</div>').delay(5000).fadeOut('slow');
                    }
                })
            } else {

            }

        },
        validate: function(data) { // Blunt and bad way
            var hasErrors = $("#aAddFarmerDeliveryRecord").find('.has-error')
           if(hasErrors.length==0 && data.productName!=="" && data.buyingPrice!=="" && data.quantityAccepted!=="" && data.quantityDelivered!=="" && !_.isUndefined(this.model.attributes.phoneNumber)){ // If no errors exist
                return true
            }else{
               $('#form-messages').css('display','block').html('<div class="alert alert-danger" style="margin: 10px 65px 0px;font-size: 12px;">Please correct the errors in the form!</div>').delay(5000).fadeOut('slow');
               return false
            }
           
        },
        convertData: function(data) {
            var that = this;
            var c = {};
            c.beanList = [];
            var p = {};
            p.productName = data.productName;
            p.buyingPrice = data.buyingPrice || 0;
            p.quantityAccepted = data.quantityAccepted  || 0;
            p.quantityDelivered = data.quantityDelivered  || 0;
            c.beanList.push(p);
            // });
            return JSON.stringify(c.beanList[0]);
        },

        render: function() {
            this.$el.append(this.template({
                products: this.model.attributes.products,
                user: this.model.attributes.userdata,
            }))

            return this
        }
    })

    return {
        aAddFarmerDeliveryRecordView: aAddFarmerDeliveryRecordView
    }
})