/*jslint browser: true*/
/*jslint nomen: true*/
/*global $, jQuery, _, define*/
define(['jquery',
    'backbone',
    'underscore',
    'text!scripts/tpl/index.tpl',
    'scripts/models/cards',
    'scripts/views/cards',
    'google',
    'bootstrap'
    ], function($, Backbone, _, Template, CardsCollection, Cards, google) {
    "use strict";
    var index = Backbone.View.extend({

        template: _.template(Template),

        className: 'topbar',

        events: {
            // "focus .input-to": "animate",
            // "focus .input-from": "animate",
            // "focusout .input-to": "checkData",
            "click #searchSubmit": function() {
                this.checkData();
            }
        },

        // initialize the apps instances    
        initialize: function() {
            _.bindAll(this, 'checkData', 'animate');
        },

        searchInitialize: function() {
            this.from = new google.maps.places.Autocomplete(this.$el.find('#from_search')[0]);
            this.to = new google.maps.places.Autocomplete(this.$el.find('#to_search')[0]);
        },

        contentAdd: function(from_val, to_val) {
            $('#content-cards').html('<div style="text-align:center;">' +
                '<h3 style="margin-top:30px;"> Crunching database ... </h3>' +
                '<img src="'+ contextUrl +'/pages/imgs/loading.gif" style="margin-top:20px;width:100px;"></div>'
                );
            // make a fetch
            var cardsData = new CardsCollection(),
                message;
            cardsData.fetch({
                data: $.param({ source: from_val, destination: to_val}),
                error: function (model, response) {
                    if (!_.isUndefined(response.responseText)) {
                        message =  JSON.parse(response.responseText).message;
                    } else {
                        message = "You found the chamber of secrets!";
                    }
                    $('#content-cards').html('<div class="container" style="text-align: center;font-size: 34px;padding-top:40px;">' + message + '</div>');
                }
            });
            var car = new Cards({el: '#content-cards', collection : cardsData});
        },

        checkData: function(from,to) {
            console.log(from)
            console.log(from.toString().replace('/_/g','\s'))
            console.log(to.toString().replace('/_/g','\s'))
            var from_val = from || this.$el.find('.input-from').val(),
                to_val = to || this.$el.find('.input-to').val();
            // Set the from and to values
            this.$el.find('.input-from').val(from_val);
            this.$el.find('.input-to').val(to_val);

            if (from_val.length === 0) {
                $('[data-toggle="tooltip-from"]').tooltip('show');
                if (to_val.length === 0){
                    $('.content').removeClass('topcontent-small-screen');
                    $('.topcontent').removeClass('topcontent-small');
                    $('#content-cards').slideUp('slow');
                    $('[data-toggle="tooltip-to"]').tooltip('show');
                    window.App.Routers.Main.navigate('/');
                }else{
                    $('[data-toggle="tooltip-to]').tooltip('hide');
                }
            } else if (from_val.length !== 0) {
                $('[data-toggle="tooltip-from"]').tooltip('hide');
                if (to_val.length !== 0) {
                    $('[data-toggle="tooltip-to"]').tooltip('hide');
                    $('.content').addClass('topcontent-small-screen');
                    $('#content-cards').slideDown('slow');
                    this.animate();
                    window.App.Routers.Main.navigate('/search/'+from_val.replace(/,\s/g,'-').replace(/\s/g,'_')+'/'+to_val.replace(/,\s/g,'-').replace(/\s/g,'_'));            
                    this.contentAdd(from_val, to_val);
                } else {
                    $('[data-toggle="tooltip-to"]').tooltip('show');
                }            
            }
        },

        animate: function() {
            this.$el.find('.topcontent').addClass('topcontent-small');
            $('#content-cards').addClass('content-cards-small');
        },

        render: function() {
            this.delegateEvents();
            this.$el.html(this.template());
            google.maps.event.addDomListener(this.$el, this.render, this.searchInitialize());
            return this;
        }

    });
    return index;
});