const timerObj = document.getElementById("timer");
const awnsers = document.getElementsByClassName("awnsers");

let questions, timerWidth = 100;
let points = {
    acertos: 0,
    erros: 0
}
timerCallBack = setTimeout(() => { }, 1);
let gameStatus = "init";
let question, selected = null;

async function getData() {
    let file = await fetch("./../assets/questions.json");
    questions = JSON.parse(await file.text());
    console.log(questions)
    return true;
}

async function init() {
    await getData();
    pickQuestion();
    for (let i of awnsers) {
        i.addEventListener("click", (e) => {

            if (gameStatus == "end") return;

            if (selected == i.id) {
                i.classList = "awnsers";
                selected = null;
            } else {
                selected = i.id;
                i.classList = "awnsers selected";
            }
            console.log(selected, i.id);

        })
    }
}


function animateTimer() {
    timerWidth -= 0.1;
    if (Math.floor(timerWidth) == 100) { timerObj.style.backgroundColor = "green" }
    if (Math.floor(timerWidth) == 80) { timerObj.style.backgroundColor = "greenyellow" }
    if (Math.floor(timerWidth) == 50) { timerObj.style.backgroundColor = "yellow" }
    if (Math.floor(timerWidth) == 30) { timerObj.style.backgroundColor = "red" }
    if (Math.floor(timerWidth) == 10) { timerObj.style.backgroundColor = "rgb(77, 0, 0)" }
    timerObj.style.width = timerWidth + "%";
    clearInterval(timerCallBack);
    if (timerWidth <= 0) {
        gameStatus = "end";
        checkForWin();
        setTimeout(() => timerWidth = 101, 2000);
        return;
    };
    timerCallBack = setInterval(animateTimer, 1);
}
const until = (conditionFunction) => {
    const poll = resolve => {
        if (conditionFunction()) resolve();
        else setTimeout(_ => poll(resolve), 400);
    }

    return new Promise(poll);
};


async function pickQuestion() {
    window.electronAPI.setStatistic("question", points);

    for (var i = 0; i < 3; i++) {
        let random = Math.floor(Math.random() * questions.web.length);
        console.log(random)
        question = questions.web[random];
        reset();
        drawQuestion();
        await until(() => { return timerWidth === 101 });
    };

    for (var i = 0; i < 2; i++) {
        let random = Math.floor(Math.random() * questions.fundamentos.length);
        question = questions.fundamentos[random];
        timerWidth = 100;
        reset();
        drawQuestion();
        await until(() => { return timerWidth === 101 });
    };

    for (var i = 0; i < 3; i++) {
        let random = Math.floor(Math.random() * questions.logica.length);
        question = questions.logica[random];
        timerWidth = 100;
        reset();
        drawQuestion();
        await until(() => { return timerWidth === 101 });
    };

    for (var i = 0; i < 2; i++) {
        let random = Math.floor(Math.random() * questions.matematica.length);
        question = questions.matematica[random];
        timerWidth = 100;
        reset();
        drawQuestion();
        await until(() => { return timerWidth === 101 });
    };
    window.electronAPI.setStatistic("question", points);


}
function drawQuestion() {
    document.getElementById("question").innerText = question.pergunta;
    document.getElementById("awnser-1").innerText = question.a.resposta;
    document.getElementById("awnser-2").innerText = question.b.resposta;
    document.getElementById("awnser-3").innerText = question.c.resposta ?? "";
    document.getElementById("awnser-4").innerText = question.d.resposta ?? "";


    animateTimer();
}



function checkForWin() {
    if (selected) {
        let obj = question[["", "a", "b", "c", "d"][selected.replace("awnser-", "")]];
        if (obj.correto) {
            document.getElementById("result").innerText = `Correto! ${obj.mensagem}`
            points.acertos++;
            return;
        }
        document.getElementById("result").innerText = `Errado! ${obj.mensagem}`;
    } else {
        document.getElementById("result").innerText = "Errado! Você não selecionou nenhuma resposta.";
    };
    points.erros++;
}


function reset() {
    timerWidth = 100;
    selected = null;
    gameStatus = "playing";
    document.getElementById("result").innerText = "";
    for (let i of awnsers) {
        i.classList = "awnsers";
    }
}



document.addEventListener("DOMContentLoaded", init); 