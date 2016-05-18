/**
 * Created by ricky on 6/16/14.
 */
var jsdom = require("jsdom");
var async = require("async");
var parser = require("./parser.js");

exports.fetch = function(id, entry, callback){
    console.log("Start fetch:" + id + "...");
    var linkBase = entry.url;
    var linkInit = linkBase+1;
    jsdom.env({
        url: linkInit,
        src: [global.jquery],
        done: function (errors, window) {
            var len = parser.parseLength(window);
            var linkArr = [];
            for(var i=1; i<=len; i++){
                linkArr.push(linkBase+i);
            }
            async.mapSeries(linkArr, function(link, cb) {
                console.log("eshow main: " + link);
                jsdom.env({
                    url: link,
                    src: [global.jquery],
                    done: function (errors, window) {
                        parser.parse(window, cb);
                    }
                });

            }, function(err, results) {
                if(err) throw err;
                var formatArr = [];
                for(var i=0; i<results.length; i++){
                    formatArr = formatArr.concat(results[i]);
                }
                var rtnArr = [];
                var venueIdArr = ["cecsh","sniec", "gdhzzx","shintex","shsmsc","shexpo","shzlzx","shbwg","shkjg","shzrbwg"];
                for(var j=0; j<venueIdArr.length; j++){
                    var tempArr = formatArr.filter(function(item){return item.venueId == venueIdArr[j]});
                    if(tempArr.length>0){
                        rtnArr.push({id:venueIdArr[j], data: tempArr});
                    }
                }
                console.log(rtnArr);
                console.log("End fetch:" + id);
                callback(null, rtnArr);
            });
        }
    });


}