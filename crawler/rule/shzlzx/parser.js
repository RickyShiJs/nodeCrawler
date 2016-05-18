/**
 * Created by ricky on 6/15/14.
 */
var util = require('./util.js');

var selector = {
    item: ".main_3 .table_zh .table_tr",
    title: "li a",
    date: "li:last-child"
}

var data = [];

/*
 obj = {
 title: /String/,
 data: {start: /Date/, end: /Date/},
 }
 */
exports.parse = function parse(window){
    var $ = window.$;
    var items = $(selector.item);
    items.each(function(index, element){
        var obj = {};
        var title = $(element).find(selector.title).text();
        var date = $(element).find(selector.date).text();
        obj.title = title;
        obj.date = util.serializeTime(date);
        data.push(obj);
    });
    return data;
}