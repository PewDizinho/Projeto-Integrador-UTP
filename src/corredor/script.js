import { walk } from '../util/walk.js';
let walls = [
    [
        [-1, 240], [270, 150]
    ],
    [
        [], []
    ]
];

let doors = [
    {
        position: [[0, 240], [30, 30]],
        destination: "sala",
        needTag: "chave"
    }
]

let playerPosition = [0, 240];

walk(document, walls, doors, playerPosition);