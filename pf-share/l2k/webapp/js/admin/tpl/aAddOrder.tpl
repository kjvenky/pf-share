<div>
  <div class="panel panel-default col-sm-8 col-sm-offset-2" style="margin-top:40px;padding:0px;">
    <!-- <%= outStandingAmount %> -->
    <!-- Default panel contents -->
    <div class="panel-heading" style="font-weight:bold;">Add New Order</div>
    <form class="form-horizontal" id="aAddOrderForm" role="form" style="margin-top:40px;">
      <div id="form-messages" style="margin:20px 20px;"></div>
      <div class="form-group">
        <label for="inputPassword" class="col-sm-3 control-label">Phone Number<span style="color:red"> *</span></label>
        <div class="col-sm-7">
          <input type="text" name="phoneNumber" class="form-control" id="phoneNumber" placeholder="Enter Phone number">
        </div>
      </div>
      <!-- Get user by Phonenumber --> 
      <div class="form-group">
        <label for="inputPassword" class="col-sm-3 control-label">User Name<span style="color:red"> *</span></label>
        <div class="col-sm-7">
          <input type="text" name="userName" readonly class="form-control" id="userName" placeholder="User Name" value=
          "<% if(!_.isUndefined(user)){%><%= user.username %><%}%>">
          </input>
        </div>
      </div>
      <div class="form-group">
        <label for="inputPassword" class="col-sm-3 control-label">Wallet Amount<span style="color:red"> *</span></label>
        <div class="col-sm-7">
          <input type="text" name="outAmount" class="form-control" readonly id="outAmount" placeholder="Outstanding Amount" value="<% if(!_.isUndefined(outStandingAmount)){%><%= outStandingAmount %><%}%>">

        </input>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-9 well col-sm-offset-1" style="padding:10px;font-weight:bold;margin-top:10px;">Vegetables available for Ordering</div>
        <div class="col-sm-9 col-sm-offset-1" > 
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>BaseUnit</th>
                <th>Price</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              <% _.each(products,function(product){
              %>
              <tr>
                <td><%= product.productName %></td>
                <td><%= product.baseUnit.unitValue %> <%= product.baseUnit.unitName %></td>
                <td>&#8377; <%= product.sellingPrice %>/<%= product.baseUnit.unitName %></td>
                <td style="padding:0px;"><input class="form-control pull-left" style="width:33%;padding:0px;height: 25px;margin-top: 5px;" id="" name="<%= product.productName %>" value="0"/>
                <div style="font-weight:bold;margin:8px 0px 0px 60px;"><%= product.baseUnit.unitName %></div>
                </td>
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
      <div class="form-group">
        <div class="col-sm-offset-1 col-sm-9 ">
          <button class="btn btnLogin btn-block" id="submitOrder">Place Order</button>
        </div>
      </div>
    </form>
  </div>
</div>
