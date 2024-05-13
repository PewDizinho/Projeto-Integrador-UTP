const { contextBridge, ipcRenderer } = require('electron/renderer')
window.ipcRenderer = require('electron').ipcRenderer;
contextBridge.exposeInMainWorld('electronAPI', {
  setConfig: (config, value) => ipcRenderer.send('set-config', config, value),
//  getConfig: (callback) => ipcRenderer.on('get-config', (_event, value) => callback(value)),
 
})

