var util = require('./util.js');
var jsdom = require("jsdom");

var selector = {
    item: "#gvEx table[width='680']",
    title: "strong a",
    image: "table img",
    dateHostPlace: "tr td span",
    nextBtn: "#gvEx_ctl11_lbnPrev",
    viewState: "#__VIEWSTATE",
    validation: "#__EVENTVALIDATION"
}


/*
 obj = {
 title: /String/,
 data: {start: /Date/, end: /Date/},
 place: /String/,
 host: /String/,
 image: /String/
 }
 */

exports.parse = function parse(window, cb){
    var data = [];
    count = 0;
    parseData(window, data, cb);
}

function parseData(window, data, cb){
    var $ = window.$;
    var items = $(selector.item);
    items.each(function(index, element){
        var obj = {};
        try {
            var title = $(element).find(selector.title).text();
            var website = $(element).find(selector.title)[0].href;
            var date = $(element).find(selector.dateHostPlace)[0].innerHTML;
            var host = $(element).find(selector.dateHostPlace)[1].innerHTML;
            var place = $(element).find(selector.dateHostPlace)[2].innerHTML;
            var image = $(element).find(selector.image)[0].src;
            obj.title = title;
            obj.website = website;
            obj.place = place;
            obj.host = host;
            obj.date = util.serializeTime(date);
            obj.image = image;
        }catch(e){
            console.log(e);
            console.log(element.innerHTML);
            console.log(title);
        }
        data.push(obj);
    });
    if(hasNextPage($)){
        count++;
        var nextUrl = window.location._url.host;
        var path = window.location._url.pathname;
        getNextData(nextUrl, path, data, cb, $);
    }
    if(count == 0){
        cb(null, data);
    }
}

function hasNextPage($){
    var node = $(selector.nextBtn)[0];
    if(node){
        return true;
    }else{
        return false;
    }
}

function getNextData(host,path, data, cb, $){
    var http = require('http');
    var querystring = require('querystring');

    var post_data = querystring.stringify({
        __EVENTTARGET: "gvEx$ctl11$lbnNext",
        __VIEWSTATE: $(selector.viewState)[0].value,
        __VIEWSTATEENCRYPTED: "",
        __EVENTVALIDATION: $(selector.validation)[0].value
    });
    var options = {
        host: host,
        port: 80,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        }
    };
    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            jsdom.env(
                chunk,
                ["../jq/jquery.js"],
                function(errors, window) {
                    count--;
                    setTimeout(function(){},200);
                    parseData(window, data, cb);
                }
            );
        });
    });

    console.log("shexpo child post: " + options.host+options.path);
    req.write(post_data + "\n");
    req.end();
}