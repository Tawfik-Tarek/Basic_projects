const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");
let displayValue = "0";
let stack = [];
let operator = null;
let waitingForOperand = false;

const updateDisplay = () => {
  display.innerText = displayValue;
};

const handleOperator = (nextOperator) => {

  const value = parseFloat(displayValue);

  if (operator && waitingForOperand) {
    stack[stack.length - 1] = nextOperator;
  } else {
    stack.push(value);
    stack.push(nextOperator);
    waitingForOperand = true;
  }
  operator = nextOperator;
  displayValue = nextOperator;
};

const calculate = () => {
  if (stack.length === 0) return parseFloat(displayValue);

  let result = stack[0];
  for (let i = 1; i < stack.length; i += 2) {
    const op = stack[i];
    const nextValue = stack[i + 1];

    if (op === "+") result += nextValue;
    if (op === "-") result -= nextValue;
    if (op === "*") result *= nextValue;
    if (op === "/") result /= nextValue;
  }
  return result;
};

const inputDigit = (digit) => {
  if (waitingForOperand) {
    displayValue = digit;
    waitingForOperand = false;
  } else {
    displayValue = displayValue === "0" ? digit : displayValue + digit;
  }
};

const inputDecimal = (dot) => {
  if (!displayValue.includes(dot)) {
    displayValue += dot;
  }
};

const clearAll = () => {
  displayValue = "0";
  stack = [];
  operator = null;
  waitingForOperand = false;
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const buttonValue = e.target.dataset.value;

    if (!isNaN(buttonValue)) {
      inputDigit(buttonValue);
    } else if (buttonValue === ".") {
      inputDecimal(buttonValue);
    } else if (buttonValue === "C") {
      clearAll();
    } else if (buttonValue === "=") {
      stack.push(parseFloat(displayValue));
      displayValue = String(calculate());
      stack = [];
      operator = null;
      waitingForOperand = false;
    } else {
      handleOperator(buttonValue);
    }
    updateDisplay();
  });
});

updateDisplay();
