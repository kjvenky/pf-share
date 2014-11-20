<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%-- 
<% response.sendRedirect("home"); %>
 --%>
<!DOCTYPE HTML>
<html style="height:100%;">
<head>
<meta charset="utf-8">
<meta name="description" content="">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Landtokitchen | Order Vegetables online</title>
<link rel="stylesheet"	href="<%=request.getContextPath()%>/bootstrap/dist/css/bootstrap.css">
<link rel="stylesheet"	href="<%=request.getContextPath()%>/css/main.css">
<link rel="stylesheet"	href="<%=request.getContextPath()%>/css/admin.css">
<!-- Font awesome -->
<link href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"rel="stylesheet">
<link rel="author" href="humans.txt">
<script type="text/javascript" src="<%=request.getContextPath()%>/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/jquery-cookie/jquery.cookie.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/underscore/underscore.js"></script>
<script type="text/javascript">
var contextUrl = '<%=request.getContextPath()%>';
if($.cookie('admin_logged')==1){
	window.location.href = contextUrl+'/admin/home'
}
</script>
</head>
<body style="background-color:#2E3E4E;height:100%;">
<div class="container" style="height:100%;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <div class="row" >
    <div class="col-sm-6 col-sm-offset-3"  style="padding:10px;font-size:18px;color:#ddd;font-weight:bold;margin-top:90px;margin-bottom:30px;text-align:center;text-transform:uppercase;"> landtokitchen</div>
    <div class="panel panel-default col-sm-6 col-sm-offset-3" style="padding:0px;">
  <div class="panel-heading">
    <h3 class="panel-title" style="font-weight:bold;font-size:12px;text-align:center;padding:4px 0px;">Sign In</h3>
  </div>
  <div class="panel-body">
     <form class="form-horizontal " id="aLoginForm" role="form" style="padding:20px 40px 30px;font-size:12px;">
      <div class="form-group">
        <label for="inputEmail3" class="col-sm-2 control-label">Username</label>
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
          <a class="btn btn-default btn-success col-sm-3" onclick="login(this)">Sign in</a>
        </div>
      </div>
    </form>
  </div>
</div>
<div  class="col-sm-6 col-sm-offset-3"  style="text-align:center;color:#717171;font-size:11px;">Webapp developed at GyanData &copy; 2014</div>
    <div style="clear:both"></div>
  </div>
</div>
</div>
<script> // ajax call for login
// Write auto redirect if cookie is found
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
    	$.cookie('admin_logged',1, { expires: 3 });
        window.location.href = contextUrl+data.targetUrl
      }else{
    	window.location.href = contextUrl+'/admin/'
      }
    },
    error:function(){

    }
  })
} 
</script>

</body>
</html>
