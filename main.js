const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

// const { screen } = require('electron');


function createWindow() {
  const win = new BrowserWindow({
    height: 700,
    width: 900,
    resizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('./src/jogo-escolha/index.html');

}
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();

    }
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

