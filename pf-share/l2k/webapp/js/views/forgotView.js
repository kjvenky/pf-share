define(['jquery', 'backbone', 'underscore', 'text!js/tpl/forgotPass.tpl', ], function($, Backbone, _, Template) {
    "use strict"
    var forgotView = Backbone.View.extend({
        template: _.template(Template),
        initialize: function() {
            _.bindAll(this, 'render', 'sendPassword', 'checkphone', 'validate', 'closemessages');
            this.render(); // Renders the requried view
        },
        events: {
            'click #btnForgot': 'sendPassword',
            'focusout #primaryMobile': 'checkphone',
            "click a#closemessage": "closemessages",
        },
        closemessages: function() {
            $('#messages').slideUp(function() {
                $(this).html();
            })
        },
        validate: function(attributes, options) {
            var that = this;
            that.errors = {};
            $.each(attributes, function(i, attr) {
                // Test for required
                if (!attr.trim()) {
                    that.errors[i] = "Required field";
                }
                if (i == 'primaryMobile' && attr) { // Phone
                    // number
                    // validation
                    var reg = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
                    if (!reg.test(attr)) that.errors[i] = "Cell number is not valid format";
                }
            });
            if (!_.isEmpty(that.errors)) {
                return false;
            }
            else {
                return true;
            }
        },
        checkphone: function() {
            var value = $("#primaryMobile").val();
            if (value.trim() !== "") {
                var reg = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
                if (reg.test(value)) {
                    $("#emailID").siblings().remove();
                    $("#emailID").parent().removeClass('has-success has-feedback has-error');
                    // Remove all the urls with
                    $("#primaryMobile").siblings().remove();
                    $("#primaryMobile").parent().removeClass('has-success has-error has-feedback');
                    // Ajax call to server
                    $.ajax({
                        type: 'GET',
                        url: contextUrl + '/user/register/checkPhoneNumber?phoneNumber=' +
                            value,
                        // data :
                        // $("#primaryMobile").val(),
                        success: function(data) {
                            if (data) {
                                $("#primaryMobile").parent().addClass(
                                    'has-success has-feedback')
                                $(
                                    '<span class="glyphicon glyphicon-ok form-control-feedback"></span>'
                                ).insertAfter($('#primaryMobile'));
                            }
                            else {
                                // render the register
                                // view
                                // based on the errors.
                                // How?
                                $("#primaryMobile").parent().addClass(
                                    'has-error has-feedback')
                                $(
                                    '<span class="glyphicon glyphicon-remove form-control-feedback"></span>'
                                ).insertAfter($('#primaryMobile'));
                            }
                        },
                        errors: function(errors) {}
                    })
                }
                else {
                    $("#primaryMobile").val('')
                    $("#primaryMobile").attr('placeholder', 'Not valid phone number format').parent()
                        .addClass('has-error')
                }
            }
        },
        sendPassword: function(e) {
            e.preventDefault();
            var that = this;
            // Get the json. Can be made into a static function
            var inputs = $('#forgotPass').serializeArray();
            that.data = {};
            _.each(inputs, function(val) {
                that.data[val.name] = val.value;
            });
            // Remove all the urls with
            $('.form-control-feedback').remove();
            $('.has-feedback').removeClass('has-success has-feedback has-error');
            if (this.validate(this.data)) {
                $('#btnForgot').html("Sending SMS ...")
                $.ajax({
                    type: 'POST',
                    url: contextUrl + '/user/forgot',
                    data: that.data,
                    success: function() {
                        // $('#servermessages').html(
                        //     "<div class='alert alert-success' id='tempMessage' style='font-size:12px;margin:20px 0px 0px'>SMS sent successfully</div>"
                        // )
                        $('#messages').slideUp(function() {
                               $('#messages').html()
                        });
                    },
                    error: function() {
                        $('#servermessages').html(
                            "<div class='alert alert-danger' style=''font-size:12px;margin:20px 0px 0px'>" +
                            data.responseJSON.message + ".Please try again</div>").slideDown(
                            "slow")
                    }
                })
            }
        },
        render: function() {
            this.$el.html(this.template())
            return this // Always return events so that binded customEvents are also returned well
        }
    })
    return {
        forgotView: forgotView
    }
})