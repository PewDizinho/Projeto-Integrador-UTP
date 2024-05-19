import { dialog } from '../util/dialogo.js';
import { walk } from '../util/walk.js';
import { combat } from '../util/combat/script.js';
let walls = [
    [
        [780, 620], [840, -1]
    ],
    [
        [-1, 150], [240, -1]
    ],
    [
        [540, 270], [800, 150]
    ],
    [
        [-1, 270], [420, 150]
    ],
    [
        [-1, 450], [420, 330]
    ],
    [
        [540, 270], [800, 150]
    ]
];

let doors = [{
    position: [[570, 600], [690, 620]],
    destination: "sala",
    needTag: "chave"
}
]

let playerPosition = [630, 270];
let rotation = 180;
dialog("Audrey", "Olá boa tarde, me empresta 10 mil Kwanzas?", document.getElementsByTagName("body")[0]).then((e) => {
combat("../../sala-1/index.html", "paulo")
});

walk(document, walls, doors, playerPosition, rotation);