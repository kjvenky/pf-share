/*jslint browser: true*/
/*jslint nomen: true*/
/*global $, jQuery, _, define*/
define(['jquery', 'backbone', 'underscore', 'text!scripts/tpl/info.tpl'], function($, Backbone, _, Template) {
    "use strict";
    var info = Backbone.View.extend({
        template: _.template(Template),
        className: 'container',
        render: function() {
            this.delegateEvents();
            this.$el.html(this.template());
            return this;
        }
    });
    return info;
});