<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%-- 
<% response.sendRedirect("home"); %>
 --%>
<!DOCTYPE HTML>
<html>
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
</head>
<body>
  <div id="webMask" style="position:fixed;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:9999;display:none;">
    <div class="row" style="margin:200px auto;width:400px;">
        <img src="/l2k/imgs/loading.gif" alt="" style="width: 140px;margin-left:120px;">
        <p style="color:white; font-size:28px;font-family:BebasNeue;text-align:center;margin-top:20px;">We are processing your request.<br> Hang on there !</p>
    </div>
  </div>
   <div id="topMessages" class="topMessages"></div>
	<div id="header"></div>
	<div id="wrap"></div>
	<script type="text/javascript">
	var contextUrl = '<%=request.getContextPath()%>';
	var contextUrl2 = '<%=request.getContextPath()%>';
</script>
	<script src="<%=request.getContextPath()%>/requirejs/require.js" data-main="<%=request.getContextPath()%>/js/admin/adminapp.js"></script>
</body>
</html>
