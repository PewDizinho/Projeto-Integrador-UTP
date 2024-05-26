import { dialog } from "./dialogo.js";

export function walk(document, walls, doors, playerPosition, rotation) {
    const playerSpeed = 30;
    const gameSpeed = 1.7;
    let skin = 1;
    const player = document.getElementById("player");
    player.style.transform = `rotate(${rotation}deg)`;
    let walk, direction, isWalking = false;
    player.style.margin = `${playerPosition[1]}px ${playerPosition[0]}px`;
    document.addEventListener("keydown", function (event) {
        if (["w", "s", "d", "a"].indexOf(event.key.toLowerCase()) != -1) {
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
        if (window.electronAPI.getConfig("dialog").isOnDialog) return;

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
    };
    const checkCollision = (x, y) => {
        let playerX = playerPosition[0] + x;
        let playerY = playerPosition[1] + y;
        let collision = false;
        if (playerX < 0 || playerX > 840 || playerY < 0 || playerY > 600) return "wall";
        walls.forEach(wall => {
            let startWall = wall[0];
            let endWall = wall[1];
            if (playerX > startWall[0] && playerX < endWall[0] && playerY < startWall[1] && playerY > endWall[1]) {
                collision = "wall";
            }
        });
        doors.forEach(door => {
            if (playerX >= door.position[0][0] && playerX <= door.position[1][0] && playerY <= door.position[0][1] && playerY >= door.position[1][1]) {
                if (window.electronAPI.hasTag(door.needTag) || !door.needTag) {
                    location.href = `../${door.destination}/index.html`;
                    collision = `door-${door.destination}-${door.needTag}`;
                } else {
                    dialog("Porta", door.dialog, document.getElementsByTagName("body")[0]).then(() => {
                        player.style.transform = `rotate(${rotation * -1}deg)`;
                    });
                }
            }
        })



        return collision;
    };
}


