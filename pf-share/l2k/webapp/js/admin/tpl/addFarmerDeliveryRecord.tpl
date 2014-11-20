<div>
  <div class="panel panel-default col-sm-8 col-sm-offset-2" style="margin-top:40px;padding:0px;">
    <!-- Default panel contents -->
    <div class="panel-heading" style="font-weight:bold;">Add Farmer Delivery Record</div>
    <form class="form-horizontal" id="aAddFarmerDeliveryRecord" role="form" style="margin-top:40px;">
      <div id="form-messages" style="margin:20px 20px;"></div>
      <div class="form-group">
        <label  class="col-sm-3 control-label">Phone Number<span style="color:red"> *</span></label>
        <div class="col-sm-7">
          <input type="text" name="phoneNumber" class="form-control" id="phoneNumber" placeholder="Enter Phone number">
        </div>
      </div>
      <!-- Get user by Phonenumber --> 
      <div class="form-group">
        <label  class="col-sm-3 control-label">User Name<span style="color:red"> *</span></label>
        <div class="col-sm-7">
          <input type="text" name="userName" readonly class="form-control" id="userName" placeholder="User Name" value=
          "<% if(!_.isUndefined(user)){%><%= user.username %><%}%>">
          </input>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-3 control-label">Product Name<span style="color:red"> *</span></label>
        <div class="col-sm-7 ">
          <select name="productName" class="form-control">
              <% _.each(products,function(product){
              %>
              <option value=" <%= product.productName %>" style="text-transform:capitalize">
                <%= product.productName %>
              </option>
              <%  }) %>
          </select>
          </div>
      </div>
      <div class="form-group">
        <label  class="col-sm-3 control-label">Buying Price</label>
        <div class="col-sm-7">
          <input type="text" name="buyingPrice" class="form-control" id="buyingPrice" placeholder="Buying price in Rs." value=
          "">
          </input>
        </div>
      </div>      
      <div class="form-group">
        <label  class="col-sm-3 control-label">Quantity Delivered</label>
        <div class="col-sm-7">
          <input type="text" name="quantityDelivered" class="form-control" id="quantityDelivered" placeholder="Quantity Delivered" value=
          "">
          </input>
        </div>
      </div>      
      <div class="form-group">
        <label  class="col-sm-3 control-label">Quantity Accepted<span style="color:red"> *</span></label>
        <div class="col-sm-7">
          <input type="text" name="quantityAccepted" class="form-control" id="quantityAccepted" placeholder="Quantity Accepted" value=
          "">
          </input>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-3 col-sm-7 ">
          <button class="btn btnLogin btn-block" id="submitOrder">Add Delivery Record</button>
        </div>
      </div>
    </form>
  </div>
</div>
