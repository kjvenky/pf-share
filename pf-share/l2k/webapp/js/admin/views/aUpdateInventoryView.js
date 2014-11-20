define(['jquery', 'backbone', 'underscore', 'text!js/admin/tpl/aUpdateInventory.tpl', 'js/admin/models/aAddOrderModel', 'js/admin/utils/messageutils',
	], function($, Backbone, _, Template, aAddOrderModel, messageUtils) {
		"use strict"
		var aUpdateInventoryView = Backbone.View.extend({
			template: _.template(Template),
			model: new aAddOrderModel.aAddOrderModel(),
			initialize: function() {
            // Get list of vegetables for today to display
            this.getInventory();
            },

        events: {
        	"click .submitUpdate": "updateInventory"
        },

        getInventory:function(){
        	var that = this
        	$.ajax({
        		url: contextUrl + '/admin/inventory/getAll',
        		async:false,
        		success:function(data){
        			that.model.set('inventory',data)
        		}
        	})
        },

        updateInventory: function(e){
            e.preventDefault()

            var val =  $('.editVal').val(),
                productName = e.target.id;
            if(parseInt(val) >= 0 ){
                 var data = {
                    qtyToAdd: val,
                    productName: productName
                }
                var url = '/admin/inventory/TopupInventory'
            }else{
                 var data = {
                    qtyToSubtract: -1*val,
                    productName: productName
                }                           
                 var url = '/admin/inventory/subtractFromInventory'
            }
            $.ajax({
                url: contextUrl + url,
                type:'POST',
                data: data,
                success:function(){
                    var row = $('#'+e.target.id).parents('tr')
                    row.css('background','#DFF0D8')
                    setTimeout(function(){
                       row.removeAttr('style')
                    },2000)
                },
                errors:function(){
                    $('#'+e.target.id).parents('tr').css('background','#DDA3A1')
                }
            })
        },

        render: function() {
        	this.$el.append(this.template({
        		products: this.model.get('inventory')
        	}))
        	return this
        }
    })
        return {
           aUpdateInventoryView: aUpdateInventoryView
       }
   })