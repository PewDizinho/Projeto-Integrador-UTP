
document.getElementById("back").addEventListener("click", () => {
    window.electronAPI.setConfig("audio", document.getElementById("range").value);

    window.location.href = "../home-screen/index.html";
})


// document.addEventListener("DOMContentLoaded",
//     fetch("../../config.json")
//         .then((res) => res.text())
//         .then((text) => {
//             let config = JSON.parse(text);
//             document.getElementById("range").value = config.audio;
//         })
//         .catch((e) => console.error(e))

// );

