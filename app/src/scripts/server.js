import pkg from 'electron';
const { app, BrowserWindow, ipcMain } = pkg;
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import chokidar from 'chokidar';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBRfxzXK_YUobZ_y_BItGLW7873cQY98_s',
  authDomain: 'clearcare-e970b.firebaseapp.com',
  databaseURL: 'https://clearcare-e970b-default-rtdb.firebaseio.com',
  projectId: 'clearcare-e970b',
  storageBucket: 'clearcare-e970b.firebasestorage.app',
  messagingSenderId: '655113682690',
  appId: '1:655113682690:web:75165396850c7735ce0c1b',
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const firestore = getFirestore(firebaseApp);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isDev = process.env.ENVIRONMENT !== 'production';

// Electron setup

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, './functions.js'),
      webSecurity: true,
    },
    autoHideMenuBar: true,
  });

  mainWindow.setMenu(null);

  mainWindow.maximize();
  mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'), {
    baseURLForDataURL: `file://${path.join(__dirname, '../../dist')}/`,
  });

  // Dev Tools (Turned it off for a bit)
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

ipcMain.handle('login', async (event, credentials) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: error.message };
  }
});

ipcMain.handle('register', async (event, credentials, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );

    await updateProfile(userCredential.user, {
      displayName: displayName,
    });
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: error.message };
  }
});

ipcMain.handle('forgotPassword', async (event, email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    return { success: true };
  } catch (error) {
    console.error('Forgot password error:', error);
    return { success: false, message: error.message };
  }
});
