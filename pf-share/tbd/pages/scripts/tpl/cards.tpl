<div class="container">
    <div class="row">
        <div class="col-sm-8 col-sm-offset-2 trip-cards">
            <div class="row trip-info">
                <div class="col-sm-12">
                    <div class="pull-left" style="width:50%;padding: 8px;">
                        Distance: <%= parseFloat(data.distance/1000).toFixed(1) %> km <i class="fa fa-clock-o"  style="padding-left:2%;"></i> <%= parseFloat(data.time*60).toFixed(0) %> min
                    </div>
                    <div class="btn btn-default pull-right" id="sort" style="display: inline;">
                       <span class="hidden-xs"> By Price </span><i class="fa fa-arrow-circle-down sort-arrow" style="padding:0px 8px;"></i>
                    </div>                    
                    <div id="time" class="pull-right" style="display: inline;padding:6px 12px;">
                        <%if (data.day == true) {%>
                            <i class="fa fa-sun-o" style="padding:0px 4px;"></i> Day
                        <%} else {%>
                            <i class="fa fa-moon-o" style="padding:0px 4px;"></i> Night
                        <%}%>
                    </div>
                    <!--<div id="showMap" class="btn btn-default pull-right" style="display: inline;">
                        Show Map
                    </div> -->
                    <div style="clear:both"></div>                 
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 map" id="map" style="height:400px;display:none;border:10px solid #ddd;border-radius:5px;margin:10px 0px;"></div>
            </div>
            <div class="row">
                <div class="col-sm-12 cards"></div>
            </div>
            <div class="disclaimer">
                Disclaimer: Information about Fares Prices listed above are purely indicative. Actual fare will be based on time of travel, actual distance traveled, cab waiting time. Toll & parking charges and any taxes extra as applicable.
            </div>
        </div>
        <div class="col-sm-4"></div>
    </div>
</div>