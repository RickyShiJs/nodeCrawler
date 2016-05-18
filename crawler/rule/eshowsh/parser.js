/**
 * Created by ricky on 6/15/14.
 */
var jsdom = require("jsdom");
var async = require("async");

var venueMap = {
    "5107_0": "cecsh",
    "13_0": "sniec",
    "14_0": "gdhzzx",
    "22_0": "shintex",
    "21_0": "shsmsc",
    "1661_0": "shexpo",
    "23_0": "shzlzx",
    "3110_0": "shbwg",
    "3109_0": "shkjg",
    "3127_0": "shzrbwg"
}
var baseUrl = "http://www.eshow365.com";
var selector = {
   pageOption: "#pagestr .pagetiao option",
   itemLink: ".sbody dl dt a",
   //next is the item page
   title: ".zhmaincontent h1",
   venue: ".zhxxcontent a:first",
   place: ".zhxxcontent .zt",
   date: ".zhxxcontent p:first",
   host: ".zhxxcontent p:nth-child(5)"
}


/*
obj = {
    title: /String/,
    date: {start: /Date/, end: /Date/},
    place: /String/,
    desc: /String/,
    website: /String/,
    image: /String/
}
 */
exports.parseLength = function parseLength(window){
    var $ = window.$;
    var length = $(selector.pageOption).length;
    return length;
}

exports.parse = function parse(window, callback){
    var $ = window.$;
    var itemLinks = [];
    $(selector.itemLink).each(function(){
        itemLinks.push(baseUrl + $(this).attr("href"));
    });
    async.mapSeries(itemLinks, function(itemLink, cb) {
        console.log("eshow item: " + itemLink);
        jsdom.env({
            url: itemLink,
            src: [global.jquery],
            done: function (errors, window) {
                parseItem(window, cb);
            }
        });

    }, function(err, results) {
        if(err) throw err;
        var rtnData = results.filter(function(item){return item!=null;});
        callback(null, rtnData);
    });
}

function parseItem(window, cb){
    var data = {};
    var $ = window.$;
    var venueHref = $(selector.venue).attr("href");
    var venueId = getVenueIdFromHref(venueHref);
    if(venueId && venueMap[venueId]){
        var title = $(selector.title).text().trim();
        data.title = title ? title : "";
        data.venueId = venueMap[venueId];
        var place = $(selector.place).text().trim();
        if(place){
            data.place = formatPlace(place);
        }
        var host = formatHost($(selector.host).text().trim());
        if(host){
            data.host = host;
        }
        var date = formatDate($(selector.date).text().trim());
        if(date){
            data.date = date;
        }
        cb(null, data);
    }else{
        console.log("Venue needn't " + $(selector.title).text().trim());
        cb(null, null);
    }
}

function getVenueIdFromHref(link){
    if(!link) return null;
    var arr = link.split("/");
    var fileName = arr.pop();
    var id = fileName.split(".")[0];
    return id;
}

function formatPlace(place){
    var arr = place.split("：");
    return arr[1];
}

function formatHost(host){
    if(host.indexOf("主办单位")>=0){
        return host.split("：")[1].replace(/\s+/g," ");
    }else{
        return null;
    }
}

function formatDate(dateStr){
    var arr = dateStr.split("：");
    var timeStr = arr[1];
    var time = timeStr.split("---");
    if(time.length == 2){
        var start = new Date(time[0]);
        var end = new Date(time[1]);
    }else if(time.length ==1){
        var start = new Date(time[0]);
        var end = new Date(time[0]);
    }
    return {start: start, end: end};
}