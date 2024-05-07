const player = document.getElementById("player");
const playerSpeed = 20;
const gameSpeed = 1;



//Temp Config
let playerPosition = [0, 0]; //X, Y
let isWalking = false;
let walk, direction;
document.addEventListener("keydown", function (event) {
    // print(event.key);
    if (direction != event.key) {
        clearInterval(walk);
        isWalking = false;
    }
    direction = event.key;
    if (isWalking) return;
    clearInterval(walkDelay);
    
    isWalking = true;
    walkDelay(event.key);

});

document.addEventListener("keyup", function (event) {
    isWalking = false;
    clearInterval(walk);
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
    keysAction[key]();
    player.style.margin = `${playerPosition[1]}px ${playerPosition[0]}px`;
    clearInterval(walk);
    walk = setInterval(() => { walkDelay(key) }, gameSpeed * 100);

}

const print = (text) => document.getElementById("console").innerText = text;
