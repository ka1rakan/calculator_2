const buttons = document.querySelectorAll(".button");
buttons.forEach(button => button.addEventListener("click", (e) =>));

let currentNum = 0;
function clickButton(button) {
    if (button.id >= '0' && button.id <= '9') {
        currentNum = currentNum * 10;
        currentNum += +button.id
    }
    console.log(currentNum);
}
