<div class="row">
  <a id="closemessage" style="position:absolute;top:0px;right:0px;font-size:16px;background:#333;color:#f7f7f7;padding:5px 15px">x</a>
  <div id="changemessages"></div>
  <ul id="myTab" class="nav nav-tabs col-sm-8 col-sm-offset-1" role="tables" style="font-size:12px;margin-top:30px;font-weight:bold;">
    <li class="active"><a href="#profile" role="tab" data-toggle="tab">Settings</a></li>
    <li><a href="#password" role="tab" data-toggle="tab">Change password</a></li>
<!--     <li><a href="#orders" role="tab" data-toggle="tab">Previous orders
      <% if(previousorders) {%>
          (<%= previousorders.length %>)
      <% } %>
    </a></li> -->
  </ul>
  <div id="myTabContent" class="tab-content col-sm-8 col-sm-offset-1" style="font-size:12px;margin:20px 60px;">
    <div class="tab-pane fade in active" id="profile">
      <p><form class="form-horizontal" id="updateForm" role="form"  style="margin-top:20px">
        <div class="form-group">
          <label for="inputEmail3" class="col-sm-3 control-label">Username<span style="color:red"> *</span></label>
          <div class="col-sm-8">
            <input type="username" name="username" readonly id="username" class="form-control" id="inputEmail3" value="<%= data.username %>" placeholder="Username">
          </div>
        </div>        
        <div class="form-group">
          <label for="inputEmail3" class="col-sm-3 control-label">Email id<span style="color:red"> *</span></label>
          <div class="col-sm-8">
            <input type="email" name="emailID" id="emailID" readonly  class="form-control" id="inputEmail3" value="<%= data.emailID %>" placeholder="Email">
          </div>
        </div>
        <div class="form-group">
          <label for="inputEmail3" class="col-sm-3 control-label">First name<span style="color:red"> *</span></label>
          <div class="col-sm-8">
            <input type="text" name="firstName" id="firstName" class="form-control" id="inputEmail3" value="<%= data.personInfo.firstName %>" placeholder="First Name">
          </div>
        </div>
                <div class="form-group">
          <label for="inputEmail3" class="col-sm-3 control-label">Last name</label>
          <div class="col-sm-8">
            <input type="text" name="lastName" id="lastName" class="form-control" id="inputEmail3" value="<%= data.personInfo.lastName %>" placeholder="Last Name">
          </div>
        </div>
        <div class="form-group">
          <label for="inputEmail3" class="col-sm-3 control-label">Door no<span style="color:red"> *</span></label>
          <div class="col-sm-8">
            <input type="text" name="address1" id="address1" class="form-control" id="inputEmail3" value="<%= data.personInfo.address1 %>" placeholder="Door no.">
          </div>
        </div>
                <div class="form-group">
          <label for="inputEmail3" class="col-sm-3 control-label">Street<span style="color:red"> *</span></label>
          <div class="col-sm-8">
            <input type="text" name="address2" id="address2" class="form-control" id="inputEmail3" value="<%= data.personInfo.address2 %>" placeholder="Streetname">
          </div>
        </div>
                <div class="form-group">
          <label for="inputEmail3" class="col-sm-3 control-label">Locality<span style="color:red"> *</span></label>
          <div class="col-sm-8">
            <input type="text" name="address3" id="address3" class="form-control" id="inputEmail3" value="<%= data.personInfo.address3 %>" placeholder="Locality">
          </div>
        </div>
                <div class="form-group">
          <label for="inputEmail3" class="col-sm-3 control-label">Pin code<span style="color:red"> *</span></label>
          <div class="col-sm-8">
            <input type="text" name="address4"  id="address4" class="form-control" id="inputEmail3" value="<%= data.personInfo.address4 %>" placeholder="Pin code">
          </div>
        </div>
<!--       <div class="form-group">
   <label class="col-sm-3 control-label">Zone<span style="color:red"> *</span></label>
    <div class="col-sm-8">
      <select type="text" class="form-control" id="zoneNameMain"  name="zoneNameMain">
        <option value="default">Choose Zone</option>
      <option value="Grand Trunk Road">Grand Trunk Road</option>
      <option value="ECR">ECR</option>
      <option value="OMR">OMR</option>      
      <option value="City">City</option>
      <option value="Others">Others</option>
      </select>
    </div>
  </div> -->
<!--           <div class="form-group">
    <label class="col-sm-3 control-label">Sub Zone<span style="color:red"> *</span></label>
    <div class="col-sm-8">
      <select type="text" class="form-control" id="zoneName" name="zoneName">
        <option value="default" id="sub">Choose Subzone</option>
      </select>
    </div>
  </div> -->
                  <div class="form-group">
          <label for="inputEmail3" class="col-sm-3 control-label">Primary Number<span style="color:red"> *</span></label>
          <div class="col-sm-8">
            <input type="text" name="primaryMobile" readonly id="primaryMobile" class="form-control" id="inputEmail3" value="<%= data.personInfo.primaryMobile %>" placeholder="Primary number">
          </div>
        </div>
