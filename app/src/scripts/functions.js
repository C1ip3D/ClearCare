const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    navigate: (page) => {
        ipcRenderer.send('navigate', page);
    },

    login: (credentials) => {
        return ipcRenderer.invoke('login', credentials);
    }
});