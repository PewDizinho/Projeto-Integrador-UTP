import { dialog } from "../util/dialogo.js";
const player = document.getElementById("player");
const playerSpeed = 30;
const gameSpeed = 1.7;
let skin = 1;
// const setButton = document.getElementById('btn')
// setButton.addEventListener('click', () => {

//   window.electronAPI.setTitle('')
// })

//Temp Confignp
let playerPosition = [60, 300]; //X, Y
let isWalking = false;
let walk, direction;

dialog("Paulo", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", document.getElementsByTagName("body")[0]);

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
        player.src = `../assets/player-1.png`;

        clearInterval(walk);
    }
});
const walkDelay = (key) => {
    let keysAction = {
        "w": () => {
            playerPosition[1] -= playerSpeed;
            player.style.transform = 'rotate(180deg)';
        },
        "s": () => {
            playerPosition[1] += playerSpeed;
            player.style.transform = 'rotate(0deg)';

        },
        "d": () => {
            playerPosition[0] += playerSpeed;
            player.style.transform = 'rotate(-90deg)';

        },
        "a": () => {
            playerPosition[0] -= playerSpeed;
            player.style.transform = 'rotate(90deg)';

        },
    };
    keysAction[key] && keysAction[key]();
    skin !== 3 ? skin++ : skin = 2;


    player.src = `../assets/player-${skin}.png`;
    player.style.margin = `${playerPosition[1]}px ${playerPosition[0]}px`;
    clearInterval(walk);
    walk = setInterval(() => { walkDelay(key) }, gameSpeed * 100);

}

const print = (text) => document.getElementById("console").innerText = text;
