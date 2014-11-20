<div class="chartArea">
	<div class="row" style='text-align:center'>
		<select name="productName" id="productName" style="font-size:34px;font-family:BebasNeue;text-transform:capitalize;">
			<% _.each(products,function(product){%>
		              <option value="<%= product.productName %>"><%= product.productName %></option>
		    <%  }) %>
		</select>
	</div>
	<div class="row">
		<div class="col-sm-6">
			<h3 style="text-align:center;font-family:BebasNeue">Buying Price</h3>
			<div class="plot-1"></div>
		</div>
		<div class="col-sm-6">
			<h3 style="text-align:center;font-family:BebasNeue">Selling Price</h3>
			<div class="plot-2"></div>			
		</div>
	</div>	
	<div class="row">
		<div class="col-sm-12">
			<div class="table"></div>
		</div>
	</div>
</div>

