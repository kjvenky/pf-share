define(['jquery',
	'backbone',
	'underscore',
	'text!js/tpl/productCollection.tpl',
	'js/views/productView'
	],function($,Backbone,_,Template,productView){

		var productCollectionView = Backbone.View.extend({
			el: '#product-info',
			template: _.template(Template),
			initialize:function(){
				this.$el.append(this.template())
				_.bindAll(this,'render');
				this.collection.on('sync change reset update', function() {
					this.render();
				}, this);
				return this
			},
			
			events:{
				'keyup input#searchVal':'search'
			},

			search:function(){
				var searchTerm = $('#searchVal').val().toLowerCase(); // Get the search term	
				var searchCollection = this.collection.filter(function(model){
					var name = model.attributes.productName
					if(name.toLowerCase().indexOf(searchTerm)===-1) {
						return false
					}else{ 
						return true
					}})	
					$('#product-col').html('')
				if(searchCollection.length){
					this.render(searchCollection)
				}else{
					this.render($('#product-col').html('<div class="alert alert-danger" style="font-size:12px; margin:20px 20px 0px;">No vegetable found in the list</div>'))
				}
			},

			render: function(data){ // Refresh all the collection view
				var models = data || this.collection.models
				$('.productItem').remove()
				_.each(models, function (product){
					this.$el.append(new productView.productView({model:product}).render().el)
				}, this);
				return this;
			},

			paginate: function(){ // Implement a pagination view

			}
		})

		return {
			productCollectionView: productCollectionView
		}

	})