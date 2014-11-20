<div>
  <!-- <form class="form-horizontal" role="form" id="search" style="margin: 20px 0px 10px;background:#222;"> -->
    <div class="form-group"  style="margin: 10px 0px 10px;background:#222;border-radius:5px;padding:5px 0px;">
      <label style="color: #FFF;text-align: right;padding-top: 10px;" for="inputPassword" class="col-sm-2 control-label">Search here </label>
      <div class="col-sm-10 input-group">
        <input type="text" class="form-control" id="searchVal" placeholder="Search here" value="<%= searchTerm %>" style="margin-bottom: 0px !important;">
        <div class="input-group-btn" style="text-transform:capitalize">
        <button style="padding:8px;margin-top: 3px;border-radius: 0px 5px 5px 0px;width:175px;" type="button" class="btn btn-default dropdown-toggle btn-danger" data-toggle="dropdown">
        <span id="btn-text" style="width:100px;"><%= idKey %></span> <span class="caret"></span></button>
        <ul class="dropdown-menu dropdown-menu-right" role="menu" style="font-size: 12px;">
          <% _.each(fields,function(value){
            if(value !== 'S.No'){
              %>
                <li><a><%= value %></a></li>
              <%
              }
            })
          %>
        </ul>
      </div><!-- /btn-group -->      
      <button class="btn btn-danger pull-left" id="iSearch" style="margin-left:10px;padding:8px 16px;"><i class="fa fa-search" style="padding-right:10px;"></i>Search</button>  
      <button class="btn btn-danger pull-right" id="clearSearch" style="margin-right:10px;padding:8px;"> Clear search</button>  
      </div>
      <div style="clear:both;"></div>
    </div>
  <!-- </form> -->
  <div class="row well" style="padding:8px;margin:0px 0px;">
    <div class="pull-left">

     <button class="btn btn-danger" disabled style="margin-left:15px;"> Filters:</button>    
      <% if(type == "openorders"){ %>
     <span style="margin-left:20px;"><b>Show by Time:</b></span>
     <select id="filterbyTime" class="btn" style="padding:4px 12px">
       <option selected value="all">All</option>
       <option value="today">Today</option>
       <option value="thisweek">This Week</option>       
       <option value="thismonth">This Month</option>       
     </select>
     <div class="span5 col-md-5" id="sandbox-container"><input type="text" class="form-control"></div>
     <span style="margin-left:20px;"><b>Show by Status:</b></span>
     <select id="filterbyStatus" class="btn" style="padding:4px 12px">
       <option selected value="All">All</option>
       <option value="Order Created">Order Created</option>
       <option value="Processing Order">Processing Order</option>
       <option value="Ready for Delivery">Ready for Delivery</option>
       <option value="Waiting Payment">Waiting Payment</option>
       <option value="Order Completed">Order Completed</option>
       <option value="Cancelled">Cancelled</option>
       <option value="In Transit">In Transit</option>
       <option value="Delivered to Distributor">Delivered to Distributor</option>
       <option value="Delivered to Customer">Delivered to Customer</option>
     </select>
     <% } %>

           <% if(type == "transactionstable"){ %>
     <span style="margin-left:20px;"><b>Show by Status:</b></span>
     <select id="filterbyStatus" class="btn" style="padding:4px 12px">
       <option selected value="All">All</option>
       <option value="PayLater">Pay Later</option>
       <option value="Waiting">Waiting</option>
       <option value="Success">Success</option>
     </select>
     <% } %>

     <% if(type == "orders"){ %>
       <button id="pushToPacking" style="margin-right:15px;" class="btn btn-danger  pull-right">Push Fresh orders to Packing</button>
      <% } %>
    </div>
    <button class="btn btn-success pull-right" id="printData" style="margin-right:15px;">Print List</button>
    <% if(type == "freshorders"){ %>
    <button id="pushToPacking" style="margin-right:15px;" class="btn btn-danger  pull-right">Push Fresh orders to Packing</button>
    <% } %>
    <% if(type == "packingtable"){ %>
    <button id="pushToCarton" style="margin-right:15px;" class="btn btn-danger pull-right">Push Ready to Cartoning</button>        
    <button id="pushToPReady" style="margin-right:15px;" class="btn btn-danger  pull-right">Push To Packing Ready</button>    
    <% } %>
    <% if(type == "cartoningtable"){ %>
    <button id="cartonToDelivery" style="margin-top:30px;" class="btn btn-danger">Push To Delivery Ready</button>
    <button id="completedDelivery" style="margin-top:30px;" class="btn btn-danger">Push To Completed</button>
    <% } %>
  </div>
   <% if(!_.isUndefined(message)) {%>
      <div class="alert <% if (messageType=="success") {%> alert-success <%}else{ %> alert-danger<% } %>" style="font-weight:bold;margin-top:10px;"><%= message %></div>
  <% }%>
    <div class="panel panel-default" style="margin-top:10px;" id="panel">
      <!-- Default panel contents -->
      <div class="panel-heading" style="font-weight:bold;">Panel heading</div>
      <table class="table table-striped	table-hover">
        <thead>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
<script>
  $('.dropdown-menu li').click(function(e){
  e.preventDefault();
  var selected = $(this).text();
  $('#btn-text').text(selected
});
$(document).ready(function(){
  console.log("I am here")

});
</script>
</div>