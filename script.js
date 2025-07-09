const calculator = document.querySelector('.calculator');
const calculatorScreen = document.querySelector('.calculator-screen');
const keys = calculator.querySelector('.calculator-keys');

let prevNumber = '';
let currentNumber = '0';
let operator = '';
let shouldResetScreen = false;

function updateScreen(number) {
    calculatorScreen.value = number;
}

function handleNumberInput(number) {
    if (shouldResetScreen) {
        currentNumber = number;
        shouldResetScreen = false;
    } else {
        currentNumber = currentNumber === '0' ? number : currentNumber + number;
    }
    updateScreen(currentNumber);
}

function handleOperator(nextOperator) {
    if (operator && shouldResetScreen) {
        operator = nextOperator;
        return;
    }

    if (prevNumber === '') {
        prevNumber = currentNumber;
    } else if (operator) {
        const result = calculate(prevNumber, currentNumber, operator);
        currentNumber = String(result);
        updateScreen(currentNumber);
        prevNumber = currentNumber;
    }

    operator = nextOperator;
    shouldResetScreen = true;
}

function calculate(firstNum, secondNum, op) {
    let result;
    const num1 = parseFloat(firstNum);
    const num2 = parseFloat(secondNum);

    if (isNaN(num1) || isNaN(num2)) return '';

    switch (op) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        case '^':
            result = Math.pow(num1, num2);
            break;
        case '%':
            result = num1 % num2;
            break;
        default:
            return;
    }
    return result;
}

function resetCalculator() {
    prevNumber = '';
    currentNumber = '0';
    operator = '';
    shouldResetScreen = false;
    updateScreen(currentNumber);
}

function handleDecimal(dot) {
    if (shouldResetScreen) {
        currentNumber = '0.';
        shouldResetScreen = false;
        updateScreen(currentNumber);
        return;
    }
    if (!currentNumber.includes(dot)) {
        currentNumber += dot;
    }
    updateScreen(currentNumber);
}

keys.addEventListener('click', (event) => {
    const { target } = event;
    const { value } = target;

    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '^':
        case '%':
            handleOperator(value);
            break;
        case '=':
            if (operator && prevNumber !== '') {
                currentNumber = String(calculate(prevNumber, currentNumber, operator));
                updateScreen(currentNumber);
                prevNumber = '';
                operator = '';
                shouldResetScreen = true;
            }
            break;
        case '.':
            handleDecimal(value);
            break;
        case 'AC':
            resetCalculator();
            break;
        default:
            if (Number.isFinite(parseFloat(value))) {
                handleNumberInput(value);
            }
            break;
    }
});

updateScreen(currentNumber); // Initialize the screen with '0'