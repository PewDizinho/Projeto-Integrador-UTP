

const playerSpeed = 20;
const enemySpeed = 2;
const gameSpeed = 1;
const player = document.getElementById("player");
let lastHitEnemy, lifePoint = 3;
let pointPosition, playerPosition = [160, 140];
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

};

const initGame = () => {
    spawnEnemyX();
};
let timeOutEnemy;


//------------------------------------------------------------

//------------------------------------------------------------
const spawnWallX = () => {

    const wall = document.createElement("div");
    wall.classList.add("wallEnemy");
    wall.id = "wall-left";
    document.getElementById("playground").appendChild(wall);

    const wallRight = document.createElement("div");
    wallRight.classList.add("wallEnemy");
    wallRight.id = "wall-right";

    wallRight.style.right = "0px";
    document.getElementById("playground").appendChild(wallRight);
    moveWallX(wall, wallRight);
};

let wallDirectionX = "ino";
const moveWallX = (wallLeft, wallRight) => {
    if (lifePoint <= 0) return;
    setTimeout(() => {
        if (new Number(wallRight.style.width.replace("px", "")) < 160 && wallDirectionX === "ino") {
            wallLeft.style.width = `${new Number(wallLeft.style.width.replace("px", "")) + 1}px`;
            wallRight.style.width = ` ${new Number(wallRight.style.width.replace("px", "")) + 1}px`;

            checkForColissionWallX(wallLeft);
            checkForColissionWallX(wallRight);
            moveWallX(wallLeft, wallRight);
        } else {
            wallDirectionX = "voltano";
            if (new Number(wallRight.style.width.replace("px", "")) > 0) {
                wallLeft.style.width = `${new Number(wallLeft.style.width.replace("px", "")) - 1}px`;
                wallRight.style.width = ` ${new Number(wallRight.style.width.replace("px", "")) - 1}px`;
                checkForColissionWallX(wallLeft);
                checkForColissionWallX(wallRight);
                moveWallX(wallLeft, wallRight);
            } else {
                wallLeft.remove();
                wallRight.remove();
                spawnWallY()

            }
        }
    }, 10);
}

const spawnWallY = () => {

    const wall = document.createElement("div");
    wall.classList.add("wallEnemyTop");
    wall.id = "wall-top";
    document.getElementById("playground").appendChild(wall);

    const wallBottom = document.createElement("div");
    wallBottom.classList.add("wallEnemyTop");
    wallBottom.id = "wall-top";

    wallBottom.style.bottom = "0px";
    document.getElementById("playground").appendChild(wallBottom);
    moveWallY(wall, wallBottom);
};

