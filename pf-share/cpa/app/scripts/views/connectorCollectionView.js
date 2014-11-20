define([
    'marionette',
    'backbone',
    'jquery',
    'underscore',
    'raphael',
    'scripts/views/baseComponentView',
    'scripts/views/connectionPointView',
    'scripts/models/connectorComponent',
    'scripts/views/connectorView',
    'text!scripts/tpl/palleteComponent.tpl'], function(Marionette, Backbone, $, _, Raphael, BaseView, connectionPointView, ConnectorComponent,
    connectorView, Template) {
    "use strict";
    var connectorCollectionView = Marionette.CollectionView.extend({
        template: _.template(Template),
        childView: connectorView.connectorView,
        initialize: function(options) {
            this.paper = options.paper || undefined
        },
        buildChildView: function(child, ChildViewClass, childViewOptions) { // Overwriting the default behaviour
            var options = _.extend({
                model: child
            }, {
                paper: this.paper
            }, childViewOptions);
            return new ChildViewClass(options);
        },
        render: function() { // Just call the default bahaviour
            connectorCollectionView.__super__.render.call(this);
        },
    })
    return {
        connectorCollectionView: connectorCollectionView
    }
});