import { walk } from '../util/walk.js';
let walls = [
    [
        [780, 620], [840, 0]
    ],
    [
        [], []
    ]
];

let doors = [
    {
        position: [[570, 600], [690, 620]],
        destination: "sala",
        needTag: "chave"
    }
]

let playerPosition = [630, 270];
let rotation = 180;

walk(document, walls, doors, playerPosition, rotation);