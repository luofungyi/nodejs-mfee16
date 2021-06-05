const axios = require("axios");
const fs = require("fs");
const moment = require("moment");
const Promise = require("bluebird");

// console.log(Promise);

// function readfilePromise() {
//     return new Promise((resolve, reject) => {
//         fs.readFile("stock.txt", "utf8", (err, data) => {
//             if (err) {
//                 reject(err);
//             }else {
//                 resolve(data)
//               }
//           })
//       })
// }

// 用 bluebird 包 callback 版本的 readFile
const resdFildBlue = Promise.promisify(fs.readFile);


readfileBlue("stock.txt", "utf-8").then((data) => {
  return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    params: {
      response: JSON,
      date: moment().format("YYYYMMDD"),
      stockNo: data
    }
  });
})


.then(function (result) {
    if (result.data.stat === "OK") {
      console.log(result.data.data);
      console.log(result.data.title);
    }
  })

 


// fs.readFile("stock.txt", "utf8", (err, data) => {
//   if (err) {
//     return console.error("讀檔錯誤", err);
//   }
//   console.log(`讀到的 stock code: ${data}`);

//   axios
//     .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
//       params: {
//         response: "json",
//         date: "20210523",
//         stockNo: data,
//       },
//     })
//     .then(function (response) {
//       if (response.data.stat === "OK") {
//         console.log(response.data.date);
//         console.log(response.data.title);
//       }
//     });
// });