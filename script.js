const buttons = document.querySelectorAll(".button");
const display = document.querySelector(".display>p");
buttons.forEach(button => button.addEventListener("click", (e) => {
    clickButton(e.target.id)
    doClickEffect(e.target);
}));
document.addEventListener("keydown", (e) => {
    let keyName = e.key;
    if ((keyName >= '0' && keyName <= '9') || keyName == '/' ||
        keyName == '-' || keyName == '+' || keyName == '=' || keyName == '.') {
        clickButton(keyName);
    } else if (keyName == "Backspace") {
        clickButton("del");
    } else if (keyName == '*') {
        clickButton('x');
    } else if (keyName == "Enter") {
        clickButton('=');
    }
})

let num1 = null;
let num2 = null;
let floatExp = 0;
let digits = 0;
let resultOnDisplay = 0;
let currOp = null;
let rounded = 0;
function clickButton(keyName) {
    playClickSound();
    let dotPressed = false;
    if (keyName >= '0' && keyName <= '9') {
        digits++;
        if (digits > 8) {
            return;
        }
        if (currOp == null && !resultOnDisplay) {
            if (num1 == null) {
                num1 = 0;
            }

            if (floatExp == 0) {
                num1 = num1 * 10;
            } else {
                num1 = num1 * (10 ** floatExp);
            }
            num1 += keyName - '0';
            if (floatExp > 0) {
                num1 = num1 / (10 ** floatExp);
                floatExp++;
            }
        } else if (currOp == null && resultOnDisplay) {
            num1 = keyName - '0';
        } else {
            if (num2 == null) {
                num2 = 0;
            }
            if (floatExp == 0) {
                num2 = num2 * 10;
            } else {
                num2 = num2 * (10 ** floatExp)
            }
            num2 += keyName - '0';
            if (floatExp != 0) {
                num2 = num2 / (10 ** floatExp);
                floatExp++;
            }
        }
    } else if (keyName == 'x' || keyName == '/' || keyName == '+' || keyName == '-') {
        currOp = keyName;
        floatExp = 0;
        digits = 0;
    } else if (keyName == "del") {
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
    } else if (keyName == "clear") {
        num1 = null;
        num2 = null;
        currOp = null;
        floatExp = 0;
        digits = 0;
    } else if (keyName == '=') {
        if (currOp == null || num2 == null) {
            return;
        }
        operate();
    } else if (keyName == '.') {
        if (floatExp > 0) {
            return;
        }
        if (resultOnDisplay || num1 == null) {
            num1 = 0;
        }
        floatExp++;
        dotPressed = true;
    }
    if (keyName == '=' && !resultOnDisplay) {
        return;
    }

    renderDisplay(keyName, dotPressed);
    if (keyName != '=') {
        resultOnDisplay = 0;
    }
    console.log(`num1: ${num1}\nop: ${currOp}\nnum2: ${num2}\nresultOnDisplay: ${resultOnDisplay}\n`)
}

function operate() {
    if (currOp == 'x') {
        num1 = num1 * num2;
        if (num1 > 1000000000000000) {
            num1 = Math.round(num1 / 100000);
            rounded = 1;
        }
        if (num1 > 100000000000000) {
            num1 = Math.round(num1 / 10000);
            rounded = 1;
        }
    } else if (currOp == '/') {
        if (num2 == 0) {
            resultOnDisplay = 0;
            num1 = null;
            num2 = null;
            currOp = null;
            display.textContent = "ERROR";
            return;
        }
        num1 = num1 / num2;
    } else if (currOp == '+') {
        num1 = num1 + num2;
    } else if (currOp == '-') {
        num1 = num1 - num2;
    }
    resultOnDisplay = 1;
    num2 = null;
    currOp = null;
}

function renderDisplay(button, dotPressed) {
    num1 = Math.round(num1 * 10 ** 8) / 10 ** 8;
    if (num2 != null) {
        num2 = Math.round(num2 * 10 ** 8) / 10 ** 8;
    }
    if (currOp == null) {
        if (num1 == null) {
            num1 = 0;
        }
        if (rounded) {
            display.textContent = `${num1}...`;
            rounded = 0;
            num1 = 0;
            return;
        }
        display.textContent = `${num1}`;
        if (dotPressed) {
            display.textContent += '.';
        }
    } else if (num1 != null && currOp != null && num2 == null) {
        display.textContent = `${num1} ${currOp}`;
    } else {
        display.textContent = `${num1} ${currOp} ${num2}`;
        if (dotPressed) {
            display.textContent += '.';
        }
    }
}

function playClickSound() {
    let click = new Audio('sounds/click.wav');
    click.play();
}

function doClickEffect(clicked) {
    clicked.style.backgroundColor = "#b5b5b5";
    setTimeout(() => {
        clicked.style.backgroundColor = "whitesmoke";
    }, 150);
}
