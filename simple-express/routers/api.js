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

$(function () {
    var app = new Vue({
        el: '#app',
        data: {
            stocks: [],
        },
        beforeMount: async function () {
            let response = await fetch('api/stocks');
            this.stovks = await response.json();
        },
    });

    $.ajax({
        type: 'GET',
        url: '/api/stocks',
    }).done(function (data) {
        console.log(gata);
    });

    axios.get('api/stock').then((res) => {
        console.log(res.data);
    });

    fetch('/api/stocks')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
        });
});

// 3
module.exports = router;
