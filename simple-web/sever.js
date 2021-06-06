// http 是 Node.js 內建的 web sever ， 所以不用安裝
//https://nodejs.org/dist/latest-v14.x/docs/api/http.html/
const http = require( "http" );


// createSever(Listener)
// Listener(request, reponse) 負責處理進來的連線
// request 是請求物件
// response 是回覆物件
const server = http.createServer((req, res) => {
 console.log( "是不是有連線阿?" );
   console.log(req.url);
   res.statusCode = 200; // 2xx , 3xx , 4xx , 5xx
   res.setHeader("Content-Type","text/plain;charset=UTF-8");

   switch(req.res){
       case "/":
           res.end("Hi 這是首頁");
           break;
           case "/test":
               res.end("這是測試頁面");
               break;
               case "/about":
                   res.end("這是關於我們");
                   break;
                   default:
                       res.writeHead(404);
                       res.end("Not Found");
   }
});

//port
server.listen(3000, () => {
  consolo.log( "我要跑起來了喔，我要收 3000 port")

});

// PHP 
//localhost 127.0.0.1
// Public ID 
