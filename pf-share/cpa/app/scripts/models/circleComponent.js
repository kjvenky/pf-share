define([
    'marionette',
    'backbone',
    'jquery',
    'underscore',
    'scripts/models/baseConnectionPoint',
    'scripts/models/palleteComponent'],function(Marionette,Backbone,$,_,CP,palleteComponent){

    // Extends base component
	var circleComponent = palleteComponent.palleteComponent.extend({
		initialize:function(options){
			circleComponent.__super__.initialize.apply(this, options) // To apply base class initializer
			_.extend(palleteComponent.palleteComponent.prototype.defaults, {
				title: "Circle Component"
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
					}),
					new CP.baseConnectionPoint({},function(){
						this.set({
							'cx':150,
							'cy':150
						})					
					}), 
				]
			}
			return this.attributes.connectionPoints
		}
	})

	return{
		circleComponent : circleComponent
	}
});  