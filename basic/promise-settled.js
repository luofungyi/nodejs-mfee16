  // new Promise(function (resolve, reject) {});
  // Promise 是一個表示非同步運算的「最終」「完成或失敗」的「物件」
  //    最終成功 --人--> resolve --Promise--> then
  //    最終失敗 --人--> reject  --Promise--> catch
  let doWorkPromise = function (job, timer, success) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let dt = new Date();
        if (success) {
          // 成功
          return resolve(`完成工作: ${job} at ${dt.toISOString()}`);
        }
        reject(`!!工作失敗: ${job} at ${dt.toISOString()}`);
      }, timer);
    });
  };
  
  let dt = new Date();
  console.log(`開始工作 at ${dt.toISOString()}`);
  let p1 = doWorkPromise("寫功課", 3000, true);
  let p2 = doWorkPromise("聽音樂", 2500, false);
  let p3 = doWorkPromise("同學聊天", 3500, true);
  

  Promise.allSettled([p1, p2, p3])
    .then((result) => {
      console.log(result)
    })