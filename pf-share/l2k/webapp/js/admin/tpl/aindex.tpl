<div class="content" style="">
	<div id="databack">
		<div id="data" style="font-size: 13px;">
			<div style="padding:40px;">
				<div class="row">
					<div class="col-sm-6 plot-1" style="padding-bottom:40px;">
						<h3 style="text-align:center;font-family:BebasNeue">Order Count History</h3>
					</div>
					<div class="col-sm-6">
						<h3 style="text-align:center;font-family:BebasNeue">Current Inventory Status</h3>
						<div class="plot-2"></div>
						<div class="plot-3"></div>
					</div>
				</div>
				<div class="row" style="margin-bottom:30px;">
					<div class="col-sm-4" style="font-size:36px;background:#f1f1f1;padding:20px;text-align:center;font-family:BebasNeue">
						<div><a href="#freshorders">Fresh Orders - <%= freshOrderCount %></a></div>
					</div>
					<div class="col-sm-4" style="font-size:36px;background:#f1f1f1;padding:20px;text-align:center;font-family:BebasNeue">
						<div><a href="#orders">Open Orders -  <%= openOrderCount %></a></div>
					</div>
					<div class="col-sm-4" style="font-size:36px;background:#f1f1f1;padding:20px;text-align:center;font-family:BebasNeue">
						<div>Delivery Ready - <%= freshOrderCount %></div>
					</div>		
				</div>
				<div class="row">
					<div class="col-sm-4" style="font-size:36px;background:#f1f1f1;padding:20px;text-align:center;font-family:BebasNeue">
						<div><a href="#Users">Total Users - <%= freshOrderCount %></a></div>
					</div>
					<div class="col-sm-4" style="font-size:36px;background:#f1f1f1;padding:20px;text-align:center;font-family:BebasNeue">
						<div><a href="#products">TotalProducts -  <%= openOrderCount %></a></div>
					</div>
					<div class="col-sm-4" style="font-size:36px;background:#f1f1f1;padding:20px;text-align:center;font-family:BebasNeue">
						<div>Total Coupons- <%= freshOrderCount %></div>
					</div>		
				</div>
			</div>
		</div>
		<div style="clear:both"></div>		
	</div>
</div>