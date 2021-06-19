const mysql = require('mysql');
const Promise = require('bluebird');
require('dotenv').config();

//設定資料庫連線
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    dateStrings: true,
});
//connection->Promise化
connection = Promise.promisifyAll(connection);

// exports.connection = connection; 錯誤 詳情影片012459
module.exports = connection;
