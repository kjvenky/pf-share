<div>
  <div class="panel panel-default col-sm-8 col-sm-offset-2" style="margin-top:40px;padding:0px;">
    <!-- <%= outStandingAmount %> -->
    <!-- Default panel contents -->
    <div class="panel-heading" style="font-weight:bold;">Add Amount to user wallet</div>
    <form class="form-horizontal" id="aAddWalletForm" role="form" style="margin-top:40px;">
      <div id="form-messages" style="margin:20px 20px;"></div>
      <div class="form-group">
        <label for="inputPassword" class="col-sm-3 control-label">Phone Number<span style="color:red"> *</span></label>
        <div class="col-sm-7">
          <input type="text" name="primaryMobile" class="form-control" id="phoneNumber" placeholder="Enter Phone number">
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
        <label for="inputPassword" class="col-sm-3 control-label">Current Wallet Amount<span style="color:red"> *</span></label>
        <div class="col-sm-7">
          <input type="text" name="outAmount" class="form-control" readonly id="outAmount" placeholder="Amount present in wallet" value="<% if(!_.isUndefined(outStandingAmount)){%><%= outStandingAmount %><%}%>">

        </input>
        </div>
      </div>      
      <div class="form-group">
        <label for="inputPassword" class="col-sm-3 control-label">Add Amount<span style="color:red"> *</span></label>
        <div class="col-sm-7">
          <input type="text" name="amount" id="addAmount" class="form-control" placeholder="Add wallet Amount" value="">
        </input>
        </div>
      </div>

      <div class="form-group">
        <div class="col-sm-offset-3 col-sm-7">
          <button class="btn btnLogin btn-block" id="submitForm">Add Wallet Amount</button>
        </div>
      </div>
    </form>
  </div>
</div>
