<div class="container">
  <div class="row" >
    <div class="col-sm-6 col-sm-offset-3"  style="padding:10px;font-size:14px;color:#333;font-weight:bold;"> Administrator login</div>
    <div class="col-sm-6 col-sm-offset-3" style="background:#333;padding:0px 0px;border:10px solid rgba(0,0,0,0.1);border-radius:10px; color:#f7f7f7;">
     <form class="form-horizontal " id="aLoginForm" role="form" style="padding:20px 40px 30px;">
      <div class="form-group">
        <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
        <div class="col-sm-10">
          <input type="username" name="j_username" class="form-control" placeholder="Username">
        </div>
      </div>
      <div class="form-group">
        <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
        <div class="col-sm-10">
          <input type="password" name="j_password" class="form-control" placeholder="Password">
        </div>
      </div> 
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <a class="btn btn-default" onclick="login(this)">Sign in</a>
        </div>
      </div>
    </form>
    <div style="clear:both"></div>
  </div>
</div>
</div>
<script> // ajax call for login
function login(){
  var inputs = $('#aLoginForm').serializeArray()
  var data = {}
  _.each(inputs,function(val){
    data[val.name] = val.value
  })
  $.ajax({
    url: contextUrl + '/j_spring_security_check',
    type:'POST',
    data: data,
    success:function(data){
      if(data.isAuthenticated){
        // set the cookie and reload the actual page
        window.location.href = contextUrl+data.targetUrl
      }else{
        admin.session.username = undefined
      }
    },
    error:function(){

    }
  })
} //l2k/j_spring_security_check
</script>