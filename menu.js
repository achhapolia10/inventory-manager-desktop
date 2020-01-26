const {app, Menu, dialog} = require("electron");
const fs = require('fs');

const domain = 'http://localhost:4001';

const template = [
    {
        label: 'File',
        submenu: [
            {id: 'groups', label: 'Groups', click: loadUrl('/groups')},
            {id: 'products', label: 'Products', click: loadUrl('/products')},
            {type: 'separator'},
            {id: 'print', label: 'Print', click: onClickPrint},
            {type: 'separator'},
            {id: 'users', label: 'Manage Users', click: loadUrl('/users')},
            {id: 'logout', label: 'Logout', click: loadUrl('/logout')},
            {type: 'separator'},
            {role: 'quit'}
        ]
    },
    {
        label: 'View',
        submenu: [
            {id: 'daily', label: 'Daily Report', click: loadUrl('/report')},
            {id: 'stocks', label: 'Stocks', click: loadUrl('/stock')},
            {id: 'pstocks', label: 'Product Stocks', click: loadUrl('/stock/product')},
            {id: 'lpayment', label: 'Labour Payment', click: loadUrl('/labourpayment')},
        ]
    },
    {
        label: 'entry',
        submenu: [
            {id: 'dne', label: 'Daily Entry', click: loadUrl('/entry')},
            {id: 'de', label: 'Dispatch Entry', click: loadUrl('/dispatch')}
        ]
    }

];

function loadUrl(url) {
    return (event, focusedWindow, focusedWebContents) => {
        focusedWindow.loadURL(domain + url);
    }
}

function onClickPrint(event, focusedWindow, focusedWebContents) {

    let saveOptions = {
        title: 'Print to PDF',
        defaultPath: app.getPath('desktop'),
        filters: [{name: 'PDF', extensions: ['pdf']}]
    };
    let fileRegex = /(.pdf)$/i;
    let regex = RegExp(fileRegex);

    savePath = dialog.showSaveDialogSync(focusedWindow, saveOptions);
    if (savePath !== undefined) {
        if (!regex.test(savePath)) {
            savePath = savePath + '.pdf';
        }
        let landscape = isLandScape(focusedWindow.getURL());
        console.log(focusedWindow.getURL());
        focusedWindow.webContents.printToPDF({pageSize:'A4',landscape:landscape}).then(data => {
            fs.writeFile(savePath, data, (error) => {
                if (error) throw error;
                console.log('Write PDF successfully.')
            })
        }).catch(error => {
            console.log(error)
        });
    }
}

function isLandScape( url){
    return url.includes('labour');
}

let menu = Menu.buildFromTemplate(template);

module.exports = menu;
