const playerSpeed = 20;
let questions, enemySpeed = 2;
const gameSpeed = 1;
const player = document.getElementById("player");
let lastHitEnemy, walk, myTimeout, myOtherTimeout, direction, lifePoint = 3;
let pointPosition, playerPosition = [160, 140];
let gameStatus = "playing";
let isWalking = false;
player.style.margin = `${playerPosition[1]}px ${playerPosition[0]}px`;
document.addEventListener("keydown", function (event) {
    if (["w", "s", "d", "a"].indexOf(event.key.toLowerCase()) != -1) {
        if (direction != event.key.toLowerCase()) {
            clearInterval(walk);
            isWalking = false;
        }
        direction = event.key.toLowerCase();
        if (isWalking) return;
        clearInterval(walkDelay);
        isWalking = true;
        walkDelay(event.key.toLowerCase());
    }
});
document.addEventListener("keyup", function (event) {
    if (["w", "s", "d", "a"].indexOf(event.key.toLowerCase()) != -1) {
        if (event.key.toLowerCase() != direction) return;
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


    player.style.margin = `${playerPosition[1]}px ${playerPosition[0]}px`;
    clearInterval(walk);
    walk = setInterval(() => { walkDelay(key) }, gameSpeed * 100);

};
let timeOutEnemy;
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
                animationIsOver = true;
                wallDirectionX = "ino";
            }
        }
    }, enemySpeed);
};
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
                animationIsOver = true;
                wallDirectionY = "ino";
            }
        }
    }, 1);
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
        if (lifePoint > 0) return;
        loose();
    }

}
//------------------------------------------------------------
let animationIsOver = false;
const spawnEnemyX = () => {
    for (let i = 0; i < 18; i++) {
        const enemy = document.createElement("div");
        if (i % 2 !== 0) continue;
        enemy.style.width = "20px";
        enemy.style.height = "20px";
        enemy.style.backgroundColor = "yellow";
        enemy.style.position = "absolute";
        enemy.style.margin = `0px ${i * 20}px`;
        enemy.id = i;
        document.getElementById("playground").appendChild(enemy);
        moveEnemyX(enemy, true);

    }
};
const moveEnemyX = (enemy, root) => {
    if (lifePoint <= 0) return "Game Over";
    myTimeout = setTimeout(() => {
        enemy.style.margin = `${enemy.offsetTop + enemySpeed}px ${enemy.offsetLeft}px`;
        if (enemy.offsetTop > 340) {
            enemy.remove();
            animationIsOver = true;
            return;
        }
        checkForColissionBlock(enemy);
        moveEnemyX(enemy, false);
    }, 20);
};
const spawnEnemyY = () => {
    for (let i = 0; i < 18; i++) {
        const enemy = document.createElement("div");
        if (i % 2 !== 0) continue;
        enemy.style.width = "20px";
        enemy.style.height = "20px";
        enemy.style.backgroundColor = "yellow";
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
            animationIsOver = true;

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
    gameStatus = "loose";
    document.getElementById("gameOver").style.display = "block";
    document.getElementById("gameOver").style.animation = "gameOverLight 1s ease-in-out infinite";
    setTimeout(() => {
        player.style.animation = "fallOffTheScreen 2s infinite linear";
        setTimeout(() => {
            player.style.animation = "none";
            player.style.margin = "1000px"
            setTimeout(() => {
                location.reload();
            }, 1000)
        }, 1900)

    }, 500);
    clearInterval(walk);
    clearInterval(myTimeout);
    clearInterval(myOtherTimeout);
    document.getElementById("console").innerText = "Game Over";
};
const gameOrder = [

    {
        execute: () => { spawnEnemyX(); },
        speed: 1
    },
    {
        execute: () => { initQuestion(); },
        speed: 0
    },

    {
        execute: () => { spawnEnemyX(); },
        speed: 1
    },
    {
        execute: () => { spawnEnemyY(); },
        speed: 0
    },
    {
        execute: () => { initQuestion(); },
        speed: 0
    },
    {
        execute: () => { spawnEnemyY(); spawnEnemyX(); },
        speed: 0
    },
    {
        execute: () => { initQuestion(); },
        speed: 0
    },
    {
        execute: () => { spawnWallY(); },
        speed: -5
    },
    {
        execute: () => { spawnWallX(); },
        speed: -1
    },

];
const wait = async () => {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (finished) {
                resolve(true)
            } else resolve(false)
        }, 50);
    });
};
//------------------------------------------------------------
//------------------------------------------------------------
//------------------------------------------------------------
let pergunta;
const initQuestion = () => {
    const avaibleQuestions = ["web", "fundamentos", "logica", "matematica"];
    let subjectSelected = avaibleQuestions[Math.floor(Math.random() * avaibleQuestions.length)];
    pergunta = questions[subjectSelected][Math.floor(Math.random() * questions[subjectSelected].length)];
    const perguntaObj = document.getElementById("question");
    perguntaObj.innerText = pergunta["pergunta"];
    questionIncrease();
};

