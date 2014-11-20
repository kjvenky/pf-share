/*jslint browser: true*/
/*jslint nomen: true*/
/*global require, define, contextUrl*/
define(['jquery', 'backbone', 'underscore', 'scripts/models/card'], function($, Backbone, _, Model) {
    "use strict";
    var cardsCollection = Backbone.Collection.extend({
        model: Model,
        url: contextUrl + '/trip/search',
        parse: function(data) {
            // Set up time and distance as collection parameters
            this.time = data.estimatedTime;
            this.distance = data.estimatedDistance;
            // note that the original result contains ride models internally 
            return data.rides;
        },
        comparator: function(model) {
            return model.get('price');
        }
    });
    return cardsCollection;
}); 