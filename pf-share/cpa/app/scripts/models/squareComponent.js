define([
    'marionette',
    'backbone',
    'jquery',
    'underscore',
    'scripts/models/baseConnectionPoint',
    'scripts/models/palleteComponent'],function(Marionette,Backbone,$,_,CP,palleteComponent){

    // Extends base component
	var squareComponent = palleteComponent.palleteComponent.extend({
		initialize:function(options){
			squareComponent.__super__.initialize.apply(this, options) // To apply base class initializer
			_.extend(palleteComponent.palleteComponent.prototype.defaults, {
				title: "Square Component"
			});
			this.connections()
		},
		connections: function(){
			if(!this.attributes.connectionPoints.length){
				this.attributes.connectionPoints= [ // Based on the component size
				new CP.baseConnectionPoint({},function(){
						this.set({
							'cx':50,
							'cy':50
						})
					})
				]
			}
			return this.attributes.connectionPoints
		}
	})

	return{
		squareComponent : squareComponent
	}
});  