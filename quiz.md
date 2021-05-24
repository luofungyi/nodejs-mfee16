##quiz
請問下列程式執行後的結果為何？為什麼？

(1) 
回答:

start->IIFE->end->Timeout

因為async callback:

stack:main()->console.log("end")->console.log("IIFE")->setTimeout->console.log("start")

return statement，從stack移除:console.log("start")->setTimeout (Web API執行1秒)->console.log("IIFE")->console.log("end")

webapis:Web API中計時器執行，setTimeout stack移除。setTimeout執行1秒至task queu

event loop:看stack清空時推setTimeout上stack，stack:console.log("Timeout")

所以console:start->IIFE->end->Timeout

(2) 
回答:

start->IIFE->end->Timeout

因為async callback:

stack:main()->console.log("end")->console.log("IIFE")->setTimeout->console.log("start")

return statement，從stack移除:console.log("start")->setTimeout (Web API執行0秒)->console.log("IIFE")->console.log("end")

webapis:Web API中計時器執行，setTimeout stack移除。setTimeout執行0秒至task queu

event loop:看stack清空時推setTimeout上stack，stack:console.log("Timeout")

所以console:start->IIFE->end->Timeout

(3) 
回答:

foo->bar->baz

因為:

stack:
main()->foo()呼叫後console.log("foo") ,

bar()呼叫後console.log("bar") ,

baz()呼叫後console.log("baz")

(4) 
回答:

foo->baz->bar

因為:

stack:
main()->foo()呼叫後console.log("foo") ,

setTimeout(bar, 0)->Web API中計時器執行stack移除->setTimeout()執行0秒至task queu,

baz()呼叫後console.log("bar") ,

stack清空時推setTimeout()上stack

bar()呼叫後console.log("baz")
