const { app, BrowserWindow, ipcMain } = require('electron/main');
const path = require('node:path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('config.json');
const db = low(adapter);

// const { screen } = require('electron');


function createWindow() {
  const win = new BrowserWindow({
    height: 700,
    width: 900,
    resizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  db.defaults({ audio: 100 }).write();
  win.loadFile('./src/home-screen/index.html');
  win.webContents.openDevTools()

  ipcMain.on('set-config', (event, config, value) => db.set(config, value).write())


}


app.whenReady().then(() => {
  createWindow();

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

