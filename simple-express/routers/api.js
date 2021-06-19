// 1
const express = require('express');
// 2
const router = express.Router();
const axios = require('axios');
// 連資料庫
const connection = require('../utils/db');

router.get('/stock', async (req, res) => {
    let queryResults = await connection.queryAsync('SELECT * FROM stock;');

    res.json(queryResults);

    res.render('stock/list', {
        stocks: queryResults,
    });
});

router.get('/stocks/:stockCode', async (req, res) => {
    let stockdetail = await connection.queryAsync(
        'SELECT * FROM stock_price WHERE stock_id = ? ORDER BY date;',
        req.params.stockCode
    );
    res.json(stockdetail);
});



// 3
module.exports = router;
