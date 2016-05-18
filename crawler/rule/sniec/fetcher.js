/**
 * Created by ricky on 6/16/14.
 */
var jsdom = require("jsdom");
var async = require("async");
var parser = require("./parser.js");

exports.fetch = function(id, entry, callback){
    console.log("Start fetch:" + id + "...");
    var feed = {id: id, locale: entry.name};
    var url = entry.url;
    var paramsArr = [];
    var year = entry.params.year;
    var monthArr = entry.params.month;
    for(var i = 0; i < monthArr.length; i++){
        paramsArr.push(year + "-" + monthArr[i]);
    }
    async.mapSeries(paramsArr, function(item, cb) {
        var link = url + item;
        console.log("sniec main: " +link);
        jsdom.env({
            url: link,
            src: [global.jquery],
            done: function (errors, window) {
                parser.parse(window, cb);
                //cb(null, month_res);
            }
        });

    }, function(err, results) {
        if(err) throw err;
        var formatted = [];
        for(var i = 0; i < results.length; i++){
            formatted = formatted.concat(results[i]);
        }
        feed.data = formatted;
        callback(null,feed);
        console.log("End fetch:" + id);
    });

}