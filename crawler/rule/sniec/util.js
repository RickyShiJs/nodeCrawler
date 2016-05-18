/*
* Parameter
*   timeStr: String
* Return
*   Object{start: Date, end: Data}
* */

 exports.serializeTime = function serializeTime(timeStr){
     var time = timeStr.split("-");
     if(time.length == 2){
         var start = new Date(time[0]);
         var end = new Date(time[1]);
     }else if(time.length ==1){
         var start = new Date(time[0]);
         var end = new Date(time[0]);
     }
     return {start: start, end: end};
}

