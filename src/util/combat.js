export function combat(callBack, enemyName) {
    location.href = "../util/combat/index.html";
    window.electronAPI.setConfig("playerRoom", callBack);
    window.electronAPI.setConfig("enemyName", enemyName);
    window.electronAPI.setConfig("win", false);


}