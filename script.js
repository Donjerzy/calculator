let num1;
let num2;
let operator;

function add (a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}


function operate(a, b, operator) {
    switch(operator) {
        case 'add':
            return add(a, b);
        case 'subtract':
            return subtract(a, b);
        case 'divide':
            return divide(a, b);
        case 'multiply':
            return multiply(a, b);
        default:
            return undefined
    }
}
