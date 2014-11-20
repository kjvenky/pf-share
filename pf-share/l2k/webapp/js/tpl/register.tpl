<div class="message-form row">
<a id="closemessage" style="position:absolute;top:0px;right:0px;font-size:16px;background:#333;color:#f7f7f7;padding:5px 15px">x</a> 
<div class="panel panel-default col-sm-8 col-sm-offset-2" style="padding:0px;">
<!-- <a id="closemessage" style="position:absolute;top:0px;right:0px;font-size:16px;background:#333;color:#f7f7f7;padding:5px 15px">x</a> -->
  <div class="panel-heading heading">
    Register here
  </div>
  <div class="panel-body">
<div id="servermessages" style="margin: 0px 20px;font-size: 12px;"></div>
<form class="form-horizontal" role="form" id="registerForm">
  <div class="form-group">
    <label for="inputEmail" class="col-sm-4 control-label">User name<span style="color:red"> *</span></label>
    <div class="col-sm-7">
      <input type="text" class="form-control" id="username" name="username" placeholder="Username">
    </div>
  </div>
  <div class="form-group">
    <label for="inputEmail" class="col-sm-4 control-label">Email id<span style="color:red"> *</span></label>
    <div class="col-sm-7">
      <input type="email" class="form-control" id="emailID" name="emailID" placeholder="Email">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-4 control-label">Password<span style="color:red"> *</span></label>
    <div class="col-sm-7">
       <input type="password" class="form-control" id="password" name="password" placeholder="Password">
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-4 control-label">First name<span style="color:red"> *</span></label>
    <div class="col-sm-7">
      <input type="text" class="form-control" id="firstName" name="firstName" placeholder="First name">
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-4 control-label">Last name</label>
    <div class="col-sm-7">
      <input type="text" class="form-control" id="lasTName" name="lastName" placeholder="Last name">
    </div>
  </div>
    <div class="form-group">
    <label class="col-sm-4 control-label">Door no<span style="color:red"> *</span></label>
    <div class="col-sm-7">
      <input type="text" class="form-control" id="address1" name="address1" placeholder="Door no">
    </div>
  </div>
    <div class="form-group">
    <label class="col-sm-4 control-label">Street<span style="color:red"> *</span></label>
    <div class="col-sm-7">
      <input type="text" class="form-control" id="address2" name="address2" placeholder="Street name">
    </div>
  </div>
      <div class="form-group">
    <label class="col-sm-4 control-label">Locality<span style="color:red"> *</span></label>
    <div class="col-sm-7">
      <input type="text" class="form-control" id="address3" name="address3" placeholder="Locality">
    </div>
  </div>
      <div class="form-group">
    <label class="col-sm-4 control-label">Pin Code<span style="color:red"> *</span></label>
    <div class="col-sm-7">
      <input type="text" class="form-control" id="address4" name="address4" placeholder="Pin Code">
    </div>
  </div>
<!--       <div class="form-group">
   <label class="col-sm-4 control-label">Zone<span style="color:red"> *</span></label>
    <div class="col-sm-7">
      <select type="text" class="form-control" id="zoneNameMain"  name="zoneNameMain">
        <option value="default">Choose Zone</option>
   		<option value="Grand Trunk Road">Grand Trunk Road</option>
   		<option value="ECR">ECR</option>
   		<option value="OMR">OMR</option>   		
   		<option value="City">City</option>
   		<option value="Others">Others</option>
      </select>
    </div>
  </div>
        <div class="form-group">
    <label class="col-sm-4 control-label">Sub Zone<span style="color:red"> *</span></label>
    <div class="col-sm-7">
      <select type="text" class="form-control" id="zoneName" name="zoneName">
        <option value="default" id="sub">Choose Subzone</option>
      </select>
    </div>
  </div> -->
  <div class="form-group">
    <label class="col-sm-4 control-label">Primary number<span style="color:red"> *</span></label>
    <div class="col-sm-7">
      <input type="text" class="form-control" id="primaryMobile" name="primaryMobile" placeholder="Eg. 9562436512">
    </div>
  </div>
    <div class="form-group">
    <label class="col-sm-4 control-label">Secondary number</label>
    <div class="col-sm-7">
      <input type="text" class="form-control" id="secondarYPhone" name="secondaryPhone" placeholder="Eg. 9562436512">
    </div>
  </div>
    <div class="form-group">
    <label class="col-sm-4 control-label">Landline number</label>
    <div class="col-sm-7">
      <input type="text" class="form-control" id="contactNumber" name="landLine" placeholder="Landline number">
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-4 control-label">Media code<span style="color:red"> *</span></label>
    <div class="col-sm-7">
<select type="text" class="form-control" id="couponCode" name="couponCode">
          <option value="default">How did you come to know about us?</option>
      <option value="L2KPH1">Telephone Campaign</option>
      <option value="SMS01">SMS Ad(9444729160)</option>
      <option value="SMS02">SMS Ad(9600032540)</option>       
      <option value="L2KDS1">Distributor</option>
    <option value="L2KNP2">Newspaper Inserts</option>
    <option value="L2KOC1">Other Customers</option>
      <option value="L2KNP1">Newspaper</option>       
      <option value="L2KEM1">Email</option>       
      </select>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-4 col-sm-7 ">
      <button class="btnLogin btn-block" id="submitRegister">Register here</button>
    </div>
  </div>
</form>
  </div>
  
<script>
// function subZonerender(value){
//   // Implement zone based fetch here!
// 	var zones = {
// 		"Grand Trunk Road": ["Urappakkam","Vandalur","Perungulattur","Tambaram","Tambaram Sanaitorium","Chrompet","Pallavaram","Tirusulam","Minambakkam","Palavanthangal","St Thomas Mount","Guindy","Saidapet"],
// 		"ECR":["Kottivakkam","Palavakkam","Neelangarai","Injambakkam","Panaiyur","Uthandi","Kanathur","Sirusery"],
// 		"OMR":["IIT Madras","Adyar","Thiruvanmyur","Perungudi","Kandan CHavadi","Thuraipakkam","Kottivakkam","Muttukaran CHavadi","Karapakkam","Sholinganallur","Semencheri","Kamarajnagar","Navallur","Egattur","Kalipathur","Kannathur","Padur","Sirusery","Kelampakkam","Thiruporur"],
// 		"City": ["Mambalam"],
//     "Others": ["Others"]

// 	}
	
// 	// Render the subzone	
// 	$("#zoneName").children().remove();
// 	$.each(zones,function(zone){	
// 		if(zone.trim()===value.trim()){
// 			$.each(zones[value],function(i){
// 				var subZone = zones[value][i]
// 				$("#zoneName").append("<option value='"+subZone+"'>"+subZone+"</option>");
// 			})
// 		}})
// }

// $(function() {
//     $("#zoneNameMain").change(function() {
//        subZonerender($(this).val())
//     });
// });
</script>
</div>