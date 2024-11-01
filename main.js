const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { exec } = require('child_process');
const path = require('path');

let currentProcess = null;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  win.loadFile('index.html');
}

// Directory picker
ipcMain.handle('dialog:openDirectory', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  return result.filePaths[0] || null;
});

// Handle starting Instaloader
ipcMain.on('start-instaloader', (event, { username, minLikes, directory, otherOptions }) => {
  const command = `instaloader.exe --dirname-pattern="${directory}" ${otherOptions} --post-filter="likes > ${minLikes}" ${username}`;
  console.log('command', command);

  currentProcess = exec(command, (error, stdout, stderr) => {
    if (error) {
      event.sender.send('instaloader-error', error.message);
    }
  });

  currentProcess.stdout.on('data', (data) => {
    event.sender.send('instaloader-status', data);
  });
});

// Stop Instaloader process
ipcMain.on('stop-instaloader', () => {
  if (currentProcess) {
    currentProcess.kill();
    currentProcess = null;
  }
});

app.whenReady().then(createWindow);
