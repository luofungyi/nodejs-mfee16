// https://www.twse.com.tw/exchangeReport/STOCK_DAY
// ?response=json
// &date=20210523
// &stockNo=2610

// npm i axios
// 引入 axios
const axios = require("axios");
const moment = require("moment");
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();

// TODO: 從 stock.txt 讀股票代碼進來
// filesystem
// npm i fs ??? -> 不用
const fs = require("fs");

fs.readFile("stock.txt", "utf8", (err, data) => {
  if (err) {
    return console.error("讀檔錯誤", err);
  }
  console.log(`讀到的 stock code: ${data}`);

  axios
    .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: "json",
        date: "20210523",
        stockNo: data,
      },
    })
    .then(function (response) {
      if (response.data.stat === "OK") {
        console.log(response.data.date);
        console.log(response.data.title);
      }
    });
});