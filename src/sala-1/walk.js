const player = document.getElementById("player");
const playerSpeed = 20;
const gameSpeed = 1.7;


// const setButton = document.getElementById('btn')
// setButton.addEventListener('click', () => {

//   window.electronAPI.setTitle('')
// })

//Temp Confignp
let playerPosition = [60, 300]; //X, Y
let isWalking = false;
let walk, direction;
document.addEventListener("keydown", function (event) {
    if (["w", "s", "d", "a"].indexOf(event.key) != -1) {
        if (direction != event.key) {
            clearInterval(walk);
            isWalking = false;
        }
        direction = event.key;
        if (isWalking) return;
        clearInterval(walkDelay);
        isWalking = true;
        walkDelay(event.key);
    }
});

document.addEventListener("keyup", function (event) {
    if (["w", "s", "d", "a"].indexOf(event.key) != -1) {
        if (event.key != direction) return;
        isWalking = false;
        clearInterval(walk);
    }
});
const walkDelay = (key) => {
    let keysAction = {
        "w": () => {
            playerPosition[1] -= playerSpeed;
        },
        "s": () => {
            playerPosition[1] += playerSpeed;
        },
        "d": () => {
            playerPosition[0] += playerSpeed;
        },
        "a": () => {
            playerPosition[0] -= playerSpeed;
        },
    };
    keysAction[key] && keysAction[key]();
    player.style.margin = `${playerPosition[1]}px ${playerPosition[0]}px`;
    clearInterval(walk);
    walk = setInterval(() => { walkDelay(key) }, gameSpeed * 100);

}

const print = (text) => document.getElementById("console").innerText = text;
