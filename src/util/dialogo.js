let counter = 0;
export function dialog(name, dialog, body) {

    let dialogo = document.createElement("div");
    let title = document.createElement("h1");
    let textInner = document.createElement("p");

    dialogo.style.position = "absolute";
    dialogo.style.width = "100%";
    dialogo.style.height = "30%";
    dialogo.style.bottom = "0px"
    dialogo.style.backgroundColor = "black";
    dialogo.style.display = "flex";
    dialogo.style.alignItems = "center";
    dialogo.style.justifyContent = "center";
    dialogo.style.zIndex = "99";
    dialogo.style.color = "white";
    dialogo.style.fontSize = "20px";
    dialogo.style.fontFamily = "Arial";
    dialogo.style.textAlign = "center";
    dialogo.style.padding = "20px";
    dialogo.style.boxSizing = "border-box";
    dialogo.style.border = "6px solid rgb(41, 41, 41)";

    title.innerText = name;
    title.style.color = "white";
    title.style.position = "absolute";
    title.style.zIndex = "999";
    title.style.margin = "14px";
    title.style.bottom = "130px";

    textInner.style.color = "white";
    textInner.style.textOverflow = "break-word";
    textInner.style.overflow = "auto";
    textInner.style.whiteSpace = "pre-wrap";
    textInner.style.lineBreak = "auto";

    textInner.style.position = "absolute";
    textInner.style.zIndex = "998";
    textInner.style.margin = "10px 30px";
    textInner.style.bottom = "24px";
    textInner.style.fontSize = "16px";

    body.appendChild(title);
    dialogo.appendChild(textInner);
    //dialogo.innerHTML = `<h2>${name}</h2><p>${dialog}</p>`;
    body.appendChild(dialogo);
    let newDialog = dialog.split("");
    textAnimation(textInner, newDialog)
    dialogo.addEventListener("click", function () {
        dialogo.remove();
        title.remove();
    });

}

const textAnimation = (textInner, newDialog) => {
    if (counter == newDialog.length) {
        counter = 0;
        return;
    }
    setTimeout(() => {
        textInner.innerText += newDialog[counter++];
        textAnimation(textInner, newDialog);
    }, 15);
}