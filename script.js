const buttons = document.querySelectorAll(".button");
const display = document.querySelector(".display>p");
buttons.forEach(button => button.addEventListener("click", (e) => clickButton(e.target)));

let num1 = 0;
let num2 = 0;
let floating = false;
let result;
let currOp = null;
function clickButton(button) {
    if (button.id >= '0' && button.id <= '9') {
        if (currOp == null) {
            num1 = num1 * 10;
            num1 += button.id - '0';
            if (floating) {
                num1 = num1 / 10;
            }
            display.textContent = num1;
        } else {
            num2 = num2 * 10;
            num2 += button.id - '0';
            if (floating) {
                num2 = num2 / 10;
            }
            display.textContent = `${num1} ${currOp} ${num2}`;
        }
    } else if (button.id == 'x' || button.id == '/' || button.id == '+' || button.id == '-') {
        if (currOp != null) {
            operate();
            num1 = result;
            num2 = 0;
            result = null;
        }
        currOp = button.id;
        floating = false;
        display.textContent = `${num1} ${button.id} `;
    } else if (button.id == "del") {
        if (floating) {
            floating = false;
        }
        if (currOp == null) {
            num1 = Math.floor(num1 / 10);
        } else {
            num2 = Math.floor(num2 / 10);
        }
    } else if (button.id == "clear") {
        num1 = 0;
        num2 = 0;
        currOp = null;
        floating = false;
        display.textContent = "0";
    } else if (button.id == '=') {
        operate();
    } else if (button.id == '.') {
        floating = true;
    }
    console.log(`num1: ${num1}\nop: ${currOp}\nnum2: ${num2}\nresult: ${result}`)
}

function operate() {
    if (currOp == 'x') {
        result = num1 * num2;
    } else if (currOp == '/') {
        result = num1 / num2;
    } else if (currOp == '+') {
        result = num1 + num2;
    } else if (currOp == '-') {
        result = num1 - num2;
    }
    floating = false;
    display.textContent = `= ${result}`;
}
