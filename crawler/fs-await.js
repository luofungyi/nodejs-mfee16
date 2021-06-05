const axios = require("axios");
// 引入promise版的fs，就不需要自己寫
const fs = require("fs/promises");
const moment = require("moment");

// function readFilePromise() {
// return new Promise((resolve, reject) => {
//            fs.readFile("stock.txt", "utf8", (err, data) => {
//                 if (err) {
//                     reject(err);
//                 }else{
//                     resolve(data);
//                 }
//             })
//         })
//     }
    
    (async function() {
        try {
            let stockNo = await fs.readFile("stock.txt", "utf-8");
            let result = await axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
                params: {
                    response: JSON,
                    date: moment().format("YYYYMMDD"),
                    stockNo: stockNo
                }
            });
            console.log(result.data.data);
            console.log(result.data.title);
        } catch (err) {
            console.log(err);
        };
    })();




// fsPromise().then((data) => {
//     return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
//       params: {
//         response: "json",
//         date: "20210523",
//         stockNo: data,
//       },
//     });
//   })

//   .then(function (response) {
//     if (response.data.stat === "OK") {
//       console.log(response.data.date);
//       console.log(response.data.title);
//     }
//   });

