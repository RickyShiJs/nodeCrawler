/*
* Parameter
*   timeStr: String
* Return
*   Object{start: Date, end: Data}
* */

 exports.serializeTime = function serializeTime(timeStr){
     var timeStr = timeStr.replace(/年/g,".").replace(/月/g,".").replace(/日/g, ".");
     var time = timeStr.split("-");
     var yearStr = time[0].split(".")[0];
     if(time.length == 2){
         var start = new Date(time[0]);
         var end = new Date(yearStr+"."+time[1]);
     }else if(time.length ==1){
         var start = new Date(time[0]);
         var end = new Date(time[0]);
     }
     return {start: start, end: end};
}

