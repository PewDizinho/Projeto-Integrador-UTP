
let counter = 0;
let isAnimating = false;
let myAnimation;
let finished = false;
export async function dialog(name, dialog, body) {

    let dialogo = document.createElement("div");
    let nextArrow = document.createElement("div");
    let title = document.createElement("h1");
    let textInner = document.createElement("p");

    nextArrow.style.position = "absolute";
    nextArrow.style.width = "20px";
    nextArrow.style.height = "10px";
    nextArrow.style.bottom = "15px";
    nextArrow.style.right = "15px";
    nextArrow.style.backgroundColor = "white";
    nextArrow.style.display = "flex";
    nextArrow.style.clipPath = "polygon(0% 0%, 100% 0%, 50% 100%)";
    nextArrow.style.zIndex = "99";
    nextArrow.style.animation = "arrowAnimation 500ms infinite alternate";
    nextArrow.style.userSelect = "none";


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
    nextArrow.style.userSelect = "none";

    textInner.style.color = "white";
    textInner.style.textOverflow = "break-word";
    textInner.style.overflow = "hidden";
    textInner.style.whiteSpace = "pre-wrap";
    textInner.style.lineBreak = "auto";
    textInner.style.userSelect = "none";
    textInner.style.position = "absolute";
    textInner.style.maxHeight = "100px";
    textInner.style.zIndex = "998";
    textInner.style.margin = "10px 30px";
    textInner.style.bottom = "24px";
    textInner.style.fontSize = "16px";

    body.appendChild(title);
    dialogo.appendChild(textInner);
    body.appendChild(dialogo);
    dialogo.appendChild(nextArrow);
    let style = document.createElement('style');

    // Define your keyframe animation
    style.innerHTML = `
  @keyframes arrowAnimation {
    0% {bottom: 15px;}
    100% {bottom: 20px;}
  }
`;

    // Append the style element to the head of the document
    document.head.appendChild(style);

    textAnimation(textInner, dialog.split(""));
    dialogo.addEventListener("click", function () {
        if (counter == 350) {
            textInner.innerText = "";
            counter++;
            textAnimation(textInner, dialog.split(""));
        } else if (isAnimating) {
            clearTimeout(myAnimation);
            isAnimating = false;
            if (counter < 350) {
                dialog.split("").length >= 350 ? counter = 350 : counter = dialog.split("").length;
                textInner.innerText = dialog.split("").slice(0, counter).join("");
            } else {
                let msg = dialog.split("");
                msg.splice(0, 350);
                textInner.innerText = msg.join("");
            }
        } else {
            dialogo.remove();
            title.remove();
            finished = true;
        }
    });
    const wait = async () => {
        console.log("Esperano");
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (finished) {
                    resolve(true)
                } else resolve(false)
            }, 50);
        });
    }
    const fuck2 = async () => {
        if (await wait()) {
            return true;
        } else {
            await fuck2();
        }
    }
    return await fuck2();
}
//350 MAX
const textAnimation = (textInner, newDialog) => {
    if (counter == 350) {
        isAnimating = false;
        return;
    } else if (counter == newDialog.length) {
        isAnimating = false;
        counter = 0;
        return;
    }

    myAnimation = setTimeout(() => {
        isAnimating = true;
        textInner.innerText += newDialog[counter++];
        textAnimation(textInner, newDialog);
    }, 15);
}