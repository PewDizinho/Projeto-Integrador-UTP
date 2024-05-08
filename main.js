const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

// const { screen } = require('electron');


function createWindow() {


  const win = new BrowserWindow({
    height: 1400,
    width: 900,
    resizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }

  })

  win.loadFile('./lib/room1/index.html');

  // win.on('close', (e) => {
  //   win.setTitle('I do not want to be closed');
  //   let mainScreen = screen.getPrimaryDisplay();
  //   let dimensions = mainScreen.size;

  //   const safeArea = {
  //     x: [0.1, 0.3],
  //     y: []
  //   };
  //   let desiredX = Math.round(dimensions.width * Math.random(0.8)); 
  //   let desiredY = Math.round(dimensions.height * Math.random(0.5));

  //   win.setPosition(desiredX, desiredY);

  //   e.preventDefault();

  // })
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

