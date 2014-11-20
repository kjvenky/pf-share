<button class="login pull-right" id="logout">Logout</button>
<button class="login pull-right" id="uSettings">Settings</button>
<div class="dropdown login pull-right">
        <button id="drop4" role="button" data-toggle="dropdown" href="#">History <span class="caret"></span></button>
        <ul id="menu1" class="dropdown-menu" role="menu" aria-labelledby="drop4"  style="font-size:12px;">
          <li role="presentation"><a role="menuitem" tabindex="-1" id="transactionHistory">Transactions history</a></li>
          <li role="presentation"><a role="menuitem" tabindex="-1" id="orderHistory">Order History</a></li>
        </ul>
</div>
<div class="dropdown login pull-right">
        <button id="drop4" role="button" <%if(walletAmount<0) {%> style="background:#C62D1F" <%}else{%> style="background:#47A447"<%}%> data-toggle="dropdown" href="#">Wallet: &#8377; <%= walletAmount %><span class="caret"></span></button>
        <ul id="menu1" class="dropdown-menu" role="menu" aria-labelledby="drop4"  style="font-size:12px;">
         <li role="presentation"><a role="menuitem" tabindex="-1" id="topUp">Top up wallet</a></li>
         <%if(walletAmount<0) {%> <li role="presentation"><a role="menuitem" tabindex="-1" id="clearBalance">Clear Balance</a></li><%}%>
        </ul>
</div>
<div class="pull-right" style="padding-right:10px;font-size:12px;padding:10px 20px 10px 40px;">Welcome <%= username %>!</div>
