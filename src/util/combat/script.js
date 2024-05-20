export function combat(callBack, enemyName) {
    location.href = "../util/combat/index.html";
}

const playerSpeed = 20;
const enemySpeed = 2;
const gameSpeed = 1;
const player = document.getElementById("player");
let lastHitEnemy, lifePoint = 3;
let pointPosition, playerPosition = [60, 60];
let isWalking = false;
let walk, myTimeout, myOtherTimeout, direction;
player.style.margin = `${playerPosition[1]}px ${playerPosition[0]}px`;
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

            if (playerPosition[1] > 0) {
                playerPosition[1] -= playerSpeed;
            }

        },
        "s": () => {
            if (playerPosition[1] < 330) {
                playerPosition[1] += playerSpeed;
            }

        },
        "d": () => {
            if (playerPosition[0] < 330) {
                playerPosition[0] += playerSpeed;
            }

        },
        "a": () => {
            if (playerPosition[0] > 0) {
                playerPosition[0] -= playerSpeed;
            }

        },
    };
    keysAction[key] && keysAction[key]();
    document.getElementById("console").innerText = `Player X: ${playerPosition[0]} Y: ${playerPosition[1]}`

    player.style.margin = `${playerPosition[1]}px ${playerPosition[0]}px`;
    clearInterval(walk);
    walk = setInterval(() => { walkDelay(key) }, gameSpeed * 100);

}

const initGame = () => {
    spawnEnemyY();
    spawnEnemyX();

}

const checkForColission = (enemy) => {


    if (playerPosition[0] < enemy.offsetLeft + 20 &&
        playerPosition[0] + 20 > enemy.offsetLeft &&
        playerPosition[1] < enemy.offsetTop + 20 &&
        playerPosition[1] + 20 > enemy.offsetTop) {
        if (lastHitEnemy === enemy.id) return;
        lifePoint--;
        document.getElementById("vida").innerText = ("Vida - " + lifePoint)
        lastHitEnemy = enemy.id;
        if (lifePoint !== 0) return;

        clearInterval(walk);
        clearInterval(myTimeout);
        clearInterval(myOtherTimeout);
        player.style.backgroundColor = "red";
        document.getElementById("console").innerText = "Game Over";
    }

}
const spawnEnemyX = () => {
    for (let i = 0; i < 18; i++) {
        const enemy = document.createElement("div");
        if (i % 2 !== 0) continue;
        enemy.style.width = "20px";
        enemy.style.height = "20px";
        enemy.style.backgroundColor = "red";
        enemy.style.position = "absolute";
        enemy.style.margin = `0px ${i * 20}px`;
        enemy.id = i;
        document.getElementById("playground").appendChild(enemy);
        moveEnemyX(enemy);
    }
}

const moveEnemyX = (enemy) => {
    myTimeout = setTimeout(() => {
        enemy.style.margin = `${enemy.offsetTop + enemySpeed}px ${enemy.offsetLeft}px`;
        if (enemy.offsetLeft > 330) {
            enemy.remove();
            return;
        }
        checkForColission(enemy);
        moveEnemyX(enemy);
    }, 20);
};

const spawnEnemyY = () => {
    for (let i = 0; i < 18; i++) {
        const enemy = document.createElement("div");
        if (i % 2 !== 0) continue;
        enemy.style.width = "20px";
        enemy.style.height = "20px";
        enemy.style.backgroundColor = "red";
        enemy.style.position = "absolute";
        enemy.style.margin = `${i * 20}px 0px `;
        enemy.id = i;
        document.getElementById("playground").appendChild(enemy);
        moveEnemyY(enemy);
    }
}

const moveEnemyY = (enemy) => {
    myOtherTimeout = setTimeout(() => {
        enemy.style.margin = `${enemy.offsetTop}px ${enemy.offsetLeft + enemySpeed}px`;
        if (enemy.offsetTop > 330) {
            enemy.remove();
            return;
        }
        checkForColission(enemy);
        moveEnemyY(enemy);
    }, 20);
};


document.addEventListener("DOMContentLoaded", () => initGame());