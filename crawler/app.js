


// crawler
//     npm install
//     -> 讀 package.json "dependencies"
//     -> axios -> npm install axios

const axios = require('axios')

axios({
        method: "get",
        url: "https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210528&stockNo=2330&_=1622187642107",
        responseType: "json"
    })
    .then(function(response){
        // let stockList =  new Array()
        // let data = new Object()

        // let resDataLen = response.data.data.length 長度
        let stockId = response.data["title"].split(/\s+/)[1]
        let stockName = response.data["title"].split(/\s+/)[2]
        let tradingDate = response.data["date"]
        // console.log(response)
        console.log(response.data)

        // let stockID = response.data["fields"][6]
        // console.log(stockID)
        

        // let closingPrice = response.data.data[resDataLen - 1][6]  長度-1(最後的)
        // data.stockId = stockId
        // data.stockName = stockName
        // data.tradingDate = tradingDate
        // data.closingPrice = closingPrice
        // stockList.push(data)
        // console.log(stockList)
    })