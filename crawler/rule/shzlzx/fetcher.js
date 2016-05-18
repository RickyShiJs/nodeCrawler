/**
 * Created by ricky on 6/16/14.
 */
var jsdom = require("jsdom");

exports.fetch = function(id, entry, callback){
    console.log("Start fetch:" + id + "...");
    console.log("shzlzx main: "+entry.url);
    jsdom.env({
        url: entry.url,
        src: [global.jquery],
        done: function (errors, window) {
            if(errors) throw errors;
            var feed = {id: id, locale: entry.name};
            var parser = require("./parser.js");
            feed.data = parser.parse(window);
            callback(null, feed);
            console.log("End fetch:" + id);
        }
    });
}