import { walk } from '../util/walk.js';
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
        [540, 420], [800, 30]
    ]
];

let doors = [''
    ,{
        position: [[570, 600], [690, 620]],
        destination: "sala",
        needTag: "chave"
    }
]

let playerPosition = [630, 270];
let rotation = 180;

walk(document, walls, doors, playerPosition, rotation);