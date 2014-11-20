define([
    'marionette',
    'backbone',
    'jquery',
    'underscore',
    'backbone.localStorage'],function(Marionette,Backbone,$,_,localStorage){

    // Abstract component used only for extending to other components
	var baseConnectionPoint = Backbone.Model.extend({
		// List of attribtues of base components
		defaults:{ 
			title: 'Connection point',
			cx: 20,
			cy: 20,
			px: 20,
			py: 20,
			baseValue:5,			
			connectors:[],
			created: 0
		},

		initialize:function(parent, setData, update){
			baseConnectionPoint.__super__.initialize.call(this)
			this.parent = parent || undefined
			// If no options its a callback function being passed
			if (this.isNew()) { // Gen random fun. Not sure of the its purpose.
				this.set('created', Date.now()); // Set the created date. Not sure of the use.
			}
			if(typeof setData == 'function'){
				this.xySetup = setData // Used to set custom x and y
				this.xySetup.call(this)
			}
			if(typeof update == 'function'){
				this.xyUpdate = update // Used to set custom x and y
				this.xyUpdate(this.parent)
			}
		},
		px: function(){ return this.get('px')},
		py: function(){return this.get('py')},
		cx: function(){ return this.get('cx')},
		cy: function(){return this.get('cy')},
		baseValue: function(){return this.get('baseValue')},
		isConnected:function(){
			if(this.get('connectors').length>0){
				return true
			}else{
				return false
			}
		},
		update:function(parent){
			this.xyUpdate(parent)
		}
	})

	return{
		baseConnectionPoint : baseConnectionPoint
	}
});