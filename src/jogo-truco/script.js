const table = document.getElementById("cardOnTheTable");
const playerHand_OBJ = document.getElementById("playerCards").children;
const enemyHand_OBJ = document.getElementById("enemyCards").children;
const vira = document.getElementById("vira");


const cards = {
    ouro: ["1", "2", "3", "4", "5", "6", "7", "j", "q", "k"],
    espada: ["1", "2", "3", "4", "5", "6", "7", "j", "q", "k"],
    copas: ["1", "2", "3", "4", "5", "6", "7", "j", "q", "k"],
    paus: ["1", "2", "3", "4", "5", "6", "7", "j", "q", "k"]
}

const playerCards = [];
const enemyCards = [];
const viraCard = pickRandomCard();

function getCardPath(card, cardType) {
    return `./cards/${cardType}/${card}.svg`
}


function shuffle() {


    for (var i = 0; i < 3; i++) {
        playerCards.push(pickRandomCard());
        enemyCards.push(pickRandomCard());
    }
    for (let i in playerHand_OBJ) {
        if (!playerCards[i]) continue;
        playerHand_OBJ[i].src = getCardPath(playerCards[i]["card"], playerCards[i]["naipe"]);
        enemyHand_OBJ[i].src = getCardPath(enemyCards[i]["card"], enemyCards[i]["naipe"]);
    }
    vira.src = getCardPath(viraCard["card"], viraCard["naipe"]);
}


function pickRandomCard() {
    let cardID = {
        0: "ouro",
        1: "espada",
        2: "copas",
        3: "paus"
    };

    let random = Math.floor(Math.random() * 4);
    cards[cardID[random]].splice(Math.floor(Math.random() * cards[cardID[random]].length), 1);
    console.log(cards);
    return {
        naipe: cardID[random],
        card: cards[cardID[random]][Math.floor(Math.random() * cards[cardID[random]].length)]
    };


}
document.addEventListener("DOMContentLoaded", () => {
    shuffle();
    for (let cards of table.children) {
        cards.style.transform = 'rotate(' + Math.floor(Math.random() * 180) + 'deg)';
    }
    // document.getElementById("card").src = getCardPath(5, "ouro");
})



