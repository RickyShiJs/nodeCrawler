/*
* Parameter
*   timeStr: String
* Return
*   Object{start: Date, end: Data}
* */

var YEAR = "2014";
var dateFormatMark = ".";

 exports.serializeTime = function serializeTime(timeStr){
     var time = timeStr.split("-");
     if(time.length == 2){
         var start = new Date(YEAR + dateFormatMark + time[0]);
         var end = new Date(YEAR + dateFormatMark + time[1]);
     }else if(time.length ==1){
         var start = new Date(YEAR + dateFormatMark + time[0]);
         var end = new Date(YEAR + dateFormatMark + time[0]);
     }
     return {start: start, end: end};
}

