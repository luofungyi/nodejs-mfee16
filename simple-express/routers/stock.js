// routes/stock.js
const express = require("express");
// 可以把 router 想成一個小的獨立的應用
const router = express.Router;
const connection = require("./utils/db");

// let app = express();
// app.use
// app.get

router.get("/", async (req, res) => {
    let queryResults = await connection.queryAsync("SELECT * FROM stock;");
    res.render("stock/list", {
      stocks: queryResults,
    });
  });
  

router.get("/:stockCode", async (req, res) => {
    let queryResults = await connection.queryAsync("SELECT * FROM stock_price WHERE stock_id = ? ORDER BY date;", req.params.stockCode);
    res.render("stock/detail", {
        stockPrices: queryResults,
    })
  })
  


module.exports = router;