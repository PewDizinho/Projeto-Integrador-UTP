
import { interact } from '../util/interact.js';
import { walk } from '../util/walk.js';
window.electronAPI.setConfig("playerRoom", 'saida');
let walls = [
    [
        [-1, 540], [180, 270]
    ],
    [
        [510, 270], [630, -1]
    ],
    [
        [210, 270], [330, -1]
    ]
];

let doors = [

];

window.electronAPI.setConfig("dialog", { isOnDialog: false });
window.electronAPI.setConfig("enemyName", null);

let playerPosition = [630, 270];

let rotation = 180;
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
        document.getElementById("end").style.display = "block";


    }

});
