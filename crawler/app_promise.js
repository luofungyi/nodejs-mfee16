

const axios = require("axios");
const fs = require("fs");


function fsPromise() {
    return new Promise((resolve, reject) => {

        fs.readFile("stock.txt", "utf8", (err, data) => {
            if (err) {
                resolve(`讀到的 stock code: ${data}`);
            }else {
                reject("讀檔錯誤", err)};
    });
  });
}

fsPromise().then((data) => {
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: "json",
        date: "20210523",
        stockNo: data,
      },
    });
  })

  .then(function (response) {
    if (response.data.stat === "OK") {
      console.log(response.data.date);
      console.log(response.data.title);
    }
  });


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