// 1
const express = require('express');
// 2
const router = express.Router();
// 連資料庫
const connection = require('./utils/db');

router.get('/', async (req, res) => {
    let queryResults = await connection.queryAsync('SELECT * FROM stock;');

    res.json(queryResults);

    res.render('stock/list', {
        stocks: queryResults,
    });
});




axios.get('api/stock')
  .then((response) => {
    // handle success
    console.log(response.data);
  })
  .catch((error) => {
    // handle error
    console.log(error,"error了喔");
  });

// 3
module.exports = router;
