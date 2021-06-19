// TODO jquary ajax 取得 /api/stocks 的資料

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