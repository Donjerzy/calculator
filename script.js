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

function containsDivision(str) {
    for(let i = 0; i<str.length; i++) {
        if(str[i]==='/') {
            return true;
        }
    }
    return false
}

function containsMultiplication(str) {
    for(let i = 0; i<str.length; i++) {
        if(str[i]==='x') {
            return true;
        }
    }
    return false
}

function containsAddition(str) {
    for(let i = 0; i<str.length; i++) {
        if(str[i]==='+') {
            return true;
        }
    }
    return false
}

function containsSubraction(str) {
    const arr = str.split('-');
    if(arr.length > 1 && arr[0]!== '') {
        return true;
    }
    let noOfSubtractions = 0
    for(let i = 0; i<str.length; i++) {
        if(str[i]==='-') {
            noOfSubtractions += 1;
            if(noOfSubtractions==2) {
                return true;
            }
        }
    }
    return false
}

function calculate(expression) {
    //MAS
    let current = expression;
    let aStart;
    let aEnd;
    let bStart;
    let bEnd;
    let operator;
    while(containsDivision(current)) {
        let result = undefined;
        for(let i = 0; i<current.length; i++) {
            if(current[i]==='/') {
                operator = i;
                break;
            }
        }
        bStart = operator + 1;
        aEnd = operator;
        for(let y = operator + 1; y<current.length; y++) {
            if(current[y] === '+' || current[y] === '-' || current[y] === '/' ||  current[y] === 'x') {
                bEnd = y;
                break;
            }
            if(y === current.length - 1) {
                bEnd = current.length;
            }
        }
        for(let y = operator - 1; y>=0; y--) {
            if(current[y] === '+' || current[y] === '-' || current[y] === '/' ||  current[y] === 'x') {
                aStart = y+1;
                break;
            }
            if(y === 0) {
                aStart = 0;
            }
        }
        result = operate(parseFloat(current.slice(aStart, aEnd)), 
                        parseFloat(current.slice(bStart, bEnd)),
                        'divide');
        let newCurrent = '';
        let resultAdded = false;
        for(i=0;i<current.length;i++) {
            if(i<aStart) {
                newCurrent += current[i];
            } else if(i>=bEnd) {
                newCurrent += current[i];
            } else if (i>=aStart && i<bEnd && !resultAdded ) {
                newCurrent+= result;
                resultAdded = true;
            }
        }
        current = newCurrent;
    }
    while(containsMultiplication(current)) {
        let result = undefined;
        for(let i = 0; i<current.length; i++) {
            if(current[i]==='x') {
                operator = i;
                break;
            }
        }
        bStart = operator + 1;
        aEnd = operator;
        for(let y = operator + 1; y<current.length; y++) {
            if(current[y] === '+' || current[y] === '-' || current[y] === '/' ||  current[y] === 'x') {
                bEnd = y;
                break;
            }
            if(y === current.length - 1) {
                bEnd = current.length;
            }
        }
        for(let y = operator - 1; y>=0; y--) {
            if(current[y] === '+' || current[y] === '-' || current[y] === '/' ||  current[y] === 'x') {
                aStart = y+1;
                break;
            }
            if(y === 0) {
                aStart = 0;
            }
        }
        result = operate(parseFloat(current.slice(aStart, aEnd)), 
                        parseFloat(current.slice(bStart, bEnd)),
                        'multiply');
        let newCurrent = '';
        let resultAdded = false;
        for(i=0;i<current.length;i++) {
            if(i<aStart) {
                newCurrent += current[i];
            } else if(i>=bEnd) {
                newCurrent += current[i];
            } else if (i>=aStart && i<bEnd && !resultAdded ) {
                newCurrent+= result;
                resultAdded = true;
            }
        }
        current = newCurrent;
    }
    while(containsAddition(current)) {
        let result = undefined;
        for(let i = 0; i<current.length; i++) {
            if(current[i]==='+') {
                operator = i;
                break;
            }
        }
        bStart = operator + 1;
        aEnd = operator;
        for(let y = operator + 1; y<current.length; y++) {
            if(current[y] === '+' || current[y] === '-' || current[y] === '/' ||  current[y] === 'x') {
                bEnd = y;
                break;
            }
            if(y === current.length - 1) {
                bEnd = current.length;
            }
        }
        for(let y = operator - 1; y>=0; y--) {
            if(current[y] === '+' || current[y] === '/' ||  current[y] === 'x') {
                aStart = y+1;
                break;
            }
            if(current[y] === '-') {
                aStart = y;
                break;
            }
            if(y === 0) {
                aStart = 0;
            }
        }
        result = operate(parseFloat(current.slice(aStart, aEnd)), 
                        parseFloat(current.slice(bStart, bEnd)),
                        'add');
        let newCurrent = '';
        let resultAdded = false;
        for(i=0;i<current.length;i++) {
            if(i === aStart) {
                newCurrent+= result;
                resultAdded = true;
            } else if(i<aStart) {
                newCurrent += current[i];
            } else if(i>=bEnd) {
                newCurrent += current[i];
            } else if (i>=aStart && i<bEnd && !resultAdded ) {
                newCurrent+= result;
                resultAdded = true;
            }
        }
        current = newCurrent;
    }
    while(containsSubraction(current)) {
        let result = undefined;
        for(let i = 0; i<current.length; i++) {
            if(current[i]==='-' && i!==0) {
                operator = i;
                break;
            }
        }
        bStart = operator + 1;
        aEnd = operator;
        for(let y = operator + 1; y<current.length; y++) {
            if(current[y] === '+' || current[y] === '-' || current[y] === '/' ||  current[y] === 'x') {
                bEnd = y;
                break;
            }
            if(y === current.length - 1) {
                bEnd = current.length;
            }
        }
        for(let y = operator - 1; y>=0; y--) {
            if(current[y] === '+' ||  current[y] === '/' ||  current[y] === 'x') {
                aStart = y+1;
                break;
            }
            if(y === 0) {
                aStart = 0;
            }
        }
        aStart = aStart || 0;
        // console.log(`A start = ${aStart}`)
        // console.log(`A end = ${aEnd}`)
        // console.log(`Num 1 ==== '${parseFloat(current.slice(aStart, aEnd))}`)
        // console.log(`Num 2 ==== '${parseFloat(current.slice(bStart, bEnd))}`)
        result = operate(parseFloat(current.slice(aStart, aEnd)), 
                        parseFloat(current.slice(bStart, bEnd)),
                        'subtract');
        let newCurrent = '';
        let resultAdded = false;
        for(i=0;i<current.length;i++) {
            if(i<aStart) {
                newCurrent += current[i];
            } else if(i>=bEnd) {
                newCurrent += current[i];
            } else if (i>=aStart && i<bEnd && !resultAdded ) {
                newCurrent+= result;
                resultAdded = true;
            }
        }
        current = newCurrent;
    }
    return current;
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
            if(prev !== '+' && prev !== '.' && prev !== '-' && prev !== '/' &&  prev !== 'x' && prev !== undefined) {
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




