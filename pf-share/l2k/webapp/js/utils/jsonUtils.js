define(['jquery', 'backbone', 'underscore'], function ($, Backbone, _) {
    "use strict";

    // Private function
    var _flatJson = function(data, _flatData){
            var that = this;
            var _flatData = _flatData || {};
            _.each(_.keys(data), function (val) {
                if (!_.isObject(data[val])) {
                    if (data[val] !== null) {
                    _flatData[val] = data[val].toString().toLowerCase() // Useful for search
                }
                else {
                    _flatData[val] = data[val]
                }
            }
            else {
                that._flatJson(data[val], _flatData) // Look deeper
            }
        })  
        return _flatData
    };

    // Util to convert json into flat format
    // If data is list or array flattens all the elements
    var flatJSON = function (data, flatData) {        
        var that = this;
        var flatData=[];
        if(_.isArray(data)){ // For converting arrays
            _.each(data,function(model){
               flatData.push(that._flatJson(model.attributes)) // Makes it specific to backbone
            })
        }else{ // Single data
            flatData = that._flatJson(data)
        }
        return flatData
    };


    // Find the value of key exists
    var findKeyValue = function (key, data, found, value) {
        var that = this;
        value = value || undefined;
        found = found || false
        _.each(_.keys(data), function (val) {
            if (!found) { // If already found do nothing
                if (!_.isObject(data[val])) {
                    if (key.toLowerCase() == val.toLowerCase()) {
                        value = data[val.toString()]
                        found = true
                    }
                    else {
                        value = value
                    }
                }
                else {
                    value = that.findKeyValue(key, data[val], found, value) // Look deeper
                }
            }
        })
        if (typeof value !== undefined) {
            return value
        }
    };

    // To sort data in order of any json key specified
    var sortJson = function (data, type) { 
        var that = this;
        var sortData = [];
        if (type == "alphabetical") {
            sortData = this.flatJSON(data)
        }
        return sortData
    };

    // To sort bakcbone collection models accordign to attribute key
    // Shifted to using collection comparator
    var sortCollection = function (data, type) { 
        var that = this;
        var sortCollection = [];
        if (type == "alphabetical") {
            _.sortBy(data, function(model){ 
                return model.attributes.productName
            })
        }
         return sortCollection
    };

    var getDataofKeys = function (data, keys) { // To sort data in order of any json key specified
        var that = this;
        var keyValues = [];
        _.each(data, function (model) {
            var t = {}
            _.each(keys, function (key) { // Get all the data of keys
                t[key] = that.findKeyValue(key, model);
            })
            keyValues.push(t)
        })
        return keyValues
    };

    return {
        _flatJson: _flatJson,
        flatJSON: flatJSON,
        findKeyValue: findKeyValue,
        sortJson: sortJson,
        sortCollection: sortCollection,
        getDataofKeys: getDataofKeys
    }
})