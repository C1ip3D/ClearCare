import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import OpenAI from 'openai';
import { config } from 'dotenv';
import { logger } from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow;

// Load encrypted environment variables based on whether we're in development or production
const envPath = app.isPackaged
  ? path.join(process.resourcesPath, '.env.vault')
  : path.join(path.dirname(__dirname), '../../.env.vault');

config({ path: envPath });

// Initialize OpenAI with API key
const openai = new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY ||
    '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',
});

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

const isDev = process.env.ENVIRONMENT !== 'production';

// Electron setup

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, '../scripts/functions.js'),
      webSecurity: true,
      spellcheck: false,
      autoplayPolicy: 'document-user-activation-required',
    },
    autoHideMenuBar: true,
  });

  mainWindow.setMenu(null);
  mainWindow.maximize();

  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, '../index.html'));
  } else {
    mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'));
  }

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
}

if (isDev) {
  import('chokidar').then((chokidar) => {
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
    logger.error('Login error:', error);
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
    logger.error('Registration error:', error);
    return { success: false };
  }
});

ipcMain.handle('forgotPassword', async (event, email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    logger.error('Forgot password error:', error);
    return { success: false };
  }
});

process.on('uncaughtException', (error) => {
  try {
    logger.error('Uncaught Exception:', error);
    if (app.isPackaged) {
      dialog.showErrorBox(
        'Error',
        'An unexpected error occurred. Please check the logs in your user directory.'
      );
    }
  } catch (err) {
    // Last resort error handling
    console.error('Critical error:', err);
  } finally {
    app.quit();
  }
});

process.on('unhandledRejection', (error) => {
  logger.error('Unhandled Rejection:', error);
});

// Update your error handling in the OpenAI call
ipcMain.handle('simplify-text', async (event, inputText) => {
  try {
    // Input validation
    if (!inputText || typeof inputText !== 'string') {
      logger.error('Invalid input text');
      return {
        success: false,
        message: 'Please provide valid text to simplify',
      };
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert at explaining medical terms in simple language that a middle school student can understand.',
        },
        {
          role: 'user',
          content: `Simplify this medical text and describe a disease or health issue the user may have, and follow up with brief tips and write each tip on a new line. Write in html format using <p> tags for the descriptions and <li> for the tips\n${inputText}.`,
        },
      ],
      temperature: 0.5, // Reduced for more consistent outputs
      max_tokens: 500, // Limit response length
      presence_penalty: 0.1, // Slight penalty for repetitive content
      frequency_penalty: 0.1, // Slight penalty for repetitive terms
    });

    const simplified = completion.choices[0].message.content.trim();

    logger.info('Successfully simplified text');
    return {
      success: true,
      simplified,
      originalText: inputText,
    };
  } catch (err) {
    logger.error('Text simplification error:', err);
    return {
      success: false,
      error: 'An error occurred while processing your request.',
    };
  }
});
