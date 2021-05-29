function sum(n) {
    if(n === 1) {
        return 1;
    }
    return sum(n-1) + n;
}

sum(10) = sum(9) + 10;
sum(9) = sum(8) + 9;

function call stack