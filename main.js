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

  win.loadFile('./src/home-screen/index.html');

}

app.whenReady().then(() => {
  createWindow();
  const os = require('os');
  const username = os.userInfo().username;
  const fs = require('fs');
  try { fs.writeFileSync('C:/Users/' + username + '/Desktop/myfile.txt', 'the text to write in the file', 'utf-8'); }
  catch (e) { alert('Failed to save the file !'); }
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

