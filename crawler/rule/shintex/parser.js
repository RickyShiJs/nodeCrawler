/**
 * Created by ricky on 6/15/14.
 */
var util = require('./util.js');

var selector = {
    item: "#tr_1 .d_tab tr",
    title: "td:nth-child(2)",
    date: "td:nth-child(3)",
    place: "td:nth-child(4)",
    host: "td:nth-child(5)"
}

var data = [];
/*
 obj = {
 title: /String/,
 data: {start: /Date/, end: /Date/},
 place: /String/,
 host: /String/
 }
 */
exports.parse = function parse(window){
    var $ = window.$;
    var items = $(selector.item).slice(1);
    items.each(function(index, element){
        var obj = {};
        var title = $(element).find(selector.title).text();
        var date = $(element).find(selector.date).text();
        var place = $(element).find(selector.place).text();
        var host = $(element).find(selector.host).text();
        obj.title = title;
        obj.host = host;
        obj.place = place;
        obj.date = util.serializeTime(date);
        data.push(obj);
    });
    return data;
}
