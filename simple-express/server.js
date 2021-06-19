const connection =require("./utils/db")
const express = require("express");
let app = express();


app.use(express.static("public"));


app.set("views","views");
app.set("view engine","pug");

app.use(function (req, res, next) {
  console.log("Middleware");
  next();
});

app.use(function(req, res, next){
  let current = new Date();
  console.log(`訪問${current}`)
  next();
})

let stockRouter =require("./routers/stock");
app.use("/stock",stockRouter)
let apiRouter =require("./routers/api");
app.use("/api",apiRouter)
app.get("/", function (req, res) {
  res.render("index");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/test", function (req, res) {
  res.send("Test Express");
});

app.use(function (req, res, next) {
  res.status(404);
  res.render("404");
});

app.use(function (err, req, res, next) {
  console.log(err.message);
  res.status(500);
  res.send("500");
});

app.listen(3000, async()=>{
    await connection.connectAsync();
    console.log(`跑起來了 3000 Port`);
});