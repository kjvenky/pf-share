/*global define */
define([
    'marionette',
    'backbone',
    'jquery',
    'underscore',
    'raphael',
    'scripts/layouts/canvasLayout',
    'scripts/models/circleComponent',
    'scripts/collections/palleteCollection',    
    'scripts/collections/canvasCollection',
    'scripts/collections/connectorsCollection',
    'scripts/views/headerView',
    'scripts/views/palleteView',
    'scripts/views/canvasView',
    'scripts/views/connectorCollectionView',
    'scripts/views/circleComponentView',
    'scripts/views/footerView',
    'scripts/extensions/rConnector'],function(Marionette,Backbone,$,_,Raphael,Layout,Circle,PalleteCollection,CanvasCollection,ConnectorCollection,Header,Pallete,Canvas,Connector,CircleView,Footer){

    var app = new Marionette.Application();

    // Initialize paper for Raphael. Global Rapheal name space
    // app.circle = new Circle.circleComponent();
    // app.circleView = new CircleView.circleComponentView();

    // List of view collections
    app.views = {}; 

    // List of global collections
    app.palleteCollection = new PalleteCollection.palleteCollection()
    app.canvasCollection = new CanvasCollection.canvasCollection()
    app.connectorCollection = new ConnectorCollection.connectorCollection()
   
    //  Initialize regions
    // app.layout = new Layout.canvasLayout();

    app.addRegions({
        header: '#header',
        pallete: '#pallete',
        canvas: '#canvas',
        footer: '#footer'
    });

    // Initialize views
    app.views.header = new Header.headerView(),
    app.views.pallete = new Pallete.palleteView({collection: app.palleteCollection}),
    app.views.canvas = new Canvas.canvasView({
       collection: app.canvasCollection
    })
    app.views.connectors = new Connector.connectorCollectionView({
        paper: window.mainCanvas.canvas,
        collection: app.connectorCollection
    })
    app.views.connectors.render()
    app.views.footer = new Footer.footerView();

    // Initialize regions with basic views
    app.addInitializer(function () {
        app.header.show(app.views.header); // .show automatically does render  
        app.pallete.show(app.views.pallete); 
        app.canvas.show(app.views.canvas);
        app.footer.show(app.views.footer);
    });
    return window.app = app;
});