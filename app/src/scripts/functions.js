const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  navigate: (page) => {
    ipcRenderer.send('navigate', page);
  },

  login: (credentials) => {
    return ipcRenderer.invoke('login', credentials);
  },

  register: (credentials, displayName) => {
    console.log('Registering with:', { credentials, displayName });
    return ipcRenderer.invoke('register', credentials, displayName);
  },

  forgotPassword: (email) => {
    return ipcRenderer.invoke('forgotPassword', email);
  },

  serializer: async (object) => {
    return JSON.stringify(object);
  },

  simplifyText: async (text) => {
    const response = await ipcRenderer.invoke('simplify-text', text);
    return response;
  },
});
