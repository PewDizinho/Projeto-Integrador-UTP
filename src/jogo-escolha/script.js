const questions = {
    "web": [
        {
            "pergunta": "Qual das seguintes opções NÃO é uma linguagem de programação?",
            "a": {
                "resposta": "Assembly",
                "correto": false,
                "mensagem": "Assembly é uma linguagem de baixo nível que se aproxima diretamente do código de máquina. É usada para programação de sistemas e controle de hardware, sendo altamente específica para a arquitetura do processador. Embora eficiente, sua complexidade é maior em comparação com linguagens de alto nível."
            },
            "b": {
                "resposta": "PHP",
                "correto": false,
                "mensagem": "PHP é amplamente utilizado para o desenvolvimento web. Interpretada pelo servidor, é conhecida por sua simplicidade e flexibilidade, sendo especialmente eficaz para criar páginas dinâmicas e interativas."
            },
            "c": {
                "resposta": "Bootstrap",
                "correto": true,
                "mensagem": "Bootstrap é um framework front-end popular que simplifica o desenvolvimento de sites responsivos e esteticamente agradáveis. Oferece uma série de componentes e estilos pré-definidos, facilitando a criação de interfaces modernas e consistentes."
            },
            "d": {
                "resposta": "Kotlin",
                "correto": false,
                "mensagem": "Kotlin é uma linguagem de programação moderna e concisa, amplamente utilizada para o desenvolvimento de aplicativos Android. Combina recursos poderosos com uma sintaxe limpa, tornando-a uma escolha popular entre os desenvolvedores."
            }
        }
    ],
    "fundamentos": [],
    "logica": [],
    "matematica": [
        {
            "pergunta": "Quais das alternativas abaixo representam o domínio da função f(x) = 3/x:",
            "a": {
                "resposta": "D(f) =  {x ∈ ℝ / x ≠ 0)",
                "correto": true,
                "mensagem": "Essa é a resposta correta!"
            },
            "b": {
                "pergunta": "D(f) = ℝ",
                "correto": false,
                "mensagem": "Esse domínio está incorreto pois como existe uma divisão na função X deve ser ≠ 0 para que seja possível de realizar a divisão."
            }
        }
    ]
}

let gameStatus = "init";
let questionObj = questions.web[0];
document.addEventListener("DOMContentLoaded", drawQuestion(questionObj))
function drawQuestion(question) {
    gameStatus = "playing";
    document.getElementById("question").innerText = question.pergunta;
    document.getElementById("awnser-1").innerText = question.a.resposta;
    document.getElementById("awnser-2").innerText = question.b.resposta;
    document.getElementById("awnser-3").innerText = question.c.resposta;
    document.getElementById("awnser-4").innerText = question.d.resposta;
}
const awnsers = document.getElementsByClassName("awnsers");
let selected;
for (let i of awnsers) {
    i.addEventListener("click", (e) => {
        if (gameStatus == "end") return;
        for (let i of awnsers) {
            i.classList = "awnsers";
        }

        if (selected == i.id) {
            i.classList = "awnsers";
            selected = "";
        } else {
            gameStatus = "selected";
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
    if (Math.floor(timerWidth) == 80) { timer.style.backgroundColor = "greenyellow" }
    if (Math.floor(timerWidth) == 50) { timer.style.backgroundColor = "yellow" }
    if (Math.floor(timerWidth) == 30) { timer.style.backgroundColor = "red" }
    if (Math.floor(timerWidth) == 10) { timer.style.backgroundColor = "rgb(77, 0, 0)" }
    timer.style.width = timerWidth + "%";
    if (timerWidth <= 0) {
        gameStatus = "end";
        checkForWin(selected, questionObj);
        return;
    };
    clearInterval(myCallBack);
    myCallBack = setInterval(tickTime, 10);
}

tickTime();

function checkForWin(selected, question) {
    if (selected) {

        let obj = question[["", "a", "b", "c", "d"][selected.replace("awnser-", "")]];
        obj.correto ? document.getElementById("result").innerText = `Correto! ${obj.mensagem}` : document.getElementById("result").innerText = `Errado! ${obj.mensagem}`;
    } else {
        document.getElementById("result").innerText = "Errado! Você não selecionou nenhuma resposta.";
    };
    setTimeout(() => {
        window.location.reload();
    }, 5000);
    //send back to another question
}