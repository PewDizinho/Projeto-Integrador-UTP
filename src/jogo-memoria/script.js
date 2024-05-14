

const safeSpots = [[60, 150], [60, 300], [60, 450], [60, 600], [300, 150], [300, 300], [300, 450], [300, 600]];
const allCards = document.getElementsByClassName("card");

const cardsPosision = [
    "um", "dois", "tres", "quatro", "cinco", "seis", "sete", "oito"
];

let selected = [0, 0];

const startGame = () => {

    shuffle();
    let counter = 0;
    let points = 0;
    setTimeout(() => {
        for (let card of allCards) {
            card.style.animation = "flip 1s ease-in-out 1 forwards"
        }
    }, 2000);

    setTimeout(() => {
        for (let card of allCards) {
            card.className = "card card-bottom";
        }
    }, 2500);
    setTimeout(() => {
        for (let card of allCards) {
            card.style.animation = "";

        }
    }, 3000)

    setTimeout(() => {
        for (let card of allCards) {
            card.style.animation = "flip 1s ease-in-out 1 forwards";
        }
    }, 5000);

    setTimeout(() => {
        for (let card of allCards) {
            card.className = "card card-top";
            card.addEventListener("click", (e) => {
                console.log(counter)
                let cardObj = e.target;
                if (["diamond", "square", "circle", "x"].includes(e.target.id)) {
                    cardObj = e.target.parentNode;
                }
                if (counter == 10 || cardObj.className.includes("card-bottom")) return;

                let cardId = cardObj.id;
                if (selected[0] == cardId) return;
                e.target.style.animation = "flip 1s ease-in-out 1 forwards";
                selected[counter] = cardId;
                counter++;
                setTimeout(() => {
                    e.target.className = "card card-bottom";
                    setTimeout(() => e.target.style.animation = "", 500);
                }, 500);
                if (counter == 2) {
                    counter = 10;

                    let cards = [document.getElementById(selected[0]), document.getElementById(selected[1])];
                    console.log(cards[0].firstElementChild.id + "  " + cards[1].firstElementChild)
                    if (cards[0].firstElementChild.id != cards[1].firstElementChild.id) {
                        setTimeout(() => {
                            for (let _card of cards) {
                                _card.style.animation = "flip 1s ease-in-out 1 forwards";
                                setTimeout(() => {
                                    _card.className = "card card-top";
                                    setTimeout(() => _card.style.animation = "", 500);
                                    counter = 0;
                                    selected = [0, 0]
                                }, 500);
                            }
                        }, 3000);

                    } else {
                        console.log("Igual!");
                        counter = 0;
                        points++;
                        selected = [0, 0];
                    }

                    if (points == 4) {
                        setTimeout(() => {
                            alert("Você venceu!");

                        }, 1000);
                    }


                }
            });

        };

    }, 5500);
    setTimeout(() => {
        for (let card of allCards) {
            card.style.animation = "";
        }
    }, 6000)
};


const shuffle = () => {
    shuffleArray(cardsPosision);
    let counter = 0;
    for (let i of cardsPosision) {
        const toNumber = {
            "um": 0,
            "dois": 1,
            "tres": 2,
            "quatro": 3,
            "cinco": 4,
            "seis": 5,
            "sete": 6,
            "oito": 7
        }

        const toString = {
            0: "um",
            1: "dois",
            2: "tres",
            3: "quatro",
            4: "cinco",
            5: "seis",
            6: "sete",
            7: "oito"
        }


        let realIndex = toNumber[i];
        console.log();
        document.getElementById(toString[counter]).style.margin = `${safeSpots[realIndex][0]}px ${safeSpots[realIndex][1]}px`;
        counter++
    }
};


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // setTimeout(startGame, 5000);
    ;
})


