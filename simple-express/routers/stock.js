// routes/stock.js
const express = require('express');
// 可以把 router 想成一個小的獨立的應用
const router = express.Router();
const connection = require('../utils/db');

// let app = express();
// app.use
// app.get

router.get('/', async (req, res) => {
    let queryResults = await connection.queryAsync('SELECT * FROM stock;');
    res.render('stock/list', {
        stocks: queryResults,
    });
});

router.get('/:stockCode', async (req, res, next) => {
    let stock = await connection.queryAsync(
        'SELECT * FROM stock WHERE stock_id=?;',
        req.params.stockCode //req.params -> 拿路由參數 , req.query -> 拿query string
    );
    if (stock.length === 0) {
        throw new Error('查無代碼');
        next();
    }
    stock = stock[0];

    let count = await connection.queryAsync(
        'SELECT count(*) as total FROM stock_price WHERE stock_id= ?',
        req.params.stockCode
    );

    const total = count[0].total;
    const perPage = 10;
    const lastPage = Math.ceil(total / perPage);

    const currentPage = req.query.page || 1;
    const offset = (currentPage - 1) * perPage;

    let queryResults = await connection.queryAsync(
        'SELECT * FROM stock_price WHERE stock_id = ? ORDER BY date LIMIT ? OFFSET ?;',
        [req.params.stockCode, perPage, offset]
    );
    res.render('stock/detail', {
        stock,
        stockPrice: queryResults,
        pagination: {
            lastPage,
            currentPage,
            total,
        },
    });
});

module.exports = router;
