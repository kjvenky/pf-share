<div class="col-sm-12">
    <div class="row trip-card clearfix">
        <div class="col-sm-4 info">
            <img class="logo pull-left" width="80px" height="35px" src="<%= ride.vehicle.owner.logoURL %>">
            <div class="car-type pull-left">
                <%= ride.vehicle.model %>
            </div>
        </div>
        <div class="col-sm-3 info-details">
                <p>
                    <%= ride.vehicle.seater %> seater<span class="visible-xs">,</span></p>
                <p>₹
                    <%= ride.rate.ratePerKmDay %>/km<span class="visible-xs">,</span></p>
                <p>₹
                    <%= ride.rate.baseDayFare %> for the first
                        <%=ride.rate.baseDayDistance %> km</p>
        </div>
        <div class="col-sm-2 fare-div">
            <div class="fare">
                &#8377; <%=(ride.price).toFixed(0) %>
            </div>
        </div>
        <div class="col-sm-3 coupon-div"><!-- 
            <div class="coupon">
                <h6 style="margin-bottom:3px;margin-top:7px;font-size:9px;">Code</h6>
                OLADIW  (50% off)
                <div class="coupon-dot"></div>            
            </div> -->
        </div>
    </div>
</div>