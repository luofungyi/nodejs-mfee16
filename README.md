心得作業

#‧ JavaScript是一種Single Thread(單執行緒)的程式語言。
單執行緒的Runtime，他有單執行緒的呼叫堆疊，也就是可以一次做一件事。

#‧ JavaScript Runtime 簡化內容:
heap記憶體，進行記憶體分配
stack，是一種資料結構，記錄相關東西的位置及堆疊框架。First In Last Out (FILO)
ps.不過grep抓取像是setTimeout、DOM或是HTTP等等請求的並不在stack中

Ex1.
main()檔案本身->printSquara(4)->square(n)->multiply(n,n) 
=>return statement回傳陳述

return statement，從stack移除
multiply(n,n) ->square(n)->
stack記下"console.log(square)"->console.log(square)->printSquara(4)->main()

Ex2:
console.log(‘Hi’);
setTimeout(function cb(){
	console.log(‘there’);
},5000);
console.log(‘HiHi’)

#stack
main()->console.log(‘Hi’)->setTimeout cb->console.log(‘HiHi’)
ps.setTimeout是瀏覽器提供的API，不在V8引擎中。

#webapis
timer() Web API中計時器執行，setTimeout call完成->stack移除

#Web API執行之後將回調推送至任務佇列(task queue, First In Fisrt Out (FIFO))

#event loop 的工作是察看堆疊stack跟task queue，如果stack是空的就會讓task queue上第一個東西(先進先出)推上stack，讓stack能有效執行

console
Hi->HiHi->there

#‧ 發生堆疊爆炸(Bloeing the stack)
main()->foo()->foo()->∞...

#‧ blocking阻塞
跑起來慢、同時又在該堆疊上的東西

瀏覽器解決阻塞問題:
1.重新渲染(rerender)
2.非同步回調(async callback)

瀏覽器中幾乎沒有阻塞函式，在Node裡也是一樣。都是非同步的(Async)
基本上都是run->callback->run…

#‧call back
任何一個函式呼叫的任一種函式
Ex1.回調可以是非同步回調，動作會推回到佇列中。
render queue 的優先級別大於 callback queue

Ex2.
使用滾輪產生許多DOW事件，callback queue佇列排隊等著call stack清空，緩慢的程式碼讓網站阻塞。當stack清空時佇列依序進行事件，也就是在做視覺優化時會發生什麼事，使用防抖動(debouncing)方法解決或是每隔幾秒作用(或是不要用滾輪XD)



