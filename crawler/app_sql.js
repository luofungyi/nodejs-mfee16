const axios = require("axios");
const fs = require("fs/promises");
const moment = require("moment");
const mysql = require("mysql");
const Promise = require("bluebird");
//資料庫連線
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'teddy8233',
    database : 'stock'
  });

connection = Promise.promisifyAll(connection);

(async function(){
    try{
        await connection.connectAsync();
        let data = await fs.readFile("stock.txt","utf8");
        console.log(`抓到的代碼:${data}`);

        let stcok = await connection.queryAsync(`SELECT stock_id FROM stock WHERE stock_id=${data}`);
        if(stcok.length <= 0){
            let response = await axios.get(`https://www.twse.com.tw/zh/api/codeQuery?query=${data}`);
            //response.data = [ '2330\t台積電', '2330R\t台積甲', '2330T\t台積丙' ]
            let name = response.data.suggestions.shift();//shift()移除陣列最前端項目
            // => 2330    台積電
            let nameSplit = name.split("\t");//split()將字串轉換成陣列 ()內為切割依據 
            //[ '2330', '台積電' ]
            //console.log(nameSplit[1]);
            if (nameSplit.length > 1){//nameSplit.length > 1 =>如果有get到資料
                connection.queryAsync(`INSERT INTO stock (stock_id, stock_name) VALUE ('${nameSplit[0]}', '${nameSplit[1]}');`); 
            }
            console.log(nameSplit);
            console.log(response.data);
        }
    }catch(err){
        console.error(err);
    }finally{
         connection.end();
    }
})();
//connection.end();
//fsPromise()
// fs.readFile("stock.txt","utf8")
//     .then((data)=>{

//         connection.query(`SELECT stock_id FROM stock where stock_id='${data}'`,function(err, result){
//             if(err){
//                 throw err;
//             }
//             if(result.length >=0){
//                 //用股票代碼查詢股票名稱
//                 return axios.get(`https://www.twse.com.tw/zh/api/codeQuery?query=${data}`); 
//             }
//         })
               
//     })
//     .then(function (response) {
//         //response.data = [ '2330\t台積電', '2330R\t台積甲', '2330T\t台積丙' ]
//         let name = response.data.suggestions.shift();//shift()移除陣列最前端項目
//         // => 2330    台積電
//         let nameSplit = name.split("\t");//split()將字串轉換成陣列 ()內為切割依據 
//         //[ '2330', '台積電' ]
//         //console.log(nameSplit[1]);
//         if (nameSplit.length > 1){
//             connection.query(`INSERT INTO stock (stock_id, stock_name) VALUE ('${nameSplit[0]}', '${nameSplit[1]}');`, function(err, result){
//                 if(err){
//                     throw err;
//                 }
//                 console.log(result);
//             });
//         }else{
//             throw "查不到資料";
//         }
//     })
    
//     .catch((err)=>{
//         console.error(err);
//     })
//     .finally(()=>{
//         connection.end();
//     })




    // if (response.status === 200) {
    //     console.log(response)
    // }