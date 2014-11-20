<div class="row">
  <a id="closemessage" style="position:absolute;top:0px;right:0px;font-size:16px;background:#333;color:#f7f7f7;padding:5px 15px">x</a>
    <ul id="myTab" class="nav nav-tabs col-sm-10 col-sm-offset-1" role="tablist" style="font-size:12px;margin-top:30px;font-weight:bold;">
      <li <%if(type=="orderHistory") {%> class="active" <%}%> ><a href="#home" role="tab" data-toggle="tab">Order History</a></li>
      <li <%if(type=="transactionHistory") {%> class="active" <%}%> ><a href="#profile" role="tab" data-toggle="tab">Transaction History</a></li>
    </ul>
    <div id="myTabContent" class="tab-content col-sm-10 col-sm-offset-1" style="font-size:12px;margin:20px 60px;">
      <div class="tab-pane fade in active" id="home">
        <%if(_.size(oData)>10){%>
         <div class="alert alert-info">Note: We are displaying only the last 10 orders. Total orders you made: <%= _.size(oData) %></div> 
        <%}%>
      <table class="table table-striped" style="text-align:center">
        <tr>
          <th style="text-align:center">S.No</th>
          <th style="text-align:center">Details</th>
          <th style="text-align:center">Order Amount (in Rs.)</th>
          <th style="text-align:center">Order Status</th>
          <th style="text-align:center">Order Date</th>
        </tr>
        <%if(oData){
          _.each(oData, function(order,iterator){
            if(iterator<10){
            %><tr><td><%= iterator+1 %></td>
            <td><% _.each(order.productsOrderedList,function(Obj){ %>
                <span style="text-transform:capitalize"><%= Obj.product.productName %>- <%= Obj.productBaseUnit.unitValue*(Obj.baseUnitQty+Obj.baseUnitDoubleQty*2+Obj.baseUnitQuadrupleQty*4)%><%= Obj.productBaseUnit.unitName %>,</span> 
              <%})%>
            </td>
            <td><%= order.orderAmount %></td>
            <td><%= order.orderStatus %></td>
            <td><%= order.orderDate %></td>          
            </tr><%
            }})
          }%>
        </table>
      </div>
      <div class="tab-pane fade" id="profile">
                <%if(_.size(tData)>10){%>
         <div class="alert alert-info">Note: We are displaying only the last 10 transactions. Total transactions made: <%= _.size(tData) %></div> 
        <%}%>
                  <table class="table table-striped" style="text-align:center">
        <tr>
          <th style="text-align:center">S.No</th>
          <th style="text-align:center">Transaction Id</th>
          <th style="text-align:center">Amount</th>
          <th style="text-align:center">Status</th>
          <th style="text-align:center">Date</th>
        </tr>
          <%if(tData){
            _.each(tData, function(transaction,iterator){
              if(iterator<10){
              %><tr><td><%= iterator+1 %></td>
              <td><%= transaction.transactionID %></td>
              <td><%= transaction.transactionAmount %></td>
              <td><%= transaction.transactionStatus %></td>
              <td><%= transaction.transactionDate %></td>          
              </tr><%
              }})    
            }%>
        </table>
      </div>
    </div>



          <script>
    $('#myTabs a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    })
    </script>
    </div>
