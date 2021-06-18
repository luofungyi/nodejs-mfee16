// car.js

// 公有 私有

// 當你暴露給別人時，別人可以寫他、更改

const item = require("./car");

console.log(item);

console.log(item.getColor());

item.setColor("Yellow");

console.log(item.getColor()); 