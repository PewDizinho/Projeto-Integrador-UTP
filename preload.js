const { contextBridge, ipcRenderer } = require('electron/renderer')
window.ipcRenderer = require('electron').ipcRenderer;
contextBridge.exposeInMainWorld('electronAPI', {
  setConfig: (config, value) => ipcRenderer.send('set-config', config, value),
  getConfig: (config) => ipcRenderer.sendSync('get-config', config),
})

