let counter = 0;

function sum(n) {
    counter++;
    if(n === 1) {
        return 1;
    }
    return sum(n-1) + n;
}

// sum(10) = sum(9) + 10;
// sum(9) = sum(8) + 9;

// function call stack

console.log(sum(10))
console.log(counter)
