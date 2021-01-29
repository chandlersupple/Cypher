// Libraries
const electron = require('electron');
const app = electron.app;

const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },
    });
    // And load the index.html of the app.
    mainWindow.loadURL('http://localhost:8000');
    mainWindow.webContents.openDevTools();
    // Removes menu-bar
    mainWindow.setMenuBarVisibility(false);

    mainWindow.on('closed', function () {
        mainWindow = null
    })

    mainWindow.webContents.on('new-window', function (e, url) {
        e.preventDefault();
        require('electron').shell.openExternal(url);
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});