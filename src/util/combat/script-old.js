export function combat(callBack, enemyName) {
    location.href = "../util/combat/index.html";

}






const playerSpeed = 20;
const enemySpeed = 2;
const gameSpeed = 1;
const player = document.getElementById("player");
let pointPosition, playerPosition = [0, 0];
let isWalking = false;
let walk, myTimeout, direction;
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

    // let colission = checkForColission();
    // if (colission) {
    //     if (colission == "point") {
    //         for (let enemy of document.getElementsByClassName("enemy")) {
    //             enemy.remove();
    //         }
    //         document.getElementsByClassName("point")[0].remove()
    //         initGame()
    //     } else {
    //         console.log("perdeu");
    //     }
    //     return;
    // }
    keysAction[key] && keysAction[key]();
    document.getElementById("console").innerText = `Player X: ${playerPosition[0]} Y: ${playerPosition[1]}}`

    player.style.margin = `${playerPosition[1]}px ${playerPosition[0]}px`;
    clearInterval(walk);
    walk = setInterval(() => { walkDelay(key) }, gameSpeed * 100);

}

const checkForColission = () => {
    if (playerPosition[0] == pointPosition[0] && playerPosition[1] == pointPosition[1]) {
        return "point";
    }
    let hitEnemy = false;
    for (let enemy of document.getElementsByClassName("enemy")) {
        let pos = enemy.style.margin.replace(/px/g, "").split(" ");
        pos[0] = new Number(pos[0]);
        pos[1] = new Number(pos[1]);

        if (playerPosition[0] == pos[1] && playerPosition[1] == pos[0]) {
            hitEnemy = true;
        }
    }
    return hitEnemy;
}
const initGame = () => {
    // let point = document.createElement("div");
    // point.classList = "point";
    // pointPosition = [Math.floor(((Math.floor(Math.random() * 330) + 1) / 20)) * 20, Math.floor(((Math.floor(Math.random() * 330) + 1) / 20)) * 20]

    // point.style.margin = `${pointPosition[1]}px ${pointPosition[0]}px`
    // document.getElementById("playground").appendChild(point);
    // spawnEnemies(50);



}


function enemyTarget() {

    clearTimeout(myTimeout);
    myTimeout = setTimeout(() => {
        for (let enemy of document.getElementsByClassName("enemy")) {
            let pos = enemy.style.margin.replace(/px/g, "").split(" ");
            pos[0] = new Number(pos[0])
            pos[1] = new Number(pos[1])

            if (pos[1] > playerPosition[0]) {
                pos[1] -= enemySpeed;
            } else {
                pos[1] += enemySpeed;
            }

            if (pos[0] > playerPosition[1]) {
                pos[0] -= enemySpeed;
            } else {
                pos[0] += enemySpeed;
            }
            //console.log(pos)
            enemy.style.margin = `${pos[0]}px ${pos[1]}px`;
        }
        enemyTarget();
    }, gameSpeed)
}
const spawnEnemies = (quantity) => {
    for (var i = 0; i < quantity; i++) {
        let newEnemy = document.createElement("div");
        newEnemy.classList = "enemy";
        let enemyPosition = [Math.floor(((Math.floor(Math.random() * 330) + 1) / 20)) * 20, Math.floor(((Math.floor(Math.random() * 330) + 1) / 20)) * 20]
        if ([pointPosition[0], playerPosition[0]].includes(enemyPosition[0]) && [pointPosition[1], playerPosition[1]].includes(enemyPosition[1])) {
            spawnEnemies(1);
            continue;
        }
        newEnemy.style.margin = `${enemyPosition[1]}px ${enemyPosition[0]}px`
        document.getElementById("playground").appendChild(newEnemy);
    };
    //  enemyTarget();
}





document.addEventListener("DOMContentLoaded", () => initGame());