let questionCounter = 0;
let anotherFuckingtimeout = setTimeout(() => { }, 1);
const questionDecrease = () => {
    const question1 = document.getElementById("question1");
    const question2 = document.getElementById("question2");
    clearTimeout(anotherFuckingtimeout);
    anotherFuckingtimeout = setTimeout(() => {
        questionCounter--;
        question1.style.width = questionCounter + "px";
        question2.style.width = questionCounter + "px";
        if (questionCounter == 0) {
            document.getElementById("question").innerText = ""
            animationIsOver = true;
            return;
        }
        questionDecrease();
    }, 1);
}
const questionIncrease = () => {
    const question1 = document.getElementById("question1");
    const question2 = document.getElementById("question2");
    clearTimeout(anotherFuckingtimeout);
    anotherFuckingtimeout = setTimeout(() => {
        questionCounter++;
        question1.style.width = questionCounter + "px";
        question2.style.width = questionCounter + "px";
        if (questionCounter == 180) {

            animateTimer();
            return;
        }
        questionIncrease();
    }, 1);
}
let wallkillDirection = "ino";
const killLeftSide = () => {
    const wall = document.createElement("div");
    wall.classList.add("wallEnemy");
    wall.id = "wall-left";
    document.getElementById("playground").appendChild(wall);
    moveKillWall(wall);

}
function moveKillWall(wall) {
    setTimeout(() => {
        if (new Number(wall.style.width.replace("px", "")) <= 177 && wallkillDirection === "ino") {
            wall.style.width = `${new Number(wall.style.width.replace("px", "")) + 6}px`;
            checkForColissionWallX(wall);
            moveKillWall(wall);
        } else {
            wallkillDirection = "voltano";
            if (new Number(wall.style.width.replace("px", "")) > 0) {
                wall.style.width = `${new Number(wall.style.width.replace("px", "")) - 1}px`;
                checkForColissionWallX(wall);
                moveKillWall(wall);
            } else {
                wall.remove();
                questionDecrease();
                wallkillDirection = "ino";
            }
        }
    }, 1);
}
const killRightSide = () => {
    const wallRight = document.createElement("div");
    wallRight.classList.add("wallEnemy");
    wallRight.id = "wall-right";
    wallRight.style.right = "0px";
    document.getElementById("playground").appendChild(wallRight);
    moveKillWall(wallRight);

}
function killWrongSide() {
    pergunta["correto"] ? killLeftSide() : killRightSide();
}
let timerWidth = 101;
let timerCallBack = setTimeout(() => { }, 1);
let timerObj = document.getElementById("timer");
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
        setTimeout(() => timerWidth = 102, 2000);
        killWrongSide();
        return;
    };
    timerCallBack = setInterval(animateTimer, 10);
}
//------------------------------------------------------------
//------------------------------------------------------------
//------------------------------------------------------------
const initGame = async () => {
    await getData();
    setTimeout(async () => {
        for (let order of gameOrder) {
            enemySpeed += order.speed;
            order.execute();
            await until(() => animationIsOver === true);//<---a
            animationIsOver = false;
        }
        if (gameStatus == "playing") {
            window.electronAPI.setConfig("win", { win: true, room: window.electronAPI.getConfig("playerRoom"), enemyName: window.electronAPI.getConfig("enemyName") });
            setTimeout(() => location.href = window.electronAPI.getConfig("playerRoom"), 3000);
        }
    }, 1500)
};

const getData = async () => {
    let file = await fetch("./../../assets/questions.json");
    questions = JSON.parse(await file.text());
    console.log(questions)
    return true;
}
const until = (conditionFunction) => {
    const poll = resolve => {
        if (conditionFunction()) resolve();
        else setTimeout(_ => poll(resolve), 400);
    }

    return new Promise(poll);
}
document.addEventListener("DOMContentLoaded", () => initGame());