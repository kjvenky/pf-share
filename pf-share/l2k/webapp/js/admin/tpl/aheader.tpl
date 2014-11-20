<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#" style="font-family"><i class="fa fa-leaf"></i>&nbsp;&nbsp;LandtoKitchen Adminstration</a>
        
        </div>
       <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav pull-left">
            <li class=""><a href="#"><i class="fa fa-home"></i></a></li>
          </ul>
          <ul class="nav navbar-nav pull-right">
            <li class=""><a href="#">Hi Administrator!</a></li>
            <li class=""><a href="#logout">Logout</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>
  <div class="amenubar">
  	<ul>
  		<li>
  			<a href="#orders"><i class="fa fa-truck"></i><span>Orders</span></a>
			  	<ul class="submenu" style="display:none;">  
            <li><a href="#orders/dashboard">Dashboard</a></li>		
            <li><a href="#orders/placeOrder">Add Order</a></li>
            <li><a href="#freshorders">Fresh orders</a></li>
            <li><a href="#orders">Open orders</a></li>            
            <li><a href="#orders/packingtable">Packingtable</a></li><!-- No so important now -->
            <li><a href="#orders/cartoningtable">Cartoningtable</a></li>
            <li><a href="#orders/cartoningtable">Order Search</a></li>
            <li><a href="#allorders">All orders</a></li>                        
            <li><a href="#wholesale/orders">Wholesale Records</a></li>                        
            <li><a href="#wholesale/add">Add Wholesale record</a></li>               
  				</ul>  		
  		</li>		
  		<li><a href="#products"><i class="fa fa-tags"></i><span>Products</span></a>
           <ul class="submenu" style="display:none;">
            <li><a href="#products">List products</a></li>            
            <li><a href="#products/add">Add new product</a></li> 
            <li><a href="#products/history">Product Price History</a></li> 
          </ul>
      </li>
       <li><a href="#users"><i class="fa fa-user"></i><span>Users</span></a>
          <ul class="submenu" style="display:none;">
             <li><a href="#users/report">User Report</a></li>  
            <li><a href="#users">List all users</a></li>            
            <li><a href="#users/farmers">List all Farmers</a></li>            
            <li><a href="#users/add">Add new user</a></li>  
          </ul>
      </li> 
 
        <li><a href="#transactions"><i class="fa fa-exchange"></i><span>Transactions</span></a>
            <ul class="submenu" style="display:none;">
              <li><a href="#transactions">List transactions</a></li>            
              <li><a href="">Add transaction</a></li>            
              <li><a href="#transactions/addWallet">Add wallet amount</a></li>            
            </ul>   
        </li>
        <li><a href="#inventory"><i class="fa fa-navicon"></i><span>Inventory</span></a>
            <ul class="submenu" style="display:none;">
              <li><a href="#inventory/products">Inventory</a></li>            
              <li><a href="#inventory/update">Update Inventory</a></li>            
              <li><a href="#inventory/farmerdeliveryRecords">Farmer Delivery History</a></li>            
              <li><a href="#inventory/addDeliveryRecord">Add Farmer Delivery Record</a></li>            
            </ul>   
        </li>
<!--   		<li><a href="#inventory"><i class="fa fa-reorder"></i><span>Reports</span></a>
          <ul class="submenu" style="display:none;">
            <li><a href="#users">List all users</a></li>            
            <li><a href="#users/add">Add a new user</a></li>            
            <li><a href="#users/edit/qinirisej">Edit User</a></li>
          </ul></li> -->
      <li><a href="#coupons"><i class="fa fa-barcode"></i><span>Coupons</span></a>
          <ul class="submenu" style="display:none;">
            <li><a href="#coupons">List coupons</a></li>       
            <!-- <li><a href="#coupons/add">Add new coupons</a></li>        -->
          </ul>
      </li>       
      <li><a href="#finances"><i class="fa fa-rupee"></i><span>Finance</span></a>
          <ul class="submenu" style="display:none;">
            <li><a href="#finances">Finance Dashboard</a></li>       
            <!-- <li><a href="#coupons/add">Add new coupons</a></li>        -->
          </ul>
      </li> 

<!--       <li><a href="#zones"><i class="fa fa-map-marker"></i><span>Zones</span></a>
          <ul class="submenu" style="display:none;">
            <li><a href="#zones">List all zones</a></li>       
            <!-- <li><a href="#zones/add">Add new zones</a></li>       
          </ul>
      </li>    -->
<!--             <li><a href="#inventory"><i class="fa fa-reorder"></i><span>Inventory</span></a>
          <ul class="submenu" style="display:none;">
            <li><a href="#inventory">Inventory Status</a></li>      
          </ul></li> -->
<!--      <li><a href="#zones"><i class="fa fa-wrench"></i><span>SMS Transactions</span></a>
          <ul class="submenu" style="display:none;">
            <li><a href="#users">Dashboard</a></li>       
            <li><a href="#users">Add new zones</a></li>       
          </ul>
      </li>      -->    
<!--   		<li><a href="#settings"><i class="fa fa-wrench"></i><span>Settings</span></a>
          <ul class="submenu" style="display:none;">
            <li><a href="#users">Personal settings</a></li>       
          </ul>
        </li> --> 
              <!-- <li><a href="#logout"><i class="fa fa-user"></i><span>Logout</span></a> -->
      </li> 		
  	</ul>
  	
  	<!-- Script for menubar to open and close on hover -->
  	<script>
  		$('.amenubar>ul>li').hover(function(){
  			$(this).children('.submenu').css('display','block')
  		},
  		function(){
  			$(this).children('.submenu').css('display','none')	
  		});
  	</script> 
  </div>