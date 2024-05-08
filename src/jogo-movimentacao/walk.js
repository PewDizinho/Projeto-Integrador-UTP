let playerPosition = [60, 400]; //X, Y
const playerObj = document.getElementById("player");
const playerSpeed = 20;
let jumpInterval, fallInterval, enemyInterval, enemyPosition;
let isOnAir = false;
let gameSituation = "playing";
let gamePoints = 0;
document.addEventListener("keydown", (e) => {
    let keysAction = {
        "w": () => {
            if (isOnAir || gameSituation != "playing") return;
            jump();
        },
      
        

    };
    if (e.keyCode == 32) {
        clearInterval(enemyInterval);//debug
    }
    keysAction[e.key] && keysAction[e.key]();


})


const jump = (e) => {
    let jumpHeight = 100;
    let jumpSpeed = 1;
    isOnAir = true;
    jumpInterval = setInterval(() => {
        playerPosition[1] -= jumpSpeed;
        playerObj.style.margin = `${playerPosition[1]}px ${playerPosition[0]}px`;
        jumpHeight -= jumpSpeed;
        if (jumpHeight <= 0) {
            clearInterval(jumpInterval);
            setTimeout(() => fall(), 150);

        }
    }, 1);
};

const fall = () => {
    let fallSpeed = 1;
    clearInterval(jumpInterval);
    fallInterval = setInterval(() => {
        playerPosition[1] += fallSpeed;
        playerObj.style.margin = `${playerPosition[1]}px ${playerPosition[0]}px`;
        if (playerPosition[1] >= 400) {
            clearInterval(fallInterval);
            playerPosition[1] = 400;
            playerObj.style.margin = `400px ${playerPosition[0]}px`;
            isOnAir = false;
        }
    }, 1);
}
//754px - 824px

const enemyObj = document.getElementById("enemy");

const enemyLifeCicle = () => {
    enemyPosition = -15;
    enemyObj.style.right = `${enemyPosition}px`;
    enemyInterval = setInterval(() => {
        enemyPosition++;
        enemyObj.style.right = `${enemyPosition}px`;
        document.getElementById("console").innerText = `Player Position: ${playerPosition[0]}, ${playerPosition[1]}\nEnemy Position: ${enemyPosition}\nGame Points: ${gamePoints}\nGame Situation: ${gameSituation}`

        checkForColission();
        if (enemyPosition >= 900) {
            clearInterval(enemyInterval);
            gamePoints++;
            enemyPosition = 1;
            if (gamePoints == 5) {
                clearInterval(enemyInterval);
                clearInterval(jumpInterval);
                clearInterval(fallInterval);
                gameSituation = "Win";
                document.getElementById("console").innerText = `Player Position: ${playerPosition[0]}, ${playerPosition[1]}\nEnemy Position: ${enemyPosition}\nGame Points: ${gamePoints}\nGame Situation: ${gameSituation}`


            } else enemyLifeCicle();

        }

    }, 1);



}
document.addEventListener("DOMContentLoaded", enemyLifeCicle)

const checkForColission = () => {

    let playerY = playerPosition[1];
    let enemyX = parseInt(enemyObj.style.right);
    let enemyY = 50;

    if (enemyX >= 754 && enemyX <= 824 && playerY >= 350) {
        clearInterval(enemyInterval);
        clearInterval(jumpInterval);
        clearInterval(fallInterval);
        gameSituation = "loose";
        document.getElementById("console").innerText = `Player Position: ${playerPosition[0]}, ${playerPosition[1]}\nEnemy Position: ${enemyPosition}\nGame Points: ${gamePoints}\nGame Situation: ${gameSituation}`

    }
}