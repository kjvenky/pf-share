define(
  [ 'jquery', 
  'backbone',
  'underscore',
  'js/admin/utils/messageutils',
  'js/admin/views/aindexView',
  'js/admin/views/ausersView',
  'js/admin/collections/ausersCollection',
  'js/admin/collections/aproductsCollection',
  'js/admin/collections/aproductInventoryCollection',
  'js/admin/collections/acouponsCollection',
  'js/admin/collections/aordersCollection',
  'js/admin/collections/apackingCollection',
  'js/admin/collections/acartoningCollection',
  'js/admin/collections/azonesCollection',
  'js/admin/collections/atransactionsCollection',
  'js/admin/collections/ainventoryRefillRecordCollection',
  'js/admin/collections/aWSRecordCollection',
  'js/admin/views/ausersCollectionView',
  'js/admin/views/aproductsCollectionView', 
  'js/admin/views/aproductInventoryCollectionView', 
  'js/admin/views/acouponsCollectionView',
  'js/admin/views/aordersCollectionView',
  'js/admin/views/apackingCollectionView',
  'js/admin/views/acartoningCollectionView',
  'js/admin/views/azonesCollectionView',
  'js/admin/views/atransactionsCollectionView',
  'js/admin/views/ainventoryRefillRecordCollectionView',
  'js/admin/views/aWSRecordCollectionView',
  'js/admin/views/aProductHistoryView',
  'js/admin/views/aFinanceView',
  'js/admin/views/aeditUserView',
  'js/admin/views/aAddUserView',
  'js/admin/views/aAddOrderView',
  'js/admin/views/aeditProductView',
  'js/admin/views/aAddProductView',
  'js/admin/views/aAddCouponView',
  'js/admin/views/aOrderDashboardView',
  'js/admin/views/aAddFarmerDeliveryRecordView',
  'js/admin/views/aAddWalletView',
  'js/admin/views/aUpdateInventoryView',
  'js/admin/views/aAddWSRecordView',
  'js/admin/models/asessionModel','jquery-cookie/jquery.cookie'],
  function($, Backbone, _, messageUtils, aindexView, ausersView, ausersCollection, aproductsCollection,aproductInventoryCollection,acouponsCollection, aordersCollection, apackingCollection, acartoningCollection, azonesCollection, atransactionsCollection, ainventoryRefillRecordCollection, aWSRecordCollection,
    ausersCollectionView, aproductsCollectionView, aproductInventoryCollectionView,  acouponsCollectionView, aordersCollectionView, apackingCollectionView, acartoningCollectionView, azonesCollectionView, atransactionsCollectionView, ainventoryRefillRecordCollectionView, aWSRecordCollectionView, aProductHistoryView, aFinanceView, aeditUserView, aAddUserView,aAddOrderView, aeditProductView
    ,aAddProductView,aAddCouponView,aOrderDashboardView, aAddFarmerDeliveryRecordView, aAddWalletView, aUpdateInventoryView, aAddWSRecordView, asessionModel) {

    var adminRouter = Backbone.Router.extend({
      views : {},
      models : {},
      session:  new asessionModel.asessionModel(),
      collections : {},
            routes : { // This is going to grow large.Oops!
              "" : "aindex",
              "transactions":"transactions",
              "users" : "users", // All the user routes
              "users/farmers" : "farmers", 
              "users/add" : "addUser",
              "users/roles" : "roles",
              "users/edit/:name" : "editUser", // Make id = pkey
              "users/delete/:name" : "deleteUser", // Make id = pkey
              "products" : "products",
              "products/add" : "addProduct",
              "products/edit/:name" : "editProduct",
              "products/delete/:name" : "deleteProduct",
              "products/history" : "productHistory",
              "orders" : "orders",
              "orders/dashboard" : "oDashboard",
              "freshorders": "freshorders",
              "orders/add" : "addOrder",
              "orders/placeOrder": "placeOrder",
              "orders/packingtable" : "packingTable",
              "orders/cartoningtable" : "cartoningTable",
              "orders/edit/:id" : "editOrder",
              "allorders" : "allorders",
              "transactions" : "transactions",
              "transactions/addWallet": "addWallet",
              "inventory" : "inventory",
              "inventory/update" : "updateInventory",
              "inventory/products" : "productInventory",
              "inventory/farmerdeliveryRecords" : "farmerdeliveryRecords",
              "inventory/addDeliveryRecord" : "addDeliveryRecord",
              "wholesale/orders" : "wsOrders",
              "wholesale/add" : "wsAdd",
              "settings" : "settings",
              "coupons": "coupons",
              "finances": "finances",
              "zones": "zones",
              "coupons/add": "addCoupon",
              "logout":"logout"
            },
            finances:function(){
              $("#data").html(new aFinanceView.aFinanceView().render().el)
            },
            productHistory:function(){
              $("#data").html(new aProductHistoryView.aProductHistoryView().render().el)
            },
            wsAdd:function(){
              var form = new aAddWSRecordView.aAddWSRecordView({}).form
              $("#data").html(form.render().el)
            },
            wsOrders:function(){
              this.collections.wsRecords = new aWSRecordCollection.aWSRecordCollection();             
              this.collections.wsRecords.fetch({
                async: false
              })
              if(!this.collections.wsRecords.length){
                messageUtils.topMessages('Cartoning table is empty!','topFailure',5000)
              }else{
              this.views.wsRecords = $("#data").html(new aWSRecordCollectionView.aWSRecordCollectionView({
                collection : this.collections.wsRecords,
                title: "Farmer Delivery Records History",
                headings:["S.No",         
                "productName",                                  
                "qtySent",
                "qtySold",
                "sellingPrice",
                ],
                mapping:["S.No",
                "Product Name",                               
                "Qty Sent",
                "Qty Sold",
                "Selling Price"
                ],
                type:"wsrecordstable"
              }).render().el)
              }
            },
            updateInventory:function(){
              $('#data').html(new aUpdateInventoryView.aUpdateInventoryView().render().el)
            },
            addWallet:function(){
              $('#data').html(new aAddWalletView.aAddWalletView().render().el)
            },
            initialize : function() {
            },
            addDeliveryRecord:function(){
              $('#data').html(new aAddFarmerDeliveryRecordView.aAddFarmerDeliveryRecordView().render().el)
            },
            addProduct : function(name) { // Get name
              var form = new aAddProductView.aAddProductView({}).form
              $("#data").html(form.render().el)
            },
            farmerdeliveryRecords:function(){
              this.collections.deliveryRecords = new ainventoryRefillRecordCollection.ainventoryRefillRecordCollection();             
              this.collections.deliveryRecords.fetch({
                async: false
              })
              if(!this.collections.deliveryRecords.length){
                messageUtils.topMessages('Cartoning table is empty!','topFailure',5000)
              }else{
              this.views.deliveryRecords = $("#data").html(new ainventoryRefillRecordCollectionView.ainventoryRefillRecordCollectionView({
                collection : this.collections.deliveryRecords,
                title: "Farmer Delivery Records History",
                headings:["S.No",
                "username",               
                "productName",                                
                "primaryMobile",
                "buyingPrice",
                "quantityDelivered",
                "quantityAccepted",
                "deliveryDate"
                ],
                mapping:["S.No",
                "User Name",                
                "Product Name",                               
                "Primary Mobile",
                "Buying Price",
                "Quantity Delivered",
                "Quantity Accepted",
                "Delivery Date"
                ],
                type:"farmerdeliverytable"
              }).render().el)
              }
            },
            placeOrder:function(){
              $('#data').html(new aAddOrderView.aAddOrderView().render().el)
            },
            logout: function(){
              $.removeCookie('admin_logged');
              window.location.href = contextUrl + "/admin/"
            },
            oDashboard:function(){
              $("#data").html(new aOrderDashboardView.aOrderDashboardView({
              }).render().el)
            },
            cartoningTable:function(){
              this.collections.cartoning = new acartoningCollection.acartoningCollection();             
              this.collections.cartoning.fetch({
                async: false
              })
              if(!this.collections.cartoning.length){
                messageUtils.topMessages('Cartoning table is empty!','topFailure',5000)
              }else{
              this.views.packing = $("#data").html(new acartoningCollectionView.acartoningCollectionView({
                collection : this.collections.cartoning,
                title: "Current Cartoning Table",
                headings:["S.No",
                "productName",                
                // "zoneName",
                "baseUnitQtyToCarton",
                "baseDoubleUnitQtyToCarton",                
                "baseQuadrupleUnitQtyToCarton",                 
                "totalQtyToCarton",             
                "baseUnitQtyCartoning",
                "baseDoubleUnitQtyCartoning",
                "baseQuadrupleUnitQtyCartoning",
                "totalQtyCartoning"
                ],
                mapping:["S.No",
                "Product Name", 
                // "Zone Name",  
                "BU",
                "2x",
                "4x",
                "Qty To Carton",
                "BU(Cartoning)",
                "2x(Cartoning)",
                "4x(Cartoning)",
                "Qty Cartoning"
                ],
                type:"cartoningtable"
              }).render().el)
              }
            },
            packingTable:function(){
              this.collections.packing = new apackingCollection.apackingCollection();             
              this.collections.packing.fetch({
                async: false
              })
              if(!this.collections.packing.length){
                messageUtils.topMessages('Packing table is empty!','topFailure',5000)
              }else{
              this.views.packing = $("#data").html(new apackingCollectionView.apackingCollectionView({
                collection : this.collections.packing,
                title: "Current Packing Table",
                headings:["S.No",
                "productName",                
                "unitValue",
                "unitName",                 
                "baseUnitQtyPacking",
                "baseDoubleUnitQtyPacking",               
                "baseQuadrupleUnitQtyPacking",                  
                "totalQtyPacking",              
                "baseUnitQtyReady",
                "baseDoubleUnitQtyReady",
                "baseQuadrupleUnitQtyReady",
                "totalQtyReady"
                ],
                mapping:["S.No",
                "Product Name", 
                "Unit Value",
                "Unit Name",  
                "BaseUnit",
                "2x",
                "4x",
                "Qty Packing",
                "BaseUnit(Ready)",
                "2x(Ready)",
                "4x(Ready)",
                "Qty Ready"
                ],
                type:"packingtable"
              }).render().el)
            }
            },
            productInventory:function(){
              this.collections.productInventory = new aproductInventoryCollection.aproductInventoryCollection();              
              this.collections.productInventory.fetch({
                async: false
              })
              if(!this.collections.productInventory.length){
                messageUtils.topMessages('Product Inventory is empty!','topFailure',5000)
              }else{
              this.views.productInventory = $("#data").html(new aproductInventoryCollectionView.aproductInventoryCollectionView({
                collection : this.collections.productInventory,
                title: "Inventory table",
                headings:["S.No",
                "productName",                
                "qtyBooked",                
                "qtyAvailable",               
                "unitName",
                // "buyingPrice",                 
                "sellingPrice"
                ],
                mapping:["S.No",
                "Product Name",               
                "Qty Booked",
                "Qty Available",
                "Unit Name",
                // "Buying Price",                  
                "Selling Price"
                ],
                type:"inventoryproductstable"
              }).render().el)
            }
            },
            freshorders: function(){ //=07:07:2014+000:00:00
              var d = new Date()
              var dString = d.getDate()+":"+(d.getMonth()+1)+":"+d.getFullYear()+"+"+d.getSeconds()+":"+d.getMinutes()+":"+d.getHours()
              this.collections.forders = new aordersCollection.aordersCollection({url: contextUrl2+'/admin/orders/process_orders/getFreshOrders?latestTime='+dString});
              this.collections.forders.fetch({
                async : false
              }) 
              this.views.orders = $("#data").html(new aordersCollectionView.aordersCollectionView({
                collection : this.collections.forders,
                title : "Fresh Order list",
                headings : ["S.No",
                "firstname",
                // "zoneName",
                "primaryMobile",
                // "secondaryPhone",
                "address1",
                "address2",
                "address3",
                "address4",
                "details",      
                "orderStatus",
                "orderAmount",
                "creationTime"
                ],
                mapping:["S.No",
                "First Name",
                // "zoneName",
                "primaryMobile",
                // "secondaryPhone",
                "address1",
                "address2",
                "address3",
                "address4",
                "details",      
                "orderStatus",
                "Amount",
                "creationTime"
                ],  
                type: "freshorders"         
              }).render().el);  
            },
            coupons: function(){
              this.collections.coupons = new acouponsCollection.acouponsCollection();
              this.collections.coupons.fetch({
                async : false
              }) 
              this.views.coupons = $("#data").html(new acouponsCollectionView.acouponsCollectionView(
              {
                collection : this.collections.coupons,
                title : "Coupons list",
                headings : ["S.No",
                "couponCode",
                "hitCounter",
                "startDate",
                "endDate",
                "discount",
                "mediaName"
                ],
                mapping : ["S.No",
                "Coupon Code",
                "Hit Counter",
                "Start Date",
                "End Date",
                "Discount",
                "Media Name"
                ],
              }).render().el);
            },
            addCoupon: function(){
              var form = new aAddCouponView.aAddCouponView({}).form
              $("#data").html(form.render().el)
            },
            zones: function(){
              this.collections.zones = new azonesCollection.azonesCollection();
              this.collections.zones.fetch({
                async : false
              }) 
              this.views.zones = $("#data").html(new azonesCollectionView.azonesCollectionView(
              {
                collection : this.collections.zones,
                title : "Zones list",
                headings : ["S.No",
                "zoneName",
                ],
                mapping : ["S.No",
                "Zone name"
                ],
              }).render().el);
            },

            aindex : function() {
              new aindexView.aindexView()
              this.views.aindex = new aindexView.aindexView().render();             
            },

            users : function() {

              this.collections.users = new ausersCollection.ausersCollection({url: contextUrl2+'/admin/persons/getAllUsers'});
              this.collections.users.fetch({
                async : false
              }) 
              this.views.users = $("#data").html(new ausersCollectionView.ausersCollectionView(
              {
                collection : this.collections.users,
                title : "Users list",
                headings : ["S.No",
                "username",
                // "FirstName",
                // "lastname",
                "emailID",
                // "PersonType",
                // "zoneName",
                "address1",
                "address2",
                "address3",
                "address4",
                // "address5",
                "primaryMobile",
                "walletAmount",
                "couponNames"
                ],
                mapping:["S.No",
                "User Name",  
                // "First Name",
                "Email ID", 
                // "Person Type",
                // "Zone",
                "Door no.",
                "Street",
                "Locality",
                "Pin Code",
                "Mobile No.",
                "Wallet Amount.",
                "Media Code",
                ],
                type:"userstable"
              }).render().el);
            },
            farmers : function() {
              this.collections.farmers = new ausersCollection.ausersCollection({url: contextUrl2+'/admin/persons/getAllFarmers'});
              this.collections.farmers.fetch({
                async : false
              }) 
              this.views.farmers = $("#data").html(new ausersCollectionView.ausersCollectionView(
              {
                collection : this.collections.farmers,
                title : "Farmers list",
                headings : ["S.No",
                "username",
                "FirstName",
                "lastname",
                "emailID",
                // "PersonType",
                // "zoneName",
                "address1",
                "address2",
                "address3",
                "address4",
                // "address5",
                "primaryMobile",
                // "walletAmount",
                // "couponNames"
                ],
                mapping:["S.No",
                "User Name",  
                "First Name",
                "Last Name",
                "Email ID", 
                // "Person Type",
                // "Zone",
                "Door no.",
                "Street",
                "Locality",
                "Pin Code",
                "Mobile No.",
                // "Wallet Amount.",
                // "Media Code",
                ],
                type:"userstable"
              }).render().el);
            },
            transactions : function() {
              this.collections.transactions = new atransactionsCollection.atransactionsCollection();
              this.collections.transactions.fetch({
                async : false
              }) 
              this.views.transactions = $("#data").html(new atransactionsCollectionView.atransactionsCollectionView(
              { 
                collection : this.collections.transactions,
                title : "Transactions list",
                headings : ["S.No",   
                "firstName",
                "lastName",
                "phoneNumber",
                "transactionID",
                "transactionDate",
                "transactionAmount",
                "transactionStatus",
                "transactionTypeName"],
                mapping:["S.No",    
                "First Name",
                "Last Name",
                "Phone Number",
                "Transaction ID",
                "Transaction Date",
                "Transaction Amount",
                "Transaction Status",
                "Transaction Type Name"
                ],
                searchField: "Phone Number",
                type:"transactionstable"
              }).render().el);
            },
            // Move it away from here?
            deleteUser: function(name){
              $.ajax({
                type:'POST',
                url: 'admin/persons/deletePerson?username'+name,
                success:function(message){
                  $("#form-messages").html('<div class="alert alert-success">'+message+'</div>')
                  $('.form-horizontal').slideUp('slow').html('');
                  window.setTimeout(function() {
                    $('#form-messages').slideUp(function() {
                      $('#form-messages').html()
                    });}, 5000);
                }
              })
            },

            addUser : function() {
              var form = new aAddUserView.aAddUserView({}).form
              $("#data").html(form.render().el)
            },

            editUser : function(name) { // Get name
              var form = new aeditUserView.aeditUserView({name:name}).form
              $("#data").html(form.render().el)

            },

            roles : function() {
              $("#data").html()
            },

            products : function() {
              this.collections.products = new aproductsCollection.aproductsCollection();
              this.collections.products.fetch({
                async : false
              }) 
              this.views.products = $("#data").html(
                new aproductsCollectionView.aproductsCollectionView(
                {
                  collection : this.collections.products,
                  title : "Product list",
                  headings : ["S.No", 
                  "productName",                
                  "unitName",
                  "unitValue",
                  "buyingPrice",                
                  "sellingPrice",
                  "display",
                  "grade",
                  "imgUrl",
                  ],
                  mapping : ["S.No",  
                  "Product Name",               
                  "Unit Name",
                  "Unit Value",
                  "Buying Price",               
                  "Selling Price",
                  "Display",
                  "Grade",
                  "Img Url",
                  ],
                  type:"productstable"
                }).render().el);
            },

            editProduct : function(name) { // Get name
              var form = new aeditProductView.aeditProductView({name:name}).form
              $("#data").html(form.render().el)
            },

            addProduct : function(name) { // Get name
              var form = new aAddProductView.aAddProductView({}).form
              $("#data").html(form.render().el)
            },

            orders : function() {
              this.collections.orders = new aordersCollection.aordersCollection({url: contextUrl2+'/admin/orders/process_orders/getOpenOrders'});
              this.collections.orders.fetch({async : false});
              this.views.orders = $("#data").html(new aordersCollectionView.aordersCollectionView({
                  collection : this.collections.orders,
                  title : "Open orders table",
                  headings : ["S.No",
                  "firstname",
                  // "zoneName",
                  "primaryMobile",
                  // "secondaryPhone",
                  "address1",
                  "address2",
                  "address3",
                  "address4",
                  "details",  
                  "orderAmount",                      
                  "orderStatus",
                  "creationTime",

                  ],
                  mapping:["S.No",
                  "First Name",
                  // "Zone Name",
                  "Primary Mobile",
                  // "Secondary Phone",
                  "Address1",
                  "Address2",
                  "Address3",
                  "Address4",
                  "Details",      
                  "Order Amount",
                  "Order Status",
                  "Creation Time"
                  ],
                  type: "openorders"
                }).render().el);
            },
            allorders : function() {
              this.collections.allorders = new aordersCollection.aordersCollection({url: contextUrl2+'/admin/orders/process_orders/getAllOrders'});
              this.collections.allorders.fetch({
                async : false
              }) 
              console.log(this.collections.allorders)
              this.views.orders = $("#data").html(
                new aordersCollectionView.aordersCollectionView(
                {
                  collection : this.collections.allorders,
                  title : "All Order list",
                  headings : ["S.No",
                  "firstname",
                  // "zoneName",
                  "primaryMobile",
                  // "secondaryPhone",
                  "address1",
                  "address3",
                  "address4",
                  // "details", 
                  "orderAmount",                      
                  "orderStatus",
                  "creationTime",

                  ],
                  mapping:["S.No",
                  "First Name",
                  // "Zone Name",
                  "Primary Mobile",
                  // "Secondary Phone",
                  "Address1",
                  "Address2",
                  "Address3",
                  "Address4",
                  // "Details",     
                  "Order Amount",
                  "Order Status",
                  "Creation Time"
                  ],
                  type: "openorders"
                }).render().el);
            },
            inventory : function() {

            },
            
            settings : function() {

            },

          })
      return { // Returns all the publicly functions from this module
        adminRouter : adminRouter
      }
    });