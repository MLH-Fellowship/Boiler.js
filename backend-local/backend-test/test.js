/*
const path = require('path');
const os = require('os');
const download = require('../backend-local/download_files');
const exec = require("child_process").exec;

const setup = download.setup;

const boilerPath = path.join(os.homedir(), 'Boilers');

// const logPath = path.join(os.homedir(), 'Backend-Demo.txt');
var commands = ['mkdir files'];
console.log(boilerPath);
// setup(commands, boilerPath, logPath);

exec(`${commands[0]} "${boilerPath}"`) */


const path = require('path');
const os = require('os');
const exec = require("child_process").exec;
const fs = require('fs');

// usage: get_git_repo("https://github.com/KohinaTheCat/Backend-Demo", "C:\\Users\\Clara\\Desktop\\MLH");
function get_git_repo(url, dir) {
  const folderName = path.basename(url, path.extname(url));
  const fullPath = path.join(dir, folderName);
  console.log(fullPath);
  
  exec(`mkdir test`, fullPath, function (err, stdout, stderr) {
    console.log(stdout, err, stderr);
  }); 
}

get_git_repo("https://github.com/KohinaTheCat/Backend-Demo", path.join(os.homedir(), 'Boilers'));

