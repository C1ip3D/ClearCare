import pkg from 'electron';
const { app, BrowserWindow, ipcMain } = pkg;
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import chokidar from 'chokidar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isDev = process.env.NODE_ENV !== 'production';

// Electron setup
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'functions.js'),
      webSecurity: true,
    },
  });

  mainWindow.maximize();
  mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'), {
    baseURLForDataURL: `file://${path.join(__dirname, '../../dist')}/`,
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

if (isDev) {
  const watcher = chokidar.watch(
    [
      path.join(__dirname, '../../dist'),
      path.join(__dirname, '../../src/pages'),
      path.join(__dirname, '../../src/css'),
      path.join(__dirname, '../../src/scripts'),
    ],
    {
      ignored: /(^|[\/\\])\../,
      persistent: true,
    }
  );

  watcher.on('change', (filepath) => {
    if (mainWindow) {
      console.log('Reloading due to changes in:', filepath);
      mainWindow.reload();
    }
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handlers

ipcMain.on('navigate', (event, page) => {
  if (mainWindow) {
    mainWindow.loadFile(path.join(__dirname, '../../dist', page));
  }
});
