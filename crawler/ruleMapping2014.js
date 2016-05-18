var map = {
    /*
     obj = {
     title: /String/,
     data: {start: /Date/, end: /Date/},
     }
     */
    "shzlzx": {name: "上海展览中心", url: "http://www.shzlzx.com.cn/schedule.jsp"},

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
    "sniec": {
        name: "上海新国际博览中心",
        url: "http://www.sniec.net/cn/visit_exhibition.php?month=",
        params: {year: "2014", month: ["01","02","03","04","05","06","07","08","09","10","11","12"]}
    },
    /*
     obj = {
     title: /String/,
     data: {start: /Date/, end: /Date/},
     place: /String/,
     host: /String/,
     image: /String/
     }
     */
    "shexpo": {
        name: "上海世博展览馆",
        url: "http://www.shexpocenter.com/ExAgenda.aspx",
        params: {year: "2014",  month: ["01","02","03","04","05","06","07","08","09","10","11","12"]}
    },
    /*
     obj = {
     title: /String/,
     data: {start: /Date/, end: /Date/},
     place: /String/,
     host: /String/
     }
     */
    "shintex": {
        name: "上海国际展览中心",
        url: "http://www.intex-sh.com/exhibition/"
    }

};
exports.map = map;