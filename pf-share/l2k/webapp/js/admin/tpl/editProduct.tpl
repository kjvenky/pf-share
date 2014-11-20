<div>
<div class="panel panel-default col-sm-8 col-sm-offset-2" style="margin-top:40px;padding:0px;">
<!-- Default panel contents -->
<div class="panel-heading" style="font-weight:bold;"><%= heading %></div>
<form class="form-horizontal" role="form" style="margin-top:40px;">
  <div id="form-messages" style="margin:20px 20px;"></div>
  <div class="form-group">
    <label for="inputEmail" class="col-sm-4 control-label">Product Name<span style="color:red"> *</span></label>
    <div class="col-sm-7">
      <div data-editors="productName" readonly></div>
    </div>
  </div>
   <div class="form-group">
    <label for="inputEmail" class="col-sm-4 control-label">Unit Name<span style="color:red"> *</span></label>
    <div class="col-sm-7">
      <div data-editors="unitName"></div>
    </div>
  </div>
   <!---<div class="form-group">
    <label for="inputEmail" class="col-sm-4 control-label">Unit Value<span style="color:red"> *</span></label>
    <div class="col-sm-7">
      <div data-editors="unitValue"></div>
    </div>
  </div>-->
  <div class="form-group">
    <label for="inputEmail" class="col-sm-4 control-label">Buying Price<span style="color:red"> *</span></label>
    <div class="col-sm-7">
      <div data-editors="buyingPrice"></div>
    </div>
  </div>
 <div class="form-group">
    <label for="inputEmail" class="col-sm-4 control-label">Selling Price<span style="color:red"> *</span></label>
    <div class="col-sm-7">
      <div data-editors="sellingPrice"></div>
    </div>
  </div>
  <div class="form-group">
    <label for="inputEmail" class="col-sm-4 control-label">Display<span style="color:red"> *</span></label>
    <div class="col-sm-7">
      <div data-editors="display"></div>
    </div>
  </div>
  <div class="form-group">
    <label for="inputEmail" class="col-sm-4 control-label">Grade<span style="color:red"> *</span></label>
    <div class="col-sm-7">
      <div data-editors="grade"></div>
    </div>
  </div>
  <div class="form-group">
    <label for="inputEmail" class="col-sm-4 control-label">Image Url<span style="color:red"> *</span></label>
    <div class="col-sm-7">
      <div data-editors="imgUrl"></div>
    </div>
  </div>
 <div data-editors="productPkey" style="display:none;"></div>
  <div class="form-group">
    <div class="col-sm-offset-4 col-sm-7 ">
      <button class="btn btnLogin btn-block" id="submitRegister">Update product details</button>
    </div>
  </div>
</form>
</div>
<button class="btn btn-danger" id="deleteProduct" style="margin: 40px 10px;font-size:12px;font-weight:bold">Delete this product</button>
</div>
