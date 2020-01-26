const {app, BrowserWindow, dialog,Menu} = require('electron');
const os = require('os');
const {spawn, exec} = require('child_process');
const appMenu = require('./menu');

let mainWindow;
let improcess;

function createMainWindow() {

    mainWindow = new BrowserWindow({
        maximizable: true,
        minimizable: true,
        webPreferences: {
            nodeIntegration: true
        },
        width: 800,
        height: 600,
        title: "Inventory Manager"
    });

    let selectorOptions = {
        defaultPath: app.getPath('desktop'),
        buttonLabel: "Select DataFile",
        filter: [{name:"IM Database",extensions:["imdb"]}],
        properties: ['openFile']
    };
        let filePath = dialog.showOpenDialogSync(mainWindow, selectorOptions);
    console.log(filePath);
    if (filePath === undefined) {
        app.quit()
        return
    } else {
        if (process.platform === "win32") {
            improcess = spawn('imanager_32.exe', ["database " , filePath[0]]);
        } else {
            improcess = spawn('./imanager64', ["-database" , filePath[0]]);
        }
    }

    // mainWindow.webContents.openDevTools();


    Menu.setApplicationMenu(appMenu);
    mainWindow.loadURL("http:localhost:4001");

    mainWindow.on('closed', () => {
        mainWindow = null;  // Darwin
    })
}

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
    improcess.kill();
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {

    if (mainWindow === null) {
        createMainWindow();
    }
});