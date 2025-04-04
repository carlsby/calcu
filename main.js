const path = require('path');
const { app, BrowserWindow } = require('electron');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Calcu',
        width: 300,
        height: 430,
        resizable: false,
        icon: path.join(__dirname, './renderer/assets/c.png') 
    });

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
    mainWindow.removeMenu();
}

app.whenReady().then(() => {
    createMainWindow();
});

try {
    require('electron-reloader')(module)
  } catch (_) {}