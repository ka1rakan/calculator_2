const buttons = document.querySelectorAll(".button");
const display = document.querySelector(".display>p");
buttons.forEach(button => button.addEventListener("click", (e) => clickButton(e.target)));

let num1 = 0;
let num2 = 0;
let floatExp = 0;
let resultOnDisplay = 0;
let currOp = null;
function clickButton(button) {
    let isDot = false;
    if (button.id >= '0' && button.id <= '9') {
        if (currOp == null && !resultOnDisplay) {
            if (floatExp == 0) {
                num1 = num1 * 10;
            } else {
                num1 = num1 * (10 ** floatExp);
            }
            num1 += button.id - '0';
            if (floatExp > 0) {
                num1 = num1 / (10 ** floatExp);
                floatExp++;
            }
        } else if (currOp == null && resultOnDisplay) {
            num1 = button.id - '0';
        } else {
            if (floatExp == 0) {
                num2 = num2 * 10;
            } else {
                num2 = num2 * (10 ** floatExp)
            }
            num2 += button.id - '0';
            if (floatExp != 0) {
                num2 = num2 / (10 ** floatExp);
                floatExp++;
            }
        }
    } else if (button.id == 'x' || button.id == '/' || button.id == '+' || button.id == '-') {
        currOp = button.id;
        floatExp = 0;
    } else if (button.id == "del") {
        if (floatExp > 0) {
            floatExp--;
        }
        if (currOp == null) {
            num1 = Math.floor(num1 / 10);
        } else if (currOp != null && !num2) {
            currOp = null;
        } else {
            num2 = Math.floor(num2 / 10);
        }
    } else if (button.id == "clear") {
        num1 = 0;
        num2 = 0;
        currOp = null;
        floatExp = 0;
    } else if (button.id == '=') {
        operate();
    } else if (button.id == '.') {
        if (floatExp > 0) {
            return;
        }
        if (resultOnDisplay) {
            num1 = 0;
        }
        floatExp++;
        isDot = true;
    }
    renderDisplay(button.id, isDot);
    if (button.id != '=') {
        resultOnDisplay = 0;
    }
    console.log(`num1: ${num1}\nop: ${currOp}\nnum2: ${num2}\n resultOnDisplay: ${resultOnDisplay}\n`)
}

function operate() {
    if (currOp == 'x') {
        num1 = num1 * num2;
    } else if (currOp == '/') {
        num1 = num1 / num2;
    } else if (currOp == '+') {
        num1 = num1 + num2;
    } else if (currOp == '-') {
        num1 = num1 - num2;
    }
    resultOnDisplay = 1;
    num2 = 0;
    currOp = null;
}

function renderDisplay(button, isDot) {
    if (currOp == null) {
        display.textContent = `${num1}`;
        if (isDot) {
            display.textContent += '.';
        }
    } else if (num1 != 0 && currOp != null && num2 == 0) {
        display.textContent = `${num1} ${currOp}`;
    } else {
        display.textContent = `${num1} ${currOp} ${num2}`;
        if (isDot) {
            display.textContent += '.';
        }
    }
}
