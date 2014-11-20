/*jslint browser: true*/
/*jslint nomen: true*/
/*global require, define, contextUrl*/
define(['jquery', 'google', 'backbone', 'underscore', 'scripts/views/card', 'text!scripts/tpl/cards.tpl'], function($, google, Backbone, _, Card, Template) {
    "use strict";
    var cards = Backbone.View.extend({

        // initialize the apps instances   
        initialize: function() {
            this.listenTo(this.collection, 'add', this.render);
        },

        template: _.template(Template),

        events: {
            "click #sort": 'sort',
            "click #showMap": 'map'
        },

        makeMap: function() {
            var mapOptions = {
                zoom: 13
            };
            this.targetDiv = this.$el.find('#map');
            this.targetButton = this.$el.find('#showMap');
            this.routeMap = new google.maps.Map(this.targetDiv.get(0), mapOptions);
        },

        map: function() {
            if (_.isUndefined(this.routeMap)) { // Check if map object already exists
                this.makeMap();
            }
            this.targetDiv.toggle();
            this.drawMarkers(); // Draw new markers everytime
        },

        sort: function() {
            this.$el.find('#sort').toggleClass('arrow-rotate');
            this.$el.find('.trip').remove();
            this.collection.models.reverse();
            this.collection.each(this.addCards, this);
        },

        drawMarkers: function() {
            // Draw the markers and give an array of markers
            // and also fit to new zoom level
            var that = this,
                geocoder = new google.maps.Geocoder(),
                bounds = new google.maps.LatLngBounds(),
                markers = [$('.input-from').val(), $('.input-to').val()];
            _.each(markers, function(marker) {
                geocoder.geocode({'address': marker}, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        that.routeMap.setCenter(results[0].geometry.location);
                        var marker = new google.maps.Marker({
                            map: that.routeMap,
                            position: results[0].geometry.location
                        });
                        bounds.extend(results[0].geometry.location);
                    } else {
                      console.log('Geocode was not successful for the following reason: ' + status);
                    }
                });
            });
            this.routeMap.setCenter(bounds.getCenter());
            this.routeMap.fitBounds(bounds);
            google.maps.event.trigger(this.routeMap, "resize");  // Map resize
        },

        addCards: function(model) { // Help handling childviews
            var cardView = new Card({model: model});
            this.$el.find('.cards').append(cardView.render().el);
            // Track childviews
            this.cards.push(cardView);
        },

        render: function() {
            this.delegateEvents();
            // Determine day or night
            var day = (function(){
                var date = new Date();
                if (date.getHours() > 22 || date.getHours() < 6) {
                    return false;
                }else{
                    return true;
                }    
            })();
            this.$el.html(this.template({
                data: {distance: this.collection.distance, time: this.collection.time, day: day}
            }));
            this.cards = [];
            this.collection.each(this.addCards, this);
            return this;
        }

    });
    return cards;
});