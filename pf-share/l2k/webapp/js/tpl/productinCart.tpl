	<div style="border:1px solid #e7e7e7;border-radius:5px; text-align:center; padding-bottom:20px;background:#fffdcd">
		<p style="font-size:12px;font-weight:bold;background:#ddd;padding:8px 0px;"><%= productName %> </p>
		<p style="background:#fffdcd;padding: 8px 0px;font-size: 12px;font-weight: bold;"> &#8377; <%= sellingPrice %> per <%= baseUnit.unitName %></p>
		<img src="<%= imgUrl %>" width="132px" height="128px"/>
		<!-- <p style="font-weight:bold;">&#8377;  <%= sellingPrice*baseUnit.unitValue %></p> -->
		<div class="row"> 
			<div class="qtySelect">
				<div class="pull-left col-sm-2"><button class="btnSub btn btn-danger">-</button></div> 
				<div class="pull-left col-sm-4"><input disabled type="text" id="qty" value="<%= baseUnit.unitValue %> <%= baseUnit.unitName %>" /></div>
				<div class="pull-left col-sm-2"><button class="btnAdd btn btn-danger">+</button></div>
				<!-- <div class="pull-left"><%= baseUnit %></div> -->
			</div> 
		</div>
		<!-- Get data from cart -->
		<button disabled class="btn btn-danger btn-xs" style="font-size:10px;font-weight:bold;margin-top:10px;padding:5px 20px;"> <%= qtyinCart %> <%= baseUnit.unitName %> in Basket</button>
	</div>