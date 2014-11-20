<div>
  <div class="panel panel-default col-sm-8 col-sm-offset-2" style="margin-top:40px;padding:0px;">
    <!-- Default panel contents -->
    <div class="panel-heading" style="font-weight:bold;">Update inventory</div>
    <form class="form-horizontal" id="aAddOrderForm" role="form" style="margin-top:40px;">
      <div id="form-messages" style="margin:20px 20px;"></div>
      <div class="form-group">
        <div class="col-sm-9 col-sm-offset-1" > 
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>BaseUnit</th>
                <th>Price</th>
                <th>Qty Available</th>
                <th>Qty Booked</th>
                <th>Edit Qty</th>
                <th></thead>
              </tr>
            </thead>
            <tbody>
              <% _.each(products,function(product){
              %>
              <tr>
                <td><%= product.product.productName %></td>
                <td><%= product.product.baseUnit.unitValue %> <%= product.product.baseUnit.unitName %></td>
                <td>&#8377; <%= product.product.sellingPrice %>/<%= product.product.baseUnit.unitName %></td>
                <td><%= product.qtyAvailable %></div></td>          
                <td><%= product.qtyBooked %></div></td>          
                <td style="padding:0px;"><input class="form-control pull-left editVal" style="text-align:center;width:33%;padding:0px;height: 25px;margin-top: 5px;" id="" name="<%= product.product.productName %>" value="0"/>
                <div style="margin:8px 0px 0px 60px;"><%= product.product.baseUnit.unitName %></div>
                </td>
                <td><button class="btn btn-danger btn-sm submitUpdate"  id="<%= product.product.productName %>"  style="padding:2px 10px;font-size:10px;">Update</button></td>
              </tr>
              <%  }) %>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Get outstanding amount -->
      <!-- Get products -->
      <!-- Create cart  -->
      <!-- Add product to cart -->
<!--       <div class="form-group">
        <div class="col-sm-offset-1 col-sm-9 ">
          <button class="btn btnLogin btn-block" id="submitOrder">Place Order</button>
        </div>
      </div> -->
    </form>
  </div>
</div>

