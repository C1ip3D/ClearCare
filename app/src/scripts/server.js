import pkg from 'electron';
const { app, BrowserWindow, ipcMain } = pkg;
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import chokidar from 'chokidar';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
      spellcheck: false,
      autoplayPolicy: 'document-user-activation-required',
    },
    autoHideMenuBar: true,
  });

  mainWindow.setMenu(null);

  mainWindow.maximize();
  mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'), {
    baseURLForDataURL: `file://${path.join(__dirname, '../../dist')}/`,
  });
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
    if (page.includes('.html')) {
      mainWindow.loadFile(path.join(__dirname, '../../dist', `${page}`));
    } else {
      mainWindow.loadFile(path.join(__dirname, '../../dist', `${page}.html`));
    }
  }
});

ipcMain.handle('login', async (event, credentials) => {
  try {
    const { email, password } = JSON.parse(credentials);
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false };
  }
});

ipcMain.handle('register', async (event, credentials, displayName) => {
  try {
    const { email, password } = JSON.parse(credentials);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, {
      displayName: displayName,
    });

    return { success: true };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false };
  }
});

ipcMain.handle('forgotPassword', async (event, email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    console.error('Forgot password error:', error);
    return { success: false };
  }
});

ipcMain.handle('simplify-text', async (event, inputText) => {
  try {
    // Input validation
    if (!inputText || typeof inputText !== 'string') {
      return { 
        success: false, 
        message: 'Please provide valid text to simplify'
      };
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at explaining medical terms in simple language that a middle school student can understand. Include brief definitions for medical terms.'
        },
        {
          role: 'user',
          content: `Simplify this medical text and define any medical terms used:\n${inputText}`
        }
      ],
      temperature: 0.5, // Reduced for more consistent outputs
      max_tokens: 500,  // Limit response length
      presence_penalty: 0.1, // Slight penalty for repetitive content
      frequency_penalty: 0.1 // Slight penalty for repetitive terms
    });

    const simplified = completion.choices[0].message.content.trim();

    return { 
      success: true, 
      simplified,
      originalText: inputText 
    };

  } catch (err) {
    console.error('Text simplification error:', err);
    return { 
      success: false, 
      message: 'Failed to simplify text. Please try again.' 
    };
  }
});