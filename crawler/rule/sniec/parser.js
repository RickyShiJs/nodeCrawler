/**
 * Created by ricky on 6/15/14.
 */
var util = require('./util.js');
var jsdom = require("jsdom");
var counter = require("counter");

var selector = {
    item: "ul#upcom li .dn",
    title: "h2",
    image: ".scrolllist img",
    dateAndPlace: ".padr15 span.sarial",
    desc: "p>span",
    website: "p a span",
    pageSlash: ".pagi .pn",
    nextPage: ".pagi .next"
}


/*
obj = {
    title: /String/,
    data: {start: /Date/, end: /Date/},
    place: /String/,
    desc: /String/,
    website: /String/,
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
        try{
        var title = $(element).find(selector.title).text();
        var date = $(element).find(selector.dateAndPlace)[0].innerHTML;
        var place = $(element).find(selector.dateAndPlace)[1].innerHTML;
        var desc = $(element).find(selector.desc).text();
        var website = $(element).find(selector.website).text();
        var image = $(element).find(selector.image)[0].src;
            if(title=="第22届中国国际建筑、装饰展览会"){
                console.log(window);
            }
        }catch(e){
            console.log(e)
            console.log(element.innerHTML);
            console.log(title);
        }
        obj.title = title;
        obj.place = place;
        obj.desc = desc;
        obj.website = website ? website : "";
        obj.date = util.serializeTime(date);
        obj.image = image;

        data.push(obj);
    });
    if(hasNextPage($)){
        count++;
        var nextUrl = $(selector.nextPage)[0].href;
        console.log("sniec child: "+nextUrl);
        getNextData(nextUrl, data, cb);
    }
    if(count == 0){
        cb(null, data);
    }
}

function hasNextPage($){
    var pageSlashStr = $(selector.pageSlash).text().trim();
    var pageArray = pageSlashStr.split("/");
    if(pageArray.length == 2){
        return pageArray[0] < pageArray[1] ? true : false;
    }
}

function getNextData(url, data,cb){
    jsdom.env({
        url: url,
        src: [global.jquery],
        done: function (errors, window) {
            count--;
            parseData(window, data, cb);
        }
    });
}