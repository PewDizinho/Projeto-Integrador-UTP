
import { walk } from '../util/walk.js';
window.electronAPI.setConfig("playerRoom", 'sala-3');
let walls = [
    [
        [780, 620], [840, -1]
    ],
    [
        [600, 620], [800, 420]
    ],
    [
        [-1, 450], [300, 340]
    ],
    [
        [-1, 300], [300, 180]
    ],
    [
        [420, 450], [800, 340]
    ],
    [
        [420, 270], [800, 160]
    ]
];

let doors = [

];

window.electronAPI.setConfig("dialog", { isOnDialog: false });
window.electronAPI.setConfig("enemyName", null);

let playerPosition = [210, 30];


let rotation = 0;
const _body = document.getElementsByTagName("body")[0];


walk(document, walls, doors, playerPosition, rotation);

document.addEventListener("DOMContentLoaded", (e) => {
    if (window.electronAPI.getConfig("win").win) {
        switch (window.electronAPI.getConfig("win").enemyName) {

        }
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key == "e") {
        // interact(playerPosition, [])
    }

});