let wallDirectionY = "ino";
const moveWallY = (wallTop, wallBottom) => {
    if (lifePoint <= 0) return;
    setTimeout(() => {
        if (new Number(wallTop.style.height.replace("px", "")) < 160 && wallDirectionY === "ino") {
            wallTop.style.height = `${new Number(wallTop.style.height.replace("px", "")) + 1}px`;
            wallBottom.style.height = ` ${new Number(wallBottom.style.height.replace("px", "")) + 1}px`;

            checkForColissionWallY(wallTop);
            checkForColissionWallY(wallBottom);
            moveWallY(wallTop, wallBottom);
        } else {
            wallDirectionY = "voltano";
            if (new Number(wallBottom.style.height.replace("px", "")) > 0) {
                wallTop.style.height = `${new Number(wallTop.style.height.replace("px", "")) - 1}px`;
                wallBottom.style.height = ` ${new Number(wallBottom.style.height.replace("px", "")) - 1}px`;
                checkForColissionWallY(wallTop);
                checkForColissionWallY(wallBottom);
                moveWallY(wallTop, wallBottom);
            } else {
                wallTop.remove();
                wallBottom.remove();
                spawnWallX()
            }
        }
    }, 10);
}
let timeOutEnemyWall;
const checkForColissionWallY = (wall) => {
    const wallHeight = new Number(wall.style.height.replace("px", ""));

    const wallPosition = wall.style.bottom ? 360 - wallHeight : 0;
    const wallPositionEnd = wallPosition + wallHeight;
    if (playerPosition[1] < wallPositionEnd &&
        playerPosition[1] + 20 > wallPosition) {
        timeOutEnemyWall = setTimeout(() => { lastHitEnemy = '' }, 1000);
        if (lastHitEnemy === wall.id) return;
        if (timeOutEnemyWall) clearTimeout(timeOutEnemyWall);
        lifePoint--;
        lastHitEnemy = wall.id;
        document.getElementById("vida").innerText = ("Vida - " + lifePoint)
        for (let element of document.body.getElementsByTagName('*')) {
            element.style.animation = "shake 0.5s";
            setTimeout(() => {
                element.style.animation = "none";
            }, 500);
        }
        console.log(lifePoint)
        if (lifePoint > 0) return;
        loose();
    }


}
const checkForColissionWallX = (wall) => {
    const wallWidth = new Number(wall.style.width.replace("px", ""));
    const wallPosition = wall.style.right ? 360 - wallWidth : 0;
    const wallPositionEnd = wallPosition + wallWidth;
    if (playerPosition[0] < wallPositionEnd &&
        playerPosition[0] + 20 > wallPosition) {
        timeOutEnemyWall = setTimeout(() => { lastHitEnemy = '' }, 1000);
        if (lastHitEnemy === wall.id) return;
        if (timeOutEnemyWall) clearTimeout(timeOutEnemyWall);
        lifePoint--;
        lastHitEnemy = wall.id;
        document.getElementById("vida").innerText = ("Vida - " + lifePoint)
        for (let element of document.body.getElementsByTagName('*')) {
            element.style.animation = "shake 0.5s";
            setTimeout(() => {
                element.style.animation = "none";
            }, 500);
        }
        console.log(lifePoint)
        if (lifePoint > 0) return;
        loose();
    }

}
//------------------------------------------------------------

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
};
const moveEnemyX = (enemy) => {
    if (lifePoint <= 0) return;
    myTimeout = setTimeout(() => {
        enemy.style.margin = `${enemy.offsetTop + enemySpeed}px ${enemy.offsetLeft}px`;
        if (enemy.offsetTop > 340) {
            enemy.remove();
            spawnEnemyY();

            return;
        }
        checkForColissionBlock(enemy);
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
};
const moveEnemyY = (enemy) => {
    if (lifePoint <= 0) return;

    myOtherTimeout = setTimeout(() => {
        enemy.style.margin = `${enemy.offsetTop}px ${enemy.offsetLeft + enemySpeed}px`;
        if (enemy.offsetLeft > 340) {
            enemy.remove();
            spawnWallX()
            return;
        }
        checkForColissionBlock(enemy);
        moveEnemyY(enemy);
    }, 20);
};
//------------------------------------------------------------
const checkForColissionBlock = (enemy) => {


    if (playerPosition[0] < enemy.offsetLeft + 20 &&
        playerPosition[0] + 20 > enemy.offsetLeft &&
        playerPosition[1] < enemy.offsetTop + 20 &&
        playerPosition[1] + 20 > enemy.offsetTop) {
        if (lastHitEnemy === enemy.id) return;
        if (timeOutEnemy) clearTimeout(timeOutEnemy);
        timeOutEnemy = setTimeout(() => { lastHitEnemy = '' }, 500);

        lifePoint--;
        document.getElementById("vida").innerText = ("Vida - " + lifePoint)
        lastHitEnemy = enemy.id;
        for (let element of document.body.getElementsByTagName('*')) {
            element.style.animation = "shake 0.5s";
            setTimeout(() => {
                element.style.animation = "none";
            }, 500);
        }
        if (lifePoint > 0) return;
        loose();
    }

};
//------------------------------------------------------------
const loose = () => {
    document.getElementById("gameOver").style.display = "block";
    document.getElementById("gameOver").style.animation = "gameOverLight 1s ease-in-out infinite";
    setTimeout(() => {
        player.style.animation = "fallOffTheScreen 2s infinite linear";
        setTimeout(() => {
            player.style.animation = "none";
            player.style.margin = "1000px"
        }, 1900)

    }, 500);

    clearInterval(walk);
    clearInterval(myTimeout);
    clearInterval(myOtherTimeout);
    document.getElementById("console").innerText = "Game Over";
}
document.addEventListener("DOMContentLoaded", () => initGame());