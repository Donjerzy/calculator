let num1;
let num2;
let operator;
let displayValue = '';
let searchPointer = 0;
const displayScreen = document.querySelector('.display');
const sevenBtn = document.querySelector('#seven');
const eightBtn = document.querySelector('#eight');
const nineBtn = document.querySelector('#nine');
const delBtn = document.querySelector('#del-button');
const fourBtn = document.querySelector('#four');
const fiveBtn = document.querySelector('#five');
const sixBtn = document.querySelector('#six');
const addBtn = document.querySelector('#add');
const oneBtn = document.querySelector('#one');
const twoBtn = document.querySelector('#two');
const threeBtn = document.querySelector('#three');
const subtractBtn = document.querySelector('#subtract');
const dotBtn = document.querySelector('#dot');
const zeroBtn = document.querySelector('#zero');
const divideBtn = document.querySelector('#divide');
const multiplyBtn = document.querySelector('#multiply');
const resetBtn = document.querySelector('#reset-button');
const equalsBtn = document.querySelector('#equals-button');

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

function validDotPosition() {
    const pointer = displayValue.length - 1;
    for(let i = pointer; i>=0; i--) {
        if(displayValue[i] === '+' || displayValue[i] === '-' || displayValue[i] === '/' || displayValue[i] === 'x') {
            console.log(`Found Operator`);
            searchPointer = i + 1;
            break;
        }
    }
    for(let y = searchPointer; y < pointer; y++) {
        if(displayValue[y]==='.') {
            searchPointer = 0;
            return false;
        }
    }
    searchPointer=0;
    return true;
}

function calculate(expression) {
    console.log(`Received ${expression}`);
    let sample = 69;
    return sample;
}

function containsOperator() {
    for(let i = 0; i < displayValue.length; i++) {
        if(displayValue[i] === '+' || displayValue[i] === '-' || displayValue[i] === '/' || displayValue[i] === 'x') {
            return true;
        }
    }
    return false;
}

function modifyDisplayValue(value, action) {
    let prev;
    switch(action) {
        case 'add-num':
            displayValue += value;
            displayScreen.textContent = displayValue;
            break;
        case 'del':
            if (displayValue.length > 0) {
                let tempValue = [...displayValue]
                tempValue.pop();
                let newValue = tempValue.join('');
                displayValue = newValue;
                displayScreen.textContent = displayValue;
            }
            break;
        case 'add-operator':
            prev = displayValue[displayValue.length - 1];
            if(prev !== '+' && prev !== '.' && prev !== '-' && prev !== '/' &&  prev !== 'x') {
                displayValue += value;
                displayScreen.textContent = displayValue; 
            }
            break;
        case 'subtract-operator':
            prev = displayValue[displayValue.length - 1];
            if(prev !== '+' && prev !== '.' && prev !== '-' && prev !== '/' &&  prev !== 'x') {
                displayValue += value;
                displayScreen.textContent = displayValue; 
            }
            break;
        case 'dot':
            prev = displayValue[displayValue.length - 1];
            if(prev !== '+' && prev !== '.' && prev !== '-' && prev !== '/' &&  prev !== 'x' && prev !== undefined && validDotPosition()) {
                displayValue += value;
                displayScreen.textContent = displayValue; 
            }
            break;
        case 'divide-operator':
            prev = displayValue[displayValue.length - 1];
            if(prev !== '+' && prev !== '.' && prev !== '-' && prev !== '/' &&  prev !== 'x' && prev !== undefined) {
                displayValue += value;
                displayScreen.textContent = displayValue; 
            }
            break; 
        case 'multiply-operator':
            prev = displayValue[displayValue.length - 1];
            if(prev !== '+' && prev !== '.' && prev !== '-' && prev !== '/' &&  prev !== 'x' && prev !== undefined) {
                displayValue += value;
                displayScreen.textContent = displayValue; 
            }
            break; 
        case 'reset':
            displayValue = '';
            displayScreen.textContent = '0.0';
            break;
        case 'equals':
            prev = displayValue[displayValue.length - 1];
            if(prev !== '+' && prev !== '.' && prev !== '-' && prev !== '/' &&  prev !== 'x' && prev !== undefined && containsOperator()) {
                const value = calculate(displayValue);
                displayScreen.textContent = value
            }
            break;
    }
}

sevenBtn.addEventListener('click', ()=> {
    modifyDisplayValue(7, 'add-num');
});

eightBtn.addEventListener('click', ()=> {
    modifyDisplayValue(8, 'add-num');
});

nineBtn.addEventListener('click', ()=> {
    modifyDisplayValue(9, 'add-num');
});

delBtn.addEventListener('click', ()=> {
    modifyDisplayValue(null, 'del');
});

fourBtn.addEventListener('click', ()=> {
    modifyDisplayValue(4, 'add-num');
});

fiveBtn.addEventListener('click', ()=> {
    modifyDisplayValue(5, 'add-num');
});

sixBtn.addEventListener('click', ()=> {
    modifyDisplayValue(6, 'add-num');
});

addBtn.addEventListener('click', ()=> {
    modifyDisplayValue('+', 'add-operator');
});

subtractBtn.addEventListener('click', ()=> {
    modifyDisplayValue('-', 'subtract-operator');
});

dotBtn.addEventListener('click', ()=> {
    modifyDisplayValue('.', 'dot');
});

divideBtn.addEventListener('click', ()=> {
    modifyDisplayValue('/', 'divide-operator');
});

multiplyBtn.addEventListener('click', ()=> {
    modifyDisplayValue('x', 'multiply-operator');
});

oneBtn.addEventListener('click', ()=> {
    modifyDisplayValue(1, 'add-num');
});

twoBtn.addEventListener('click', ()=> {
    modifyDisplayValue(2, 'add-num');
});

threeBtn.addEventListener('click', ()=> {
    modifyDisplayValue(3, 'add-num');
});

zeroBtn.addEventListener('click', ()=> {
    modifyDisplayValue(0, 'add-num');
});

resetBtn.addEventListener('click', ()=> {
    modifyDisplayValue(null, 'reset');
});

equalsBtn.addEventListener('click', ()=> {
    modifyDisplayValue(null, 'equals');
});




