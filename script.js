const numBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const clearBtn = document.getElementById('clear');
const backspaceBtn = document.getElementById('backspace');
const decimalBtn = document.getElementById('decimal');
const equalsBtn = document.getElementById('equals');

let operator = '';
let lastOperand = '';
let currentOperand = '';
let shouldResetOutput = false;

window.addEventListener('keydown', keyboardSupport);
backspaceBtn.addEventListener('click', backspace);
clearBtn.addEventListener('click', clear);
equalsBtn.addEventListener('click', equals);
decimalBtn.addEventListener('click', decimal);
numBtns.forEach(button => button.addEventListener('click', () => appendNum(button.value)));
operatorBtns.forEach(button => button.addEventListener('click', () => setOperator(button.value)));

function appendNum(number) {
  if (output.textContent === '0' || shouldResetOutput) {
    output.textContent = '';
    resetOutputScreen();
  }
  output.textContent += number;
}

function setOperator(newOperator) {
  operator = newOperator;
  currentOperand = output.textContent;
  currentOperand = parseFloat(currentOperand);
  shouldResetOutput = true;
}

function resetOutputScreen() {
  shouldResetOutput = false;
}

function equals() {
  lastOperand = currentOperand;
  currentOperand = output.textContent;
  currentOperand = parseFloat(currentOperand)
  output.textContent = round((operate(lastOperand, operator, currentOperand)));
  lastOperand = '';
}

function clear() {
  output.textContent = 0;
  currentOperand = '';
  lastOperand = '';
}

function decimal() {
  if (shouldResetOutput) {
    resetOutputScreen();
    output.textContent = '0';
  }

  if (output.textContent.includes('.')) return;
  
  output.textContent += '.'
}

function round(number) {
  return Math.round(number * 10000) / 10000
}

function backspace() {
  output.textContent = output.textContent.toString().slice(0, -1);
}

function keyboardSupport(e) {
  if (e.key >= 0 && e.key <=9) appendNum(e.key);
  if (e.key === '.') decimal();
  if (e.key === '=' || e.key === 'Enter') equals();
  if (e.key === 'Backspace') backspace();
  if (e.key === 'Escape') clear();
  if (e.key === '+' || e.key === '-' || e.key === '/') setOperator(e.key);
  if (e.key === '*') setOperator('x');
}

function operate(lastOperand, operator, currentOperand) {
  if (operator === '+') {
    return lastOperand + currentOperand;
  } else if (operator ==='-') {
    return lastOperand - currentOperand;
  } else if (operator === 'x') {
    return lastOperand * currentOperand
  } else if (operator === '/') { 
    return lastOperand / currentOperand;
  } else {
    return lastOperand % currentOperand;
  }
}