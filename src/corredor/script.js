import { walk } from '../util/walk.js';
let walls = [
    [
        [-1, 240], [270, 180]
    ],
    [
        [360, 240], [600, 180]
    ],
    [
        [420, 210], [510, -1]
    ],
    [
        [660, 240], [850, 180]
    ],
    [
        [-1, 420], [270, 360]
    ],
    [
        [360, 420], [720, 360]
    ],
    [
        [630, 610], [720, 360]
    ]
];
let doors = [
    {
        position: [[270, 210], [360, 210],],
        destination: "sala-1",
        needTag: false,
        dialog: ""

    }
];
let playerPosition = [30, 300];
walk(document, walls, doors, playerPosition, -90);