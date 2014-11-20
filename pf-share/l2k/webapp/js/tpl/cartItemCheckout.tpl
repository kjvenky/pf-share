	<td><%= productName %></td>
	<td><img class="" src="<%= imgUrl %>" width="24px" height="24px" /></td>
	<td style="text-align:center">&#8377; <%= totalAmount %></td>
	<td style="text-align:center"> <%= qty %> &nbsp; <%= baseUnit %></td>
	<td style="text-align:center">
		<div class="row qtySelect" style="margin-top:0px;padding:0px;text-align:center">
				<div class="pull-left col-sm-1 col-sm-offset-3"><button class="btnSub btn btn-danger">-</button></div> 
				<div class="pull-left col-sm-2"  style="padding: 1px 0px 0px 10px;"><input disabled="" type="text" id="qty" value="<%= baseVal %> &nbsp;<%= baseUnit %>"></div>
				<div class="pull-left col-sm-1" style="padding-left: 30px;"><button class="btnAdd btn btn-danger">+</button></div>
		</div>
	</td>
	<td style="text-align:center"><span id="deleteItem" >x</span></td>
	<td></td>