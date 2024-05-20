import { dialog } from './dialogo.js';
/*
@Expected
playerPosition = [X, Y];
itensArround = [
    {
        name: "Audrey",
        position: [630, 270],
        dialog: {
            title: "Audrey",
            message: "Olá boa tarde, me empresta 10 mil Kwanzas?",
            action: () => { }
        },
    }
]
*/

export function interact(playerPosition, itensArround) {
    for (let i = 0; i < itensArround.length; i++) {
        if (Math.abs(playerPosition[0] - itensArround[i].position[0]) <= 30 && Math.abs(playerPosition[1] - itensArround[i].position[1]) <= 30) {
            dialog(itensArround[i].dialog.title, itensArround[i].dialog.message, document.getElementsByTagName("body")[0]).then((e) => {
                itensArround[i].dialog.action();
            });
        }
    }
}