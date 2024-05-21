
import { interact } from '../util/interact.js';
import { walk } from '../util/walk.js';
import { combat } from '../util/combat.js';
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

let doors = [
    {
        position: [[540, 600], [690, 600],],
        destination: "corredor",
        needTag: "chave"
    }
]


let playerPosition = [630, 270];
let rotation = 180;
// dialog("Audrey", "Olá boa tarde, me empresta 10 mil Kwanzas?", document.getElementsByTagName("body")[0]).then((e) => {
//     combat("../../sala-1/index.html", "paulo")
// });

walk(document, walls, doors, playerPosition, rotation);

//690 270

document.addEventListener("keydown", (e) => {
    if (e.key == "e") {
        interact(playerPosition, [
            {
                name: "João",
                position: [690, 270],
                dialog: {
                    title: "João",
                    message: "Vamos Lutar!",
                    action: () => { combat("../../sala-1/index.html", "paulo") }
                },
            }
        ]);
    }

});
