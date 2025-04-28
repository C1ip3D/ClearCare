import pkg from 'electron';
const { app, BrowserWindow, ipcMain, dialog, systemPreferences } = pkg;
import dotenv from 'dotenv';
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import chokidar from 'chokidar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const expressApp = express();
const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const win = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
  },
});


// Express setup
expressApp.use(
  express.static(path.join(__dirname, 'dist'), {
    setHeaders: (res, path) => {
      if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
    },
  })
);

expressApp.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'"
  );
  next();
});

expressApp.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

// Start Express server
expressApp.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Electron setup
let mainWindow;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, '/src/scripts/functions.js'),
    },
  });

  mainWindow.maximize();
  mainWindow.loadURL(`http://localhost:${port}`);
  mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'));
}

if (isDev) {
  const watcher = chokidar.watch(
    [path.join(__dirname, 'pages'), path.join(__dirname, 'src/css')],
    {
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true,
    }
  );

  watcher.on('change', (path) => {
    if (mainWindow) {
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
