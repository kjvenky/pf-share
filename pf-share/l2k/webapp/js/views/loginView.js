define(['jquery', 'backbone', 'underscore', 'text!js/tpl/login.tpl', 'js/views/registerView', 'js/views/forgotView',
    'js/models/sessionModel', 'js/views/userinfoView', 'js/views/outStandingView', 'js/views/zoneFailView',
    'js/utils/userUtils', 'cookie'
], function ($, Backbone, _, Template, registerView, forgotView, sessionModel, userinfoView, outStandingView,
    zoneFailView, userUtils) {
    "use strict"
    var loginView = Backbone.View.extend({
        template: _.template(Template),
        initialize: function () {
            _.bindAll(this, 'render', 'sendLogin', 'forgotpass', 'closemessages', 'checkusername',
                'checkemail', 'validate');
            this.render(); // Renders the requried view
            this.delegateEvents();
        },
        events: { // http://stackoverflow.com/questions/12433485/backbone-events-not-binding-to-dom-element
            'click button#submitLogin': 'sendLogin',
            'click #registerL': 'register',
            'click #forgotpass': 'forgotpass',
            "click a#closemessage": "closemessages",
            'focusout #username': 'checkusername',
        },
        forgotpass: function (e) {
            e.preventDefault();
            $('#messages').html(new forgotView.forgotView().render().el).hide().slideDown("slow") // Hard coded
        },
        register: function (event) {
            event.preventDefault();
            $('#messages').slideUp(500, function () {
                $(this).html();
            });
            $('#messages').html(new registerView.registerView().render()).hide().slideDown("slow") // Hard coded
        },
        closemessages: function () {
            $('#messages').slideUp(function () {
                $(this).html();
            })
        },
        checkusername: function () { // Make form check generic
            var value = $("#username").val();
            if (value.trim() !== "") {
                $("#username").siblings().remove(); // Remove all the urls with
                $("#username").parent().removeClass('has-success has-feedback has-error');
                $.ajax({
                    type: 'GET',
                    url: contextUrl + '/user/register/checkUsername?username=' + value,
                    success: function (data) {
                        if (data) {
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
                                '<span class="error" style="font-size:11px;padding:5px 0px;;color:red">Username doesnot exist!</span>'
                            ).insertAfter($('#username')).slideDown('slow');
                        }
                    }
                })
            }
        },
        validate: function (attributes, options) {
            var that = this;
            that.errors = {};
            $.each(attributes, function (i, attr) {
                if (!attr.trim()) {
                    if (i !== "lastName" && i !== "secondaryPhone" && i !== "landLine" && i !==
                        "mediaCode") {
                        that.errors[i] = "Required field";
                    }
                }
                if (i == 'emailID' && attr) {
                    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                    if (!reg.test(attr)) that.errors[i] = "Email is not valid format";
                }
                if (i == 'primaryMobile' && attr) {
                    var reg = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
                    if (!reg.test(attr)) that.errors[i] = "Cell number is not valid format";
                }
                if (i == 'address4' && attr) {
                    var reg = /^600[0-1][0-9]{2}$/;
                    if (!reg.test(attr)) that.errors[i] = "Not a valid Chennai Pincode";
                }
                if (i == 'zoneNameMain' && attr) {
                    if (attr === "default") {
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
        checkemail: function () {
            var value = $("#emailId").val();
            $("#emailId").siblings().remove(); // Remove all the urls with
            $("#emailId").parent().removeClass('has-success has-feedback has-error');
            if (value.trim() !== "") {
                var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                if (reg.test(value)) {
                    $("#emailId").siblings().remove();
                    $("#emailId").parent().removeClass('has-success has-feedback has-error');
                    $.ajax({
                        type: 'GET',
                        url: contextUrl + '/user/register/checkEmail?emailID=' + value,
                        success: function (data) {
                            if (!data) {
                                $("#emailId").parent().addClass('has-success has-feedback')
                                $('<span class="glyphicon glyphicon-ok form-control-feedback"></span>').insertAfter($('#emailId'));
                            }
                            else {
                                $("#emailId").parent().addClass('has-error has-feedback')
                                $('<span class="glyphicon glyphicon-remove form-control-feedback"></span>').insertAfter($('#emailId'));
                            }
                        },
                        errors: function (errors) {}
                    })
                }
                else {
                    $("#emailId").val('')
                    $("#emailId").attr('placeholder', 'Not valid email format').parent().addClass('has-error')
                }
            }
        },
        sendLogin: function (e) {
            e.preventDefault();
            var that = this;
            var inputs = $('#loginForm').serializeArray(); // Get the json. Can be made into a static function
            that.data = {}
            _.each(inputs, function (val) {
                that.data[val.name] = val.value
            })
            if (this.validate(this.data)) {
                $('#submitLogin').html("Logging you in");
                    // Ajax call to server
                $.ajax({
                    type: 'POST',
                    url: contextUrl + '/user/login',
                    data: this.data,
                    success: function (data) {
                        if (data) { // if true 
                            $('#servermessages').html("<div class='alert alert-success' style='margin:10px 0px 10px;font-size:12px;'>You are logged in successfully!</div>").slideDown();
                            $('#messages').slideUp().html(''); // Close messages
                            app.session.username = that.data.username // Set the Session model for authentication

                            userUtils.topMessages('You are logged in Successfully!','topSuccess',5000)

                            $.cookie('is_logged', 1, {expires: 3}); // set up the cookie for expiry in 3 days
                            $.cookie('username', that.data.username, {expires: 3});
                            // Update the user info
                             var value = app.session.outstanding(that.data.username)
                            $('#userinfo').html(new userinfoView.userinfoView({
                                username: that.data.username
                            }).render().el)
                           
                            // if (!_.isUndefined(value.amount)) {
                            //     $('#pmessages').html(new outStandingView.outStandingView({
                            //         value: value.amount.availableBalance,
                            //         txnId: app.cart.txnIds
                            //     }).render().el).slideDown()
                            // }
                            if (!app.session.isAllowed()) {
                                $('#messages').html(new zoneFailView.zoneFailView().render()
                                    .el).slideDown()
                            }
                        }
                        else { // if false
                            $('#servermessages').html(
                                "<div class='alert alert-danger' style='margin:0px 0px 10px;font-size:12px;'>Username and password didnt match!</div>"
                            ).slideDown();
                            window.setTimeout(function () {
                                $('#servermessages').slideUp(500, function () {
                                    $('#servermessages').html()
                                });
                            }, 5000)
                        }
                    },
                    errors: function (errors) { // render the register view based on the errors. How?
                    }
                })
            }
            else {
                $.each(this.errors, function (id, value) { // Appends errors to the related fields
                    $("#" + id).attr('placeholder', that.data[id] + " " + value).parent().addClass('has-error')
                });
            }
        },
        render: function () {
            return this.$el.html(this.template())
        }
    })
    return {
        loginView: loginView
    }
})