function sum(n, cd) {
    let result = 0;
    for ( let i = 1; i <= n; i++) {
        result += i;
    }
    // console.log(result);
    // return result;
    cd(result);
    // 回呼 ，回頭呼叫
}

function reportAns(ans) {
    console.log(`Hi,答案是 ${ans}`);
}

function reportAns2(ans) {
    console.log(`Hi,答案是 ${ans}`);
}

sum(10, reportAns);
