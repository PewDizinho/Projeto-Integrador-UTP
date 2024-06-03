document.getElementById("play").addEventListener("click", () => {
    let audio = new Audio("./assets/sounds/gameStart.mp3");
    audio.play();
    setTimeout(() => document.getElementById("transition").classList = "transition", 100);
    setTimeout(() => {
        window.location.href = "./util/combat/index.html";
    }, 1750);
});
document.getElementById("config").addEventListener("click", () => {
    let audio = new Audio("./assets/sounds/gameStart.mp3");
    audio.play();
    setTimeout(() => document.getElementById("transition").classList = "transition", 100);
    setTimeout(() => {
        window.location.href = "./about-us/index.html";
    }, 1750);
});