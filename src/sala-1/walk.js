import { dialog } from "../util/dialogo.js";

const player = document.getElementById("player");

let walls = [
    [
        [-1, 240], [270, 150]
    ],
    [
        [], []
    ]
];
const playerSpeed = 30;
const gameSpeed = 1.7;
let skin = 1;
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
        player.src = `../assets/player-1.png`;

        clearInterval(walk);
    }
});
const walkDelay = (key) => {

    let keysAction = {
        "w": () => {

            if (playerPosition[1] > 0 && !checkCollision(0, new Number(playerSpeed) * -1)) {
                playerPosition[1] -= playerSpeed;
            }
            player.style.transform = 'rotate(180deg)';

        },
        "s": () => {
            if (playerPosition[1] < 600 && !checkCollision(0, playerSpeed)) {
                playerPosition[1] += playerSpeed;
            }
            player.style.transform = 'rotate(0deg)';

        },
        "d": () => {
            if (playerPosition[0] < 840 && !checkCollision(playerSpeed, 0)) {
                playerPosition[0] += playerSpeed;
            }
            player.style.transform = 'rotate(-90deg)';

        },
        "a": () => {
            if (playerPosition[0] > 0 && !checkCollision(new Number(playerSpeed) * -1, 0)) {
                playerPosition[0] -= playerSpeed;
            }
            player.style.transform = 'rotate(90deg)';

        },
    };
    keysAction[key] && keysAction[key]();

    player.style.margin = `${playerPosition[1]}px ${playerPosition[0]}px`;
    clearInterval(walk);
    walk = setInterval(() => { walkDelay(key) }, gameSpeed * 100);

    skin !== 3 ? skin++ : skin = 2;
    document.getElementById("console").innerText = `Player X: ${playerPosition[0]} Y: ${playerPosition[1]} | Collision: ${checkCollision(0, 0)}`
    player.src = `../assets/player-${skin}.png`;
}
const checkCollision = (x, y) => {
    let playerX = playerPosition[0] + x;
    let playerY = playerPosition[1] + y;
    console.log(playerX, playerY)
    let collision = false;
    if (playerX < 0 || playerX > 840 || playerY < 0 || playerY > 600) return true;
    walls.forEach(wall => {
        let startWall = wall[0];
        let endWall = wall[1];
        if (playerX > startWall[0] && playerX < endWall[0] && playerY < startWall[1] && playerY > endWall[1]) {
            collision = true;

        }
    });
    return collision;
};

dialog("Mark", "Isso aqui demorou muito pra fazer, na verdade, não é nem que demorou muito foi mais eu com sono tentando fazer um código complicado desse fucionar na merda do html e do caralhudo do javascript puro e agora eu tenho que continuar enchendo linguiça nesse texto pra que eu consiga mostrar o que eu quero mostrar nessa caralha agora acabou o espaço daqui E a partir daqui o texto é diferente, pq ele não coube no outro dialogo, então o código jogou ele pra essa segunda tela automaticamente", document.getElementsByTagName("body")[0]);
