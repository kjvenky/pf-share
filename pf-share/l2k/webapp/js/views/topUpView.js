define(['jquery', 'backbone', 'underscore', 'text!js/tpl/topup.tpl', 'js/utils/userUtils', 'js/utils/jsonUtils',
    'bootstrap'
], function($, Backbone, _, Template, userUtils, Utils) {
    "use strict"
    // Add regex and validation to this
    var topUpView = Backbone.View.extend({
        template: _.template(Template),
        initialize: function() {},
        events: {
            'click #closemessage': "closemessages",
            'click #submitTopup': 'topUp',
            'focusout #topupValue': 'validate'
        },
        topUp: function(e) {
            e.preventDefault()
            if (this.validate()) {
                userUtils.webMaskShow()
                $.ajax({
                    type: 'GET',
                    async: false,
                    url: contextUrl + '/user/topUp?username=' + app.session.attributes.username +
                        '&topUpAmount=' + parseInt($('#topupValue').val()),
                    success: function(data) {
                        userUtils.webMaskHide()
                        $('#messages').append('<div>' + data + '</div>')
                        submitPayuForm() // Auto trigger the payU form
                    }
                })
            }
            else {}
        },
        validate: function() {
            // Regex check
            var value = $('#topupValue').val();
            $("#topupValue").siblings().remove();
            if (value.trim() !== "") {
                var reg = /^[0-9]*$/;                
                if (!reg.test(value)){
                    $('<span class="error" style="font-size:11px;padding:5px 0px;;color:red">Enter a valid amount!</span>').insertAfter($('#topupValue')).slideDown('slow');
                    return false
                }
                else if(parseInt(value)<20){
                        $('<span class="error" style="font-size:11px;padding:5px 0px;;color:red">Enter value greater than &#8377; 20.</span>').insertAfter($('#topupValue')).slideDown('slow');
                        return false
                    }
                else{
                    return true
                }
            }else{
            	  $('<span class="error" style="font-size:11px;padding:5px 0px;;color:red">Please enter value!</span>').insertAfter($('#topupValue')).slideDown('slow');
                    return false
            }
        },
        closemessages: function() {
            $('#messages').slideUp(function() {
                $(this).html();
            })
        },
        render: function() {
            this.$el.html(this.template({
                type: 'onlyTopup'
            }));
            return this;
        }
    });
    return {
        topUpView: topUpView
    }
})