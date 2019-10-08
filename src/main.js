const electron = require('electron');
const path = require('path');

const { app, BrowserWindow} = electron;

function createWindow(){
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // win.loadFile(path.join(__dirname,'index.html'));
    win.loadURL('http://localhost:9000')

    win.on('closed', () => {
        win = null;
    });
}


app.on('ready',createWindow);

app.on('window-all-closed',() => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate',() => {
    if(win === null) {
        createWindow();
    }
});