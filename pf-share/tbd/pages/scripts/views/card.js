/*jslint browser: true*/
/*jslint nomen: true*/
/*global require, define, contextUrl*/
define(['jquery', 'backbone', 'underscore', 'text!scripts/tpl/card.tpl'], function($, Backbone, _, Template) {
    "use strict";
    var cards = Backbone.View.extend({

        // initialize the apps instances   
        initialize: function() {
            /* Do nothing */
        },
        className: 'row trip',
        template: _.template(Template),
        events: {
        },
        render: function() {
            this.delegateEvents();
            this.$el.html(this.template({ ride: this.model.toJSON()}));
            return this;
        }

    });
    return cards;
});