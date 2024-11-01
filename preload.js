const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openDirectory: () => ipcRenderer.invoke('dialog:openDirectory'),
  startInstaloader: (params) => ipcRenderer.send('start-instaloader', params),
  stopInstaloader: () => ipcRenderer.send('stop-instaloader'),
  onStatusUpdate: (callback) => ipcRenderer.on('instaloader-status', (event, data) => callback(data)),
  onError: (callback) => ipcRenderer.on('instaloader-error', (event, error) => callback(error))
});