<!--                         <div class="form-group">
          <label for="inputEmail3" class="col-sm-3 control-label">Secondary Number</label>
          <div class="col-sm-8">
            <input type="text" name="secondaryPhone" id="secondaryPhone"  class="form-control" id="inputEmail3" value="<%= data.personInfo.secondaryPhone %>" placeholder="Secondary number">
          </div>
        </div> -->
                        <div class="form-group">
          <label for="inputEmail3" class="col-sm-3 control-label">Landline number</label>
          <div class="col-sm-8">
            <input type="text" name="landLine" id="landLine" class="form-control" id="inputEmail3" value="<%= data.personInfo.landline %>" placeholder="Landline number">
          </div>
          <!--Hidden fileds-->
          <input type="hidden" name="secondaryPhone" value="<%= data.personInfo.secondaryPhone %>" >
          <input type="hidden" name="personTypeName"  value="<%= data.personType.personType %>" >
          <input type="hidden" name="bankAccountNumber"  value="<%= data.personInfo.bankAccountNumber %>">
          <input type="hidden" name="bankName" value="<%= data.personInfo.bankName %>" >
          <input type="hidden" name="bankBranch" value="<%= data.personInfo.bankBranch %>">
          <input type="hidden" name="address5" value="<%= data.personInfo.address5 %>">
        </div>
        <div class="form-group">
          <div class="col-sm-offset-3 col-sm-8">
            <button type="submit" id="detailsupdate" class="btn btn-danger">Update details</button>
          </div>
        </div>
      </form></p>
    </div>

    <div class="tab-pane fade" id="password">
     <form class="form-horizontal" role="form" style="margin-top:20px">
      <div class="form-group">
        <label for="inputEmail3" class="col-sm-3 control-label">Current password</label>
        <div class="col-sm-8">
          <input type="password" id="currentPass" class="form-control" id="inputEmail3" placeholder="Current pasword">
        </div>
      </div>
      <div class="form-group">
        <label for="inputPassword3" class="col-sm-3 control-label">New Password</label>
        <div class="col-sm-8">
          <input type="password" id="newPass" class="form-control" id="inputPassword3" placeholder="New Password">
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-3 col-sm-8">
          <button type="submit" id="passwordchange" class="btn btn-danger">Change password</button>
        </div>
      </div>
    </form>
    <div>
     </div> 
    </div>
<!--     <div class="tab-pane fade" id="orders">

    <table class="table table-hover" style="text-align:center;">
      <thead>
        <tr> 
          <th   style="text-align:center;">#S.no</th>
          <th   style="text-align:center;">Unique Id</th>          
          <th   style="text-align:center;">Order Amount</th>
          <!-- <th   style="text-align:center;">Order Status</th>          
          <th   style="text-align:center;">Payment Status</th>
        </tr>
      </thead>
      <tbody>        

      <%if(previousorders){
        _.each(previousorders, function(order,iterator){
          %><tr><td><%= iterator+1 %></td>
          <td><%= order.transactionID %></td>
          <td><%= order.amount %></td>
          <!-- <td><%= order.status %></td>          
          <td><%if(order.paymentDone){%>Done<%}else{%>Pending<%}%></td>          
          </tr><%
        })
      }%>
      </tbody>
    </table>
    <div>
     </div> 
    </div> -->
    <script>
function subZonerender(value){
  var zones = {
    "Grand Trunk Road": ["Urappakkam","Vandalur","Perungulattur","Tambaram","Tambaram Sanaitorium","Chrompet","Pallavaram","Tirusulam","Minambakkam","Palavanthangal","St Thomas Mount","Guindy","Saidapet"],
    "ECR":["Kottivakkam","Palavakkam","Neelangarai","Injambakkam","Panaiyur","Uthandi","Kanathur","Sirusery"],
    "OMR":["IIT Madras","Adyar","Thiruvanmyur","Perungudi","Kandan CHavadi","Thuraipakkam","Kottivakkam","Muttukaran CHavadi","Karapakkam","Sholinganallur","Semencheri","Kamarajnagar","Navallur","Egattur","Kalipathur","Kannathur","Padur","Sirusery","Kelampakkam","Thiruporur"],
    "City": ["Mambalam"],
    "Others": ["Others"]

  }
  
  // Render the subzone 
  $("#zoneName").children().remove();
  $.each(zones,function(zone){  
    if(zone.trim()===value.trim()){
      $.each(zones[value],function(i){
        var subZone = zones[value][i]
        $("#zoneName").append("<option value='"+subZone+"'>"+subZone+"</option>");
      })
    }})
}

$(function() {
    $("#zoneNameMain").change(function() {
       subZonerender($(this).val())
    });
});
</script>

<!--     <div class="tab-pane fade" id="orders">
        <p>List orders</p>
      </div>  -->
    <script>
    $('#myTab a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    })
    </script>
  </div>