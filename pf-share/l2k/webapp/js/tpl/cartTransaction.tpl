<div class="message-form row" style="margin-top:150px">
  <!-- <a id="closemessage" style="position:absolute;top:0px;right:0px;font-size:16px;background:#333;color:#f7f7f7;padding:5px 15px">x</a>  -->
  <div class="panel panel-default col-sm-8 col-sm-offset-2" style="padding:0px;line-height:24px;">
    <div class="panel-heading heading"> <i class="fa fa-shopping-cart"></i>&nbsp;&nbsp;&nbsp;Your cart</div>
    <div class="panel-body" style="padding:30px 30px 80px;width:80%;margin:0 auto;;">
      <% if(status == "success"){%>
        <div class="alert alert-success" style="font-size:12px;font-weight:bold;"> Your order is placed successfully!</div>
      <%}
      if(status == "failed  "){%>
        <div class="alert alert-danger" style="font-size:12px;font-weight:bold;"> We are unable to place your order. Please try again!</div>
      <%}%>
     <table class="table table-striped cart-table">
      <thead>
        <tr>  
          <th>Item Name</th style="font-weight:bold;font-size:12px;">
            <th>&nbsp;</th>
            <th style="text-align:center;">Amount (in Rs.)</th>
            <th style="text-align:center">Total Quantity</th>
            <th>&nbsp;</th>
          </tr>          
        </thead>
        <tbody id="checkoutcart">
         <% _.each(cartItems.models, function(item){
          %>
          <tr>
            <td><%= item.attributes.productName %></td>
            <td><img class="" src="<%= item.attributes.imgUrl %>" width="24px" height="24px" /></td>
            <td style="text-align:center">&#8377; <%= item.attributes.totalAmount %></td>
            <td style="text-align:center"> <%= item.attributes.qty %> &nbsp; <%= item.attributes.baseUnit %></td>
            <td></td>
          </tr>
          <%})%>
        </tbody>
      </table>
      <div class="row" style="background: #F5F5F5;margin: 0px;border-top: 1px solid #DDD;">
        <div class="pull-left" style="padding:10px 0px 10px 20px;font-size:10px;pull-right">Please note that Orders once placed cannot be cancelled.</div>
       <div class="pull-right"  style="font-size:12px;font-weight:bold;margin-left:15px;padding:10px 20px;">
        &nbsp;&nbsp;&nbsp;Total Amount: &#8377;  
        <%if(total>0){%>
          <span id="totalItems"><%= items %></span>
          <span id="totalAmount"><%= total %></span>
        <%}%>
      </div>
      </div>
    </div>
  </div>
</div>