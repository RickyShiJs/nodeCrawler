// Count all of the links from the Node.js build page
var jsdom = require("jsdom");
var fs = require("fs");
//var agents = require("./ruleMapping2014.js");
var agents = require("./ruleMapping2015.js");
var async = require('async');
var util = require('util');

global.jquery = fs.readFileSync("./jq/jquery.js", "utf-8");
var feeds =[];
var tasks = createTasks(agents.map);
console.log("Start parallel fetch ...");
async.series(tasks, function (err, results) {
    if(err) throw err;
    feeds = results;
    console.log(feeds);
//    console.log(feeds[0].data);
//    console.log(feeds[1].data);
//    console.log(feeds[2].data);
//    console.log(feeds[3].data);
    fs.exists('data.json', function (exists) {
        if(exists){
            console.log("File already exists");
            fs.readFile('data.json', 'utf8',function (err, data) {
                if (err) return console.log(err);
                var result = JSON.stringify(feeds);
                if(data.length == result.length){
                    console.log("not change, ignore this craw");
                }else{
                    fs.truncateSync('data.json');
                    fs.writeFile('data.json', result, function (err) {
                        if (err) return console.log(err);
                        console.log("save successful...");
                    });
                }
            });
        }else{
            fs.writeFile('data.json', JSON.stringify(feeds), function (err) {
                if (err) return console.log(err);
                console.log("save successful...");
            });
        }
    });

    console.log("End parallel fetch.");
});

function taskFun(id, entry, cb){
    var fetcher = require("./rule/"+id+"/fetcher.js");
    fetcher.fetch(id, entry, cb);
}
function createTasks(maps){
    var tasks = [];
    for(var i in maps){
        tasks.push(async.apply(taskFun, i, maps[i]));
    }
    return tasks;
}
