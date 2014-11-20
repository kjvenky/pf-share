<div class="message-form row">
<a id="closemessage" style="position:absolute;top:0px;right:0px;font-size:16px;background:#333;color:#f7f7f7;padding:5px 15px">x</a>
<div class="panel panel-default col-sm-6 col-sm-offset-1" style="padding:0px;">
  <div class="panel-heading heading">
    Login
  </div>
  <div class="panel-body">
     <div id="servermessages" style="margin: 0px 20px;font-size: 12px;"></div>
<form class="form-horizontal" role="form" id="loginForm">  
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-3 control-label">User Name<span style="color:red"> *</span></label>
    <div class="col-sm-8">
      <input type="text" name="username" class="form-control" id="username" placeholder="User Name">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword" class="col-sm-3 control-label">Password<span style="color:red"> *</span></label>
    <div class="col-sm-8">
      <input type="password" name="password" class="form-control" id="password" placeholder="Password">
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-3 col-sm-8" style="font-size:12px;">
<!--       <div class="checkbox pull-left">
        <label>
          <input type="checkbox"> Remember me </input>
        </label>
      </div> -->
      	<div class="pull-left" style="padding-top:7px;font-size:12px ">
          <span id="forgotpass">Forgot password or Forgot username</span>
        </div>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-3 col-sm-8">
      <button class="btnLogin" id="submitLogin">Login</button>
    </div>
  </div>
</form>
  </div>
</div>

<div class="col-sm-5">
  <div style="text-align:center">
    <p style="font-weight:bold;font-size:16px;padding:40px 10px 10px;">New to Landtokitchen?</p>
    <p style="font-size:12px;padding:10px 10px 30px;">Get started now! Its fast and easy</p>
    <button class="btnLogin" id="registerL">Register here</button>
  </div>
</div>
</div>