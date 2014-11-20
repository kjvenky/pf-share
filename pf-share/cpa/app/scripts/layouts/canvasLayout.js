define([
	'marionette',
	'backbone',
	'jquery',
	'underscore',
	'raphael',
	'text!scripts/tpl/canvas.tpl',
    'scripts/models/canvasModel',
    'scripts/views/canvasComponentView',
    'scripts/views/connectorView'
], function(Marionette, Backbone, $, _, R, Template, canvasModel, canvasComponentView, connectorView) {
    "use strict";
    // Layout
    var canvasLayout = Marionette.LayoutView.extend({
    	initialize: function(options) {
            canvasLayout.__super__.initialize.call(this);
            window.mainCanvas = new canvasModel.canvasModel({
                title: "Canvas",
                startX: window.innerWidth * 0.15,
                startY: 30,
                width: window.innerWidth * 0.85,
                height: window.innerHeight - 30,
                color: '#ddd'
            });
            this.$el = $("body");
            this.paper = window.mainCanvas.canvas;
            window.canvas = this.el = this.paper.canvas;
        },
        regions: {
            canvas: '#canvas'
        },
        render: function() { // Just call the default bahaviour
            canvasLayout.__super__.render.call(this);
            return this
        },
    });
    return {
        canvasLayout: canvasLayout
    }
});