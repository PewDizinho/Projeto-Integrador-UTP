const vira = document.getElementsByClassName("vira")[0];
const table = document.getElementById("cardOnTheTable");
const playerHand_OBJ = document.getElementById("playerCards").children;
const enemyHand_OBJ = document.getElementById("enemyCards").children;
let cardOnTheTable, turn = "player";//console & player
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
        playerHand_OBJ[i].id = `${playerCards[i]["card"]}-${playerCards[i]["naipe"]}`;
        enemyHand_OBJ[i].src = getCardPath(enemyCards[i]["card"], enemyCards[i]["naipe"]);
        enemyHand_OBJ[i].id = `${enemyCards[i]["card"]}-${enemyCards[i]["naipe"]}`;
    }
    vira.src = getCardPath(viraCard["card"], viraCard["naipe"]);
    vira.id = `${vira["card"]}-${vira["naipe"]}`
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
    // console.log(cards);
    return {
        naipe: cardID[random],
        card: cards[cardID[random]][Math.floor(Math.random() * cards[cardID[random]].length)]
    };


}
document.addEventListener("DOMContentLoaded", () => {
    shuffle();
    for (let card of playerHand_OBJ) {
        card.addEventListener("click", (e) => {
            if (turn !== "player") return;
            turn = "console";
            let card = e.target.id.split("-");
            cardOnTheTable = card;
            let newCard = document.createElement("img");
            newCard.id = e.target.id;
            newCard.src = getCardPath(card[0], card[1]);
            newCard.class = "centerCard"
            newCard.style.transform = 'rotate(' + Math.floor(Math.random() * 180) + 'deg)';
            table.appendChild(newCard);
            for (var cardInHand of playerHand_OBJ) {
                if (cardInHand.id != newCard.id) continue;
                cardInHand.style.display = "none"
            }
            enemyTime();

        })
    }
})



function enemyTime() {
    const cardsOrder = ["3", "2", "1", "k", "j", "q", "4", "5", "6", "7"];
    const naipeOrder = ["ouro", "espada", "copas", "paus"];
    console.log(cardsOrder.indexOf(cardOnTheTable[0]
    ))
    let cardToPlay = enemyCards[0];
    for (let card of enemyCards) {
        console.log(cardsOrder.indexOf(cardOnTheTable[0]) + " - " + cardsOrder.indexOf(card.card))
        if (cardsOrder.indexOf(cardOnTheTable[0]) < cardsOrder.indexOf(card.card)) {
            console.log("Card " + JSON.stringify(card));
            enemyCards[enemyCards.indexOf(card)] = 0;
            console.log(enemyCards)
            cardToPlay = card;
        }

    }


    for (var cardInHand of enemyHand_OBJ) {
        if (cardInHand.id.split("-")[0] == cardToPlay["card"] && cardInHand.id.split("-")[1] == cardToPlay["naipe"]) {
            cardInHand.style.display = "none";
            cardOnTheTable = "";
            turn = "player";
            let newCard = document.createElement("img");
            newCard.id = cardInHand.id;
            newCard.src = getCardPath(cardInHand.id.split("-")[0], cardInHand.id.split("-")[1]);
            newCard.class = "centerCard"
            newCard.style.transform = 'rotate(' + Math.floor(Math.random() * 180) + 'deg)';
            table.appendChild(newCard);
        }

    }
}