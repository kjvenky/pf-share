define([
    'marionette',
    'backbone',
    'jquery',
    'underscore',
    'raphael',
    'text!scripts/tpl/canvas.tpl',
    'scripts/models/canvasModel',
    'scripts/views/canvasComponentView',
    'scripts/views/connectorView'],function(Marionette,Backbone,$,_,R,Template,canvasModel,canvasComponentView,connectorView){
        "use strict";

    var canvasView = Marionette.CompositeView.extend({
      template: _.template(Template),
      childView: canvasComponentView.canvasComponentView,
      initialize:function(options){
        canvasView.__super__.initialize.call(this);
        window.mainCanvas = new canvasModel.canvasModel({
            title: "Canvas",
            startX: window.innerWidth*0.15,
            startY: 30, 
            width: window.innerWidth*0.85,
            height: window.innerHeight-30,
            color:'#ddd'
        });
        this.paper = window.mainCanvas.canvas;
        window.canvas = this.el = this.paper.canvas;
    },
    buildChildView: function(child, ChildViewClass, childViewOptions) { // Overwriting the default behaviour
        var options = _.extend({model: child}, {
            paper: this.paper
        }, childViewOptions);
        return new ChildViewClass(options);
    },
    render:function(){ // Just call the default bahaviour
        canvasView.__super__.render.call(this);
    },
})

    return{
      canvasView: canvasView
  }
});