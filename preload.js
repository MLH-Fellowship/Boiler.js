window.ipcRenderer = require('electron').ipcRenderer;
// const dialog = require('electron').remote.dialog;

const remote = window.require('electron').remote;
remote.dialog.showOpenDialog(remote.getCurrentWindow(), {properties:["openDirectory"]});

// window.electron = {};
// window.electron.dialog = dialog;