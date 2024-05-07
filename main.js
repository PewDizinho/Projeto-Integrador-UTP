const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')



function createWindow() {


  const win = new BrowserWindow({
    height: 1400,
    width: 900,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }

  })

  win.loadFile('./lib/index.html')
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

