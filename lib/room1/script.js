
const awnsers = document.getElementsByClassName("awnsers");
let selected;
for (let i of awnsers) {
    i.addEventListener("click", (e) => {

        for (let i of awnsers) { //Coisa feia que tem que arrumar depois
            i.classList = "awnsers";
        }

        if (selected == i.id) {
            i.classList = "awnsers";
            selected = "";
        } else {
            selected = i.id;
            i.classList = "awnsers selected";
        }
    })
}


//timer

const timer = document.getElementById("timer");
let timerWidth = "100";
let myCallBack;
const tickTime = () => {
    timerWidth -= 0.1;
    console.log(timerWidth)
    if (Math.floor(timerWidth) == 80) { timer.style.backgroundColor = "greenyellow" }
    if (Math.floor(timerWidth) == 50) { timer.style.backgroundColor = "yellow" }
    if (Math.floor(timerWidth) == 30) { timer.style.backgroundColor = "red" }
    if (Math.floor(timerWidth) == 10) { timer.style.backgroundColor = "rgb(77, 0, 0)" }
    timer.style.width = timerWidth + "%";
    if (timerWidth <= 0) {
        document.getElementById("result").innerText = "ACERTOU!!!!!!!!"
        return;
    };
    clearInterval(myCallBack);
    myCallBack = setInterval(tickTime, 10);
}

tickTime();