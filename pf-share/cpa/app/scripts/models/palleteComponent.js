define([
    'marionette',
    'backbone',
    'jquery',
    'underscore',
    'scripts/models/baseConnectionPoint',
    'scripts/models/baseComponent',
    'backbone.localStorage'],function(Marionette,Backbone,$,_,CP,baseComponent,localStorage){

	var palleteComponent = baseComponent.baseComponent.extend({
		localStorage: new Backbone.LocalStorage('gdsim-backbone'),
		// List of attribtues of base components
		defaults:{ 
			title: 'Component',
			label: '',
			cx: 20,
			cy: 20,	
			category: '', // To organize pallete
			created: 0,
			baseValue:0,
			type:'default',
			connectionPoints:[] //Every component has connectors
		},

		initialize:function(options){
			if (this.isNew()) { // Gen random fun. Not sure of the its purpose.
				this.set('created', Date.now()); // Set the created date. Not sure of the use.
			}
		},
		x: function(){ return this.get('cx')},
		y: function(){return this.get('cy')},
		baseValue: function(){return this.get('baseValue')},
		connections:function(){ // To note that all elements will have connectionPoints
		},

		// Function to create a clone of the model on the canvas
		canvasClone:function(){
			// Update the value of the pallete object and return the new object
			var cloneModel = palleteComponent.__super__.clone.call(this)
			cloneModel.set('baseValue',this.baseValue()*1.5)

			// Create new connection point models and attach
			cloneModel.attributes.connectionPoints = [ // Based on the component size
					new CP.baseConnectionPoint(cloneModel /* parent */,function(){
						this.set({
							'px': this.parent.x(),
							'py': this.parent.x(),
							'baseValue' :3, // No need to use this actually
						})							
					},function(parent){	
						this.set({
							'px': this.parent.x(),
							'py': this.parent.x(),
							'cx': this.parent.x()+this.parent.baseValue(),
							'cy': this.parent.y()
						})		
					}),
					new CP.baseConnectionPoint(cloneModel/* parent */,function(){
						this.set({
							'cx':150,
							'cy':150,
							'baseValue':3,	
						})					
					},function(parent){
						this.set({
							'px':this.parent.x(),
							'py':this.parent.x(),
							'cx': this.parent.x(),
							'cy': this.parent.y()+this.parent.baseValue(),
						})		
					}),
					new CP.baseConnectionPoint(cloneModel/* parent */,function(){
						this.set({
							'cx':150,
							'cy':150,
							'baseValue':3,	
						})					
					},function(parent){
						this.set({
							'px':this.parent.x(),
							'py':this.parent.x(),
							'cx': this.parent.x(),
							'cy': this.parent.y()-this.parent.baseValue(),
						})		
					}),
					new CP.baseConnectionPoint(cloneModel/* parent */,function(){
						this.set({
							'cx':150,
							'cy':150,
							'baseValue':3,	
						})					
					},function(parent){
						this.set({
							'px':this.parent.x(),
							'py':this.parent.x(),
							'cx': this.parent.x()-this.parent.baseValue(),
							'cy': this.parent.y(),
						})		
					})
			]
			return cloneModel
		}
	})

	return{
		palleteComponent : palleteComponent
	}
});