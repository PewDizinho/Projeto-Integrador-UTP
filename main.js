const { app, BrowserWindow, ipcMain, Menu } = require('electron/main');
const path = require('node:path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const db = low(new FileSync('config.json'));
const rooms = low(new FileSync('rooms.json'));

// const { screen } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    height: 700,
    width: 900,
    resizable: false,
    alwaysOnTop: false,
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  });
  db.defaults({ playerRoom: null, enemyName: null, win: false, firstTime: true, dialog: {}, tags: [] }).write();
  rooms.defaults(
    {
      "sala-1": {
        "key": "sala-1",
        "path": "./src/sala-1/index.html",
        "position": [
          600,
          570
        ],
        "rotation": 180,
        "tag": "speak_with_jessica"
      },
      "sala-2": {
        "key": "sala-2",
        "path": "./src/sala-2/index.html",
        "position": [
          1,
          1
        ],
        "rotation": 1,
        "tag": "2"
      },
      "rooms": [
        {
          "key": "sala-1",
          "path": "./src/sala-1/index.html",
          "position": [
            600,
            570
          ],
          "rotation": 180,
          "tag": "speak_with_jessica"
        }
      ]
    }
  ).write();
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: "Location",
        submenu: [
          {
            click: () => win.webContents.loadFile('./src/index.html'),
            label: 'Main Menu',
            accelerator: "CmdOrCtrl+0"
          },
          {
            click: () => win.webContents.loadFile('./src/sala-1/index.html'),
            label: 'Sala1',
            accelerator: "CmdOrCtrl+1"
          },
          {
            click: () => win.webContents.loadFile('./src/corredor/index.html'),
            label: 'Corredor',
            accelerator: "CmdOrCtrl+2"
          },
          ,
          {
            click: () => win.webContents.loadFile('./src/secretaria/index.html'),
            label: 'Secretaria',
            accelerator: "CmdOrCtrl+3"
          },
          {
            click: () => win.webContents.loadFile('./src/saida/index.html'),
            label: 'Saída',
            accelerator: "CmdOrCtrl+4"
          },
          {
            click: () => win.webContents.loadFile('./src/util/combat/index.html'),
            label: 'Combate',
            accelerator: "CmdOrCtrl+5"
          }

        ]
      },
      {
        label: "Debug",
        submenu: [
          {
            click: () => win.webContents.reload(),
            label: 'Reload',
            accelerator: "CmdOrCtrl+R"
          },
          {
            click: () => {
              new BrowserWindow({
                height: 400,
                width: 400,
                autoHideMenuBar: true,
              }).webContents.loadFile('./config.json');
            },
            label: 'See Config.json'
          },
          {
            click: () => win.webContents.isDevToolsOpened() ? win.webContents.closeDevTools() : win.webContents.openDevTools(),
            label: 'Dev Tools'
          },
          {
            click: () => {
              db.set('audio', 100).write();
              db.set('playerRoom', null).write();
              db.set('enemyName', null).write();
              db.set('win', false).write();
              db.set('dialog', {}).write();
              db.set('tags', []).write();
            },
            label: 'Reset Database'
          },
        ]
      }
    ],
    )
  );
  win.loadFile('./src/index.html');


  // ipcMain.on('get-statistic', (event, tag) => { db.get('statistic')})
  ipcMain.on('set-statistic', (event, tag, value) => { db.get('statistic').push(tag, value).write(); })
  ipcMain.on('get-room', (event, room) => event.returnValue = rooms.get(room).value());
  ipcMain.on('set-config', (event, config, value) => db.set(config, value).write())
  ipcMain.on('get-config', (event, config) => event.returnValue = db.get(config).value())
  ipcMain.on('set-tag', (event, tag) => {
    if (db.get('tags').value().indexOf(tag) != -1) return;
    db.get('tags').push(tag).write();
  });
  ipcMain.on('has-tag', (event, tag) => event.returnValue = db.get('tags').value().indexOf(tag) != -1);
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