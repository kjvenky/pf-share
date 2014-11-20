define([
    'marionette',
    'backbone',
    'jquery',
    'underscore',
    'raphael',
    'text!scripts/tpl/pallete.tpl',
    'scripts/models/canvasModel',
    'scripts/views/palleteComponentView'],function(Marionette,Backbone,$,_,R,Template,canvasModel,palleteComponentView){
        "use strict";

    // Pallete Svg frame. Not sure if this is a great way of doing things.
    // window.pallete =  Raphael(10, 400, window.innerWidth*0.14, window.innerHeight-50);
    // window.pallete.canvas.style.backgroundColor = '#fff';
    // Complete svg rendering is taking too much time. Not sure why
    // Pallete collection
    var palleteView = Marionette.CompositeView.extend({
      template: _.template(Template),
      childView: palleteComponentView.palleteComponentView,
      initialize:function(options){
        palleteView.__super__.initialize.call(this);
        window.palleteCanvas = new canvasModel.canvasModel({
            title: "Pallete",
            startX: 10,
            startY: 0, 
            width: window.innerWidth*0.85,
            height: window.innerHeight-30,
            color:'#fff'
        });
        this.paper = window.palleteCanvas.canvas;
        // this.palleteSet = this.paper.set();
        window.pallete = this.el = this.paper.canvas;
    },
    buildChildView: function(child, ChildViewClass, childViewOptions) { // Overwriting the default behaviour
        var options = _.extend({model: child}, {
        	paper: this.paper,
        	palleteSet: this.palleteSet
        }, childViewOptions);
        return new ChildViewClass(options);
    },
    render:function(){ // Just call the default bahaviour
        palleteView.__super__.render.call(this);
    },
})

    return{
      palleteView: palleteView
  }
});