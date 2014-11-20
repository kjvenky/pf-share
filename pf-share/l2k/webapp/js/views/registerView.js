define(
    ['jquery', 'backbone', 'underscore', 'js/utils/userUtils','text!js/tpl/register.tpl', 'text!js/tpl/regSuccess.tpl'], function($,
        Backbone, _, userUtils, Template, bootstrap, stemplate) {
        "use strict"
        var registerView = Backbone.View.extend({
            template: _.template(Template),
            initialize: function() {
                _.bindAll(this, 'render', 'sendRegister', 'checkusername', 'checkemail', 'checkphone',
                    'validate', 'checkcode', 'checkpin');
                this.render(); // Renders the requried view
                this.delegateEvents();
            },
            // el element is important in binding the views
            events: { // http://stackoverflow.com/questions/12433485/backbone-events-not-binding-to-dom-element
                'click button#submitRegister': 'sendRegister',
                'focusout #username': 'checkusername',
                'focusout #emailID': 'checkemail',
                'focusout #primaryMobile': 'checkphone',
                'focusout #address4': 'checkpin',
                // 'focusout #mediACode' : 'checkcode',
                "click a#closemessage": "closemessages",
            },
            checkpin: function() {
                var value = $("#address4").val();
                if (value.trim() !== "") {
                    var reg = /^6[0-9]{5}$/;
                    $("#address4").siblings().remove();
                    if (!reg.test(value)) {
                        $(
                            '<span class="error" style="font-size:11px;padding:5px 0px;;color:red">Not a valid Chennai pincode!</span>'
                        ).insertAfter($('#address4')).slideDown('slow');
                    }
                }
            },
            checkcode: function() {
                // generic
                var value = $("#mediACode").val();
                if (value.trim() !== "") {
                    // Remove all the urls with
                    $("#mediACode").siblings().remove();
                    $("#mediACode").parent().removeClass('has-success has-feedback has-error');
                    // Ajax call to server
                    $.ajax({
                        type: 'GET',
                        url: contextUrl + '/user/register/checkCouponCode?couponCode=' + value,
                        // data : value,
                        success: function(data) {
                            if (data) {
                                $("#mediACode").parent().addClass(
                                    'has-success has-feedback')
                                $(
                                    '<span class="glyphicon glyphicon-ok form-control-feedback"></span>'
                                ).insertAfter($("#mediACode"));
                            }
                            else {
                                // render the register view
                                // based on the errors. How?
                                $("#mediACode").attr("placeholder", "Media code not valid")
                                $("#mediACode").parent().addClass('has-error has-feedback')
                                $(
                                    '<span class="glyphicon glyphicon-remove form-control-feedback"></span>'
                                ).insertAfter($("#mediACode"));
                            }
                        }
                    })
                }
            },
            checkusername: function() { // Make form check
                // generic
                var value = $("#username").val();
                if (value.trim() !== "") {
                    // Remove all the urls with
                    $("#username").siblings().remove();
                    $("#username").parent().removeClass('has-success has-feedback has-error');
                    // Ajax call to server
                    $.ajax({
                        type: 'GET',
                        url: contextUrl + '/user/register/checkUsername?username=' + value,
                        // data : value,
                        success: function(data) {
                            if (!data) {
                                $("#username").parent().addClass('has-success has-feedback')
                                $(
                                    '<span class="glyphicon glyphicon-ok form-control-feedback"></span>'
                                ).insertAfter($('#username'));
                            }
                            else {
                                $("#username").parent().addClass('has-error has-feedback')
                                $(
                                    '<span class="glyphicon glyphicon-remove form-control-feedback"></span>'
                                ).insertAfter($('#username'));
                                $(
                                    '<span class="error" style="font-size:11px;padding:5px 0px;;color:red">Username already registered!</span>'
                                ).insertAfter($('#username')).slideDown('slow');
                            }
                        }
                    })
                }
            },
            checkemail: function() {
                var value = $("#emailID").val();
                // Remove all the urls with
                $("#emailID").siblings().remove();
                $("#emailID").parent().removeClass('has-success has-feedback has-error');
                if (value.trim() !== "") {
                    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                    if (reg.test(value)) {
                        $("#emailID").siblings().remove();
                        $("#emailID").parent().removeClass('has-success has-feedback has-error');
                        // Ajax call to server
                        $.ajax({
                            type: 'GET',
                            url: contextUrl + '/user/register/checkEmail?emailID=' + value,
                            // data : $("#emailID").val(),
                            success: function(data) {
                                if (!data) {
                                    $("#emailID").parent().addClass(
                                        'has-success has-feedback')
                                    $(
                                        '<span class="glyphicon glyphicon-ok form-control-feedback"></span>'
                                    ).insertAfter($('#emailID'));
                                }
                                else {
                                    // render the register
                                    // view
                                    // based on the errors.
                                    // How?
                                    $("#emailID").parent().addClass(
                                        'has-error has-feedback')
                                    $(
                                        '<span class="glyphicon glyphicon-remove form-control-feedback"></span>'
                                    ).insertAfter($('#emailID'));
                                    $(
                                        '<span class="error" style="font-size:11px;padding:5px 0px;;color:red">Email already registered!</span>'
                                    ).insertAfter($('#emailID')).slideDown('slow');
                                }
                            },
                            errors: function(errors) {}
                        })
                    }
                    else {
                        $("#emailID").val('')
                        $("#emailID").attr('placeholder', 'Not valid email format').parent().addClass(
                            'has-error')
                    }
                }
            },
            checkphone: function() {
                var value = $("#primaryMobile").val();
                if (value.trim() !== "") {
                    var reg = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
                    $("#emailID").siblings().remove();
                    if (reg.test(value)) {
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
                                if (!data) {
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
                                    $(
                                        '<span class="error" style="font-size:11px;padding:5px 0px;;color:red">Phone number already registered!</span>'
                                    ).insertAfter($('#primaryMobile')).slideDown('slow');
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
                        if (i !== "lastName" && i !== "secondaryPhone" && i !== "landLine" && i !==
                            "mediaCode") {
                            that.errors[i] = "Required field";
                        }
                    }
                    // Test for errors
                    if (i == 'emailID' && attr) { // Email
                        // validation
                        var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                        if (!reg.test(attr)) that.errors[i] = "Email is not valid format";
                    }
                    if (i == 'primaryMobile' && attr) { // Phone
                        // number
                        // validation
                        var reg = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
                        if (!reg.test(attr)) that.errors[i] = "Cell number is not valid format";
                    }
                    if (i == 'address4' && attr) { // Pin code
                        // validation
                        var reg = /^6[0-9]{5}$/;
                        if (!reg.test(attr)) that.errors[i] = "Not a valid Chennai Pincode";
                    }
                    if (i == 'couponCode' && attr) { // zone name
                        if (attr === "default") {
                            // 	validation
                            that.errors[i] = "Please choose a media code";
                        }
                    }
                    if (i == 'zoneNameMain' && attr) { // zone name
                        if (attr === "default") {
                            // 	validation
                            that.errors[i] = "Zone cannot be empty";
                        }
                    }
                });
                if (!_.isEmpty(that.errors)) {
                    return false;
                }
                else {
                    return true;
                }
            },
            sendRegister: function(e) {
                e.preventDefault();
                var that = this;
                // Get the json. Can be made into a static function
                var inputs = $('#registerForm').serializeArray();
                that.data = {};
                _.each(inputs, function(val) {
                    that.data[val.name] = val.value;
                });
                // Auto setting the zone
                that.data["zoneName"] = "Others";
                // Remove all the urls with
                $('.form-control-feedback').remove();
                $('.has-feedback').removeClass('has-success has-feedback has-error');
                // / Implement local validation here
                if (this.validate(this.data)) {
                    $('#submitRegister').html("Sending data ...")
                    userUtils.webMaskShow()

                        // Ajax call to server
                    $.ajax({
                        type: 'POST',
                        url: contextUrl + '/user/register/',
                        data: that.data,
                        success: function(data) {
                            userUtils.topMessages('You are registered Successfully!','topSuccess',5000)
                            // $('#messages').html(
                            //     "<div class='alert alert-success' id='tempMessage' style='font-size:12px;margin:20px 0px 0px'>You are registered successfully. You can login now.</div>"
                            // )
                            // $('#messages').append(stemplate).slideDown("slow")
                            userUtils.webMaskHide()
                            window.setTimeout(function() {
                                $('#messages').slideUp(500, function() {
                                    $('#messages').html()
                                });
                            }, 200)
                        },
                        error: function(data) {
                            $('#servermessages').html(
                                "<div class='alert alert-danger' style=''font-size:12px;margin:20px 0px 0px'>" +
                                data.responseJSON.message + ".Please try again</div>").slideDown(
                                "slow")
                        }
                    })
                }
                else {
                    // Appends errors to the related fields
                    console.log(this.errors);
                    $.each(this.errors, function(id, value) {
                        $("#" + id).attr('placeholder', that.data[id] + " " + value).parent().addClass(
                            'has-error')
                        if (id == "zoneName" || id == "zoneNameMain" || id=="couponCode") {}
                        else {
                            $("#" + id).val('')
                        }
                    });
                }
            },
            render: function() {
                return this.$el.html(this.template())
            }
        })
        return {
            registerView: registerView
        }
    })