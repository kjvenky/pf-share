<!--  Render the template based on the views -->
<div class="message-form row" class="checkoutCart">
  <a id="closemessage" style="position:absolute;top:0px;right:0px;font-size:16px;background:#333;color:#f7f7f7;padding:5px 15px">x</a>
  <div  style="margin:10px 30px;font-size:12px" id="cart-messages"></div>
  <div class="panel panel-default col-sm-10 col-sm-offset-1" style="padding:0px;">
    <div class="panel-heading heading">
     <i class="fa fa-shopping-cart"></i>&nbsp;&nbsp;Checkout Cart
   </div>
   <div class="panel-body" style="padding:0px;">
     <table class="table table-striped cart-table">
      <thead>
        <tr>
          <th>Item Name</th style="font-weight:bold;font-size:12px;">
            <th>&nbsp;</th>
            <th style="text-align:center;">Amount (in Rs.)</th>
            <th style="text-align:center">Total Quantity</th>
            <th style="text-align:center;">Edit Quantity</th>
            <th>Delete Item</th>
            <th>&nbsp;</th>
          </tr>          
        </thead>
        <tbody id="checkoutcart">
        </tbody>
      </table>
      <div id="topuprow"></div>
      <div class="row" style="background: #F5F5F5;margin: 0px;border-top: 1px solid #DDD;">
       <div class="pull-right" style="font-size:12px;font-weight:bold;margin-left:15px;padding:10px 20px;">Order amount : &#8377; <%= totalAmount %>
        <%if(includeDueAmount){%>
        <%}%>
        &nbsp;&nbsp;&nbsp;Total Items:<%= totalItems %></div>
        <div  class="pull-left" style="padding:10px 0px 10px 20px;font-size:10px;pull-right">Please note that Orders once placed cannot be cancelled.</div>
        <div style="clear:both"></div>
      </div>
      <%if(value<0){%>
      <div class="row" style="margin: 0px;border-top: 1px solid #DDD;">
       <div class="pull-right" style="font-size:12px;font-weight:bold;margin-left:15px;padding:10px 20px;">
        &nbsp;&nbsp;&nbsp;Due Amount: &#8377; <%= Math.abs(value) %></div>
      </div>

    <%}%>
           <div class="row" style="background: #F5F5F5;margin: 0px;border-top: 1px solid #DDD;">
       <div class="pull-right"  style="font-size:12px;font-weight:bold;margin-left:15px;padding:10px 20px;">
        &nbsp;&nbsp;&nbsp;Total Amount: &#8377;  
        <%if(value<0){%>
          <span id="totalAmount"><%= Math.abs(value) + totalAmount %></span>
        <%}else{%>
            <span id="totalAmount"><%= totalAmount %></span>
        <%}%>
      </div>
      </div>

  </div>

  <div class="panel-heading panel-footer">
    <%if(allowed){%>
    <div class="row"> 
      <% if(auth) {%> 
      <button data-toggle="tooltip" data-title="Click to redirect to Online payment" data-placement="top" class="btn btn-success col-sm-2 pull-right smallbox" id="paynow" style="margin-right: 15px;">Pay Now</button>
      <% if(buttons.payLaterButton){%><button data-toggle="tooltip" data-title="Click to redirect to avail vegetables on credit" data-placement="top" class="btn btn-info col-sm-2 pull-right smallbox" id="paylater">Pay Later</button><%}%>
      <% if(buttons.payFromBalanceButton){%><button data-toggle="tooltip" data-title="Click to pay from your wallet balance" data-placement="top" class="btn btn-primary col-sm-2 pull-right smallbox" id="payfromBalance">Pay from e-wallet      </button><%}%>
      <button class="btn btn-danger col-sm-2 pull-right smallbox" data-toggle="tooltip" data-title="Click to add topup amount to this transaction" data-placement="top"  id="topup">Add Topup</button>
      <!-- <button class="btn btn-success col-sm-2 pull-right" id="paylater">Pay Later</button>  -->
      <% if(value<=0) {%>  
      <!-- <button class="btn btn-success col-sm-2 pull-right" id="paylater">Pay Later</button>  -->
      <% }else{ %>
      <%if(includeDueAmount){%>
      <!-- <button class="btn btn-warning col-sm-2 pull-right" id="removeDues">Remove Dues</button>            -->
      <%}else{%>              
      <!-- <button class="btn btn-success col-sm-2 pull-right" id="includeDues">Include Dues</button> -->
      <%}%>
      <% } %> 

      <% } else {%>    
      <button class="btn btn-danger col-sm-2 pull-right smallbox" id="login" data-toggle="tooltip" data-title="Login before you can place an order" data-placement="top"  style="margin-right: 15px;" >Login to checkout</button>
      <% }%>
      <button class="btn btn-warning col-sm-2 pull-right smallbox" data-toggle="tooltip" data-title="Click to update your cart items" data-placement="top"  id="updatecart"  >Update cart</button> 
      <!-- <button class="btn btn-danger col-sm-2 pull-right" id="topUp">topUp</button>  -->

    </div>
    <%}else{%>
    <div style="padding:10px 0px;text-align:center;color:green;font-size:14px;">We will inform when service starts in your zone. Please contact +91 9444949160 for more information.</div>
    <%}%>
      <!-- 
      <div class="pull-right">Total amount</div>
      <div class="pull-right">Total Item</div>
      <button class="btn btn-danger btn-bought pull-left">Checkout now</button> -->
      <div style="clear:both"></div>
    </div>   
  </div>
</div>

</div>
  <script>
    $(function(){
      $('.smallbox').tooltip()
    })  
  </script>