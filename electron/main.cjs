const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const isDev = process.env.ELECTRON_DEV === 'true';

  const win = new BrowserWindow({
    width: 1366,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      devTools: isDev,
      preload: path.join(__dirname, 'preload.cjs')
    },
    icon: path.join(__dirname, '../public/favicon.ico'),
    backgroundColor: '#020205',
    title: 'Zyntral AI Developer Suite',
    autoHideMenuBar: true
  });

  if (!isDev) {
    win.webContents.on('devtools-opened', () => {
      win.webContents.closeDevTools();
    });
  }

  if (isDev) {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadURL('https://www.zyntral.dev/');
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
