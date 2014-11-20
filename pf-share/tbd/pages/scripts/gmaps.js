/*jslint browser: true*/
/*jslint nomen: true*/
/*global require, define, contextUrl*/
// http://techblog.realestate.com.au/loading-google-maps-with-requirejs/
define(['async!http://maps.google.com/maps/api/js?v=3&sensor=false&key=&libraries=places'], function () {
    "use strict";
    return google;
});
