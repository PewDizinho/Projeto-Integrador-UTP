const { contextBridge, ipcRenderer } = require('electron/renderer')
window.ipcRenderer = require('electron').ipcRenderer;
contextBridge.exposeInMainWorld('electronAPI', {
  setConfig: (config, value) => ipcRenderer.send('set-config', config, value),
  getConfig: (config) => ipcRenderer.sendSync('get-config', config),
  getRoom: (room) => ipcRenderer.sendSync('get-room', room),
  setTag: (tag) => ipcRenderer.send('set-tag', tag),
  hasTag: (tag) => ipcRenderer.sendSync('has-tag',tag),
});

