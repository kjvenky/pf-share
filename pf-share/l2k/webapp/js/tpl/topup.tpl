<div class="row">
	<a id="closemessage" style="position:absolute;top:0px;right:0px;font-size:16px;background:#333;color:#f7f7f7;padding:5px 15px">x</a>
	<%if(type=="onlyTopup"){%>
	<div class="panel panel-default col-sm-10 col-sm-offset-1" style="padding:0px;line-height:24px;margin-top:30px; font-size:12px">
		<div class="panel-heading heading">
			<b>Topup Form</b>
		</div>
		<div class="panel-body" style="padding:0px 0px 20px 0px;font-size:12px;">
			<form class="form-horizontal" role="form">
				<div class="form-group" style="display:inline-flex">
					<label for="inputEmail3" class="col-sm-6 control-label">Enter Topup Amount</label>
					<div class="col-sm-6">
						<input type="text" class="form-control" id="topupValue" placeholder="Rs.">
					</div>
				</div>
				<div class="form-group" style="display:inline-flex">
					<div class="col-sm-offset-3 col-sm-10">
						<button id="submitTopup" class="btn btn-success">Submit</button>
					</div>
				</div>
				</form>
			</div>
		</div>

		<%}else{%>
		<form class="form-inline" role="form" style="display:inline-flex">
			<div class="form-group">
				<label class="sr-	only" for="exampleInputEmail2">Enter Topup value</label>
				<input type="text" class="form-control" id="topupValue" placeholder="Rs.">
			</div>
		</form>
		<%}%>
	</div>