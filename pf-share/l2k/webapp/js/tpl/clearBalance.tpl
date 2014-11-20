<div class="row">
	<a id="closemessage" style="position:absolute;top:0px;right:0px;font-size:16px;background:#333;color:#f7f7f7;padding:5px 15px">x</a>

	<div class="panel panel-default col-sm-10 col-sm-offset-1" style="padding:0px;line-height:24px;margin-top:30px; font-size:12px">
		<div class="panel-heading heading">
			<b>Topup Form</b>
		</div>
		<div class="panel-body" style="padding:0px 0px 20px 0px;font-size:12px;">
			<form class="form-horizontal" role="form">
				<div class="form-group" style="display:inline-flex">
					<label for="inputEmail3" class="col-sm-6 control-label">Balance Amount</label>
					<div class="col-sm-6">
						<input type="text" class="form-control" id="balanceValue" placeholder="Rs." readonly value="&#8377; <%= balanceAmount %>">
					</div>
				</div>
				<div class="form-group" style="display:inline-flex">
					<div class="col-sm-offset-3 col-sm-10">
						<button id="submitClearBalance" class="btn btn-danger">Clear Balance</button>
					</div>
				</div>
				</form>
			</div>
		</div>


	</div>