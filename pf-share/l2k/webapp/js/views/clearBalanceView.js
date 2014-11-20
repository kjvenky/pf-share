define(['jquery', 'backbone', 'underscore', 'text!js/tpl/clearBalance.tpl', 'js/utils/userUtils', 'js/utils/jsonUtils',
    'bootstrap'
], function($, Backbone, _, Template, userUtils, Utils) {
    "use strict"
    // Add regex and validation to this
    var clearBalanceView = Backbone.View.extend({
        template: _.template(Template),
        initialize: function() {},
        events: {
            'click #closemessage': "closemessages",
            'click #submitClearBalance': 'clearBalance'
        },
        clearBalance: function(e) {
            var that = this;
            e.preventDefault()

            userUtils.webMaskShow()
            $.ajax({
                type: 'GET',
                async: false,
                url: contextUrl + '/user/topUp?username=' + app.session.attributes.username +
                    '&topUpAmount=' + -1*that.value.amount.availableBalance,
                success: function(data) {
                    userUtils.webMaskHide()
                    $('#messages').append('<div>' + data + '</div>')
                    submitPayuForm() // Auto trigger the payU form
                }
            })

        },
        closemessages: function() {
            $('#messages').slideUp(function() {
                $(this).html();
            })
        },
        render: function() {
            var that = this;
            that.value = app.session.outstanding(app.session.attributes.username)
            if(that.value.amount.availableBalance<0){
            this.$el.html(this.template({
                balanceAmount: that.value.amount.availableBalance
            }));
            return this;
            }
            
        }
    });
    return {
        clearBalanceView: clearBalanceView
    }
})