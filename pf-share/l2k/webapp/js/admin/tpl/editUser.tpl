<div>
<div class="panel panel-default col-sm-8 col-sm-offset-1" style="margin-top:40px;padding:0px;">
      <!-- Default panel contents -->
      <div class="panel-heading" style="font-weight:bold;"><%= heading %></div>
        <form class="form-horizontal" role="form" style="margin-top:40px;">
  <div id="form-messages" style="margin:20px 20px;"></div>
  <div class="form-group">
    <label for="inputEmail" class="col-sm-4 control-label">User name<span style="color:red"> *</span></label>
    <div class="col-sm-7">
      <div data-editors="username"></div>
    </div>
  </div>
<!--   <div class="form-group">
    <label for="inputPassword3" class="col-sm-4 control-label">Password<span style="color:red"> *</span></label>
    <div class="col-sm-7">
      <div data-editors="password"></div>
    </div>
  </div> -->
 <div class="form-group">
    <label for="inputEmail" class="col-sm-4 control-label">Email id<span style="color:red"> *</span></label>
    <div class="col-sm-7">
     <div data-editors="emailID"></div>
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-4 control-label">First name<span style="color:red"> *</span></label>
    <div class="col-sm-7">
      <div data-editors="firstName"></div>
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-4 control-label">Last name</label>
    <div class="col-sm-7">
       <div data-editors="lastName"></div>
    </div>
  </div>
    <div class="form-group">
    <label class="col-sm-4 control-label">Door no<span style="color:red"> *</span></label>
    <div class="col-sm-7">
       <div data-editors="address1"></div>
    </div>
  </div>
    <div class="form-group">
    <label class="col-sm-4 control-label">Street<span style="color:red"> *</span></label>
    <div class="col-sm-7">
       <div data-editors="address2"></div>
    </div>
  </div>
      <div class="form-group">
    <label class="col-sm-4 control-label">Locality<span style="color:red"> *</span></label>
    <div class="col-sm-7">
       <div data-editors="address3"></div>
    </div>
  </div>
      <div class="form-group">
    <label class="col-sm-4 control-label">Pin Code<span style="color:red"> *</span></label>
    <div class="col-sm-7">
      <div data-editors="address4"></div>
    </div>
  </div>
 <div class="form-group">
    <label class="col-sm-4 control-label">Zone<span style="color:red"> *</span></label>
    <div class="col-sm-7">
      <div data-editors="zoneName"></div>
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-4 control-label">Primary number<span style="color:red"> *</span></label>
    <div class="col-sm-7">
        <div data-editors="primaryMobile"></div>
    </div>
  </div>
    <div class="form-group">
    <label class="col-sm-4 control-label">Secondary number</label>
    <div class="col-sm-7">
      <div data-editors="secondaryPhone"></div>
    </div>
  </div>
    <div class="form-group">
    <label class="col-sm-4 control-label">Landline number</label>
    <div class="col-sm-7">
      <div data-editors="landLine"></div>
    </div>
  </div>
   <div class="form-group">
     <label class="col-sm-4 control-label">Person Type</label>
    <div class="col-sm-7">  
      <div data-editors="personTypeName"></div>
    </div>
  </div>
   <div class="form-group">
    <label class="col-sm-4 control-label">Bank Name</label>
    <div class="col-sm-7">  
      <div data-editors="bankName"></div>
    </div>
  </div>
    <div class="form-group">
    <label class="col-sm-4 control-label">Bank Branch</label>
    <div class="col-sm-7">  
      <div data-editors="bankBranch"></div>
    </div>
  </div>
   <div class="form-group">
    <label class="col-sm-4 control-label">Bank Account Number</label>
    <div class="col-sm-7">  
      <div data-editors="bankAccountNumber"></div>
    </div>
  </div>
  <!-- Hidden field for address -->
  <div data-editors="address5" style="display:none;"></div>
  <div class="form-group">
    <div class="col-sm-offset-4 col-sm-7 ">
      <button class="btn btnLogin btn-block" id="submitRegister">Update user details</button>
    </div>
  </div>
</div>
</form>
<button class="btn btn-danger" id="deleteUser" style="margin: 40px 10px;">Delete this user</button>
</div>