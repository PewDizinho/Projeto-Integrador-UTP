
import { interact } from '../util/interact.js';
import { walk } from '../util/walk.js';
import { combat } from '../util/combat.js';
import { dialog } from '../util/dialogo.js';
window.electronAPI.setConfig("playerRoom", 'sala-1');
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
        [540, 420], [800, 300]
    ],
    [
        [-1, 450], [420, 330]
    ],
    [
        [-1, 270], [420, 150]
    ]
];

let playerPosition, doors = [
    {
        position: [[540, 600], [690, 600],],
        destination: "corredor",
        needTag: "speak_with_jessica",
        dialog: "Você precisa falar com a Prof. Jéssica antes de sair da sala"
    }
]

window.electronAPI.setConfig("dialog", { isOnDialog: false });
window.electronAPI.setConfig("enemyName", null);
if (window.electronAPI.getConfig("firstTime")) {

    playerPosition = [630, 270];
}else {
    
}
let rotation = 180;
const _body = document.getElementsByTagName("body")[0];


walk(document, walls, doors, playerPosition, rotation);

document.addEventListener("DOMContentLoaded", (e) => {
    if (window.electronAPI.getConfig("win").win) {
        switch (window.electronAPI.getConfig("win").enemyName) {
            case "joão":
                dialog("João", "Entendeu agora Mark? Agora vai lá, e pega seu bendito cachorro quente antes que feche, lembre-se, você tem até as 22 pra conseguir fazer isso", _body).then(() => {
                    window.electronAPI.setConfig("win", false);
                    window.electronAPI.setConfig("enemyName", null);
                });
                break;
        }
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key == "e") {
        interact(playerPosition, [
            {
                name: "João",
                position: [690, 270],
                execute:
                    () => {
                        if (window.electronAPI.getConfig("dialog").isOnDialog) return;
                        dialog("...", "Mark, Mark, acorda Mark", _body).then(() => {
                            dialog("Mark", "Ah? que que foi?", _body).then(() => {
                                dialog("João", "Você tá dormindo na sala cara, acorda", _body).then(() => {
                                    dialog("Mark", "Eu to cansado cara, me deixa", _body).then(() => {
                                        dialog(" ", "*Barriga Roncando*", _body).then(() => {
                                            dialog("Mark", "Ótimo, agora eu to com fome, será que a barraquinha de cachorro quente no estacionamento da facul ainda tá aberta?", _body).then(() => {
                                                dialog("João", "Ela fecha as 10, que horas são agora?", _body).then(() => {
                                                    dialog("Mark", "21:30, tenho 30 minutos pra chegar lá, da tempo e sobra", _body).then(() => {
                                                        dialog("João", "Cara, os professores não vão deixar você sair assim fácil não, a gente tá na última semana antes da prova", _body).then(() => {
                                                            dialog("Mark", "Ah, não custa tentar, né?", _body).then(() => {
                                                                dialog("João", "Vai por sua conta e risco, mas antes, deixa eu te explicar umas coisas", _body).then(() => {
                                                                    dialog("João", "Você pode apertar \"E\" pra interagir com personagens como eu", _body).then(() => {
                                                                        dialog("Mark", "Que? Como assim?", _body).then(() => {
                                                                            dialog("João", "Mark calaboca e escuta, esse é um jogo feito em menos de um mês pra um trabalho da facul, os desenvolvedores não quiseram criar um tutorial então deixa eu te explicar", _body).then(() => {
                                                                                dialog("Mark", "Preguiçosos...", _body).then(() => {
                                                                                    dialog("João", "Cada personagem que você enfrentar vai ter um tipo de desafio diferente, ou utilizar o nosso sistema padrão de combate", _body).then(() => {
                                                                                        dialog("Mark", "Sistema de combate? Eu não sei lutar joão", _body).then(() => {
                                                                                            dialog("João", "Você não vai ter que lutar não Mark, olha, deixa eu te mostrar como funciona, lembre-se de desviar dos obstáculos", _body).then(() => {
                                                                                                combat("../../sala-1/index.html", "João")
                                                                                            })
                                                                                        })
                                                                                    })
                                                                                })
                                                                            })
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        });//
                    }
            },
            {
                name: "Prof. Jéssica",
                position: [240, 30],
                execute:
                    () => {
                        dialog("Prof. Jéssica", "Mark, você não pode sair agora, a prova é amanhã", _body).then(() => {
                            window.electronAPI.setTag("speak_with_jessica");
                        });
                    }
            }
        ]);


    }

});
