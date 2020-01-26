const {app, Menu} = require("electron");

const domain='http://localhost:4001';

const template = [
    {
        label: 'File',
        submenu: [
            {id: 'groups', label: 'Groups', click: loadUrl('/groups')},
            {id: 'products', label: 'Products', click:loadUrl('/products')},
            {type: 'separator'},
            {id: 'users', label: 'Manage Users',click:loadUrl('/users')},
            {id: 'logout', label: 'Logout',click:loadUrl('/logout')},
            {type: 'separator'},
            {role: 'quit'}
        ]
    },
    {
        label: 'View',
        submenu: [
            {id:'daily', label:'Daily Report',click:loadUrl('/report')},
            {id:'stocks', label:'Stocks'},
            {id:'pstocks',label:'Product Stocks'},
            {id:'lpayment',label:'Labour Payment'},
        ]
    },
    {
        label:'entry',
        submenu: [
            {id:'dne', label:'Daily Entry'},
            {id:'de', label:'Dispatch Entry'}
        ]
    }

];

function loadUrl(url){
    return (event, focusedWindow, focusedWebContents)=>{
        focusedWindow.loadURL(domain+url);
    }
}

let menu = Menu.buildFromTemplate(template);

module.exports = menu;
