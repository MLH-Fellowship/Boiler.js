const path = require('path');
const os = require('os');
const exec = require("child_process").exec;
const fs = require('fs') 

// Sample setup commands
const commands = ["mkdir setup", "cd setup", 
                  "git clone https://github.com/KohinaTheCat/Backend-Demo.git", 
                  "cd Backend-Demo"]

// Original Path
let daPath = path.join(os.homedir(), 'Boilers')

async function run_setup_commands(url, commands, dir){
    const folderName = path.basename(url, path.extname(url));
    const fullPath = path.join(dir, folderName);  
    console.log(fullPath);
    for (i = 0; i < commands.length; i++){
        // Execute file
        let proc = await run_one_command(command, fullPath, dirPath);
        // Write to log file
        
        // Write to path file if path changed
        proc.stdout.on('data', function (data) {
            fs.writeFile("log.txt", data, err => {if (err) throw err});
        });

    };

  };

function run_one_command(command, fullPath, dirPath) {
    return exec(`${command} ${fullPath} && node ${dirPath}`);
}


let proc = run_one_command('node path.js', "C:\Users\HP Computer\Boilers", "C:\Users\HP Computer\Documents\Current Tings\Coding\Sprint 4\Boiler.js\backend-local");

// Write to text file
proc.stdout.on('data', function (data) {
    console.log('hi');
    console.log(data);
    fs.writeFile("log.txt", data, err => {if (err) throw err});
});

function callPythonFile (args) {
  return exec("node path.js");
}

//then you call the function like this:
/*
var proc = callPythonFile("hi");

var test;
proc.stdout.on('data', function (data) {

    //do something with data
}); */

proc.on('error', function (err) {
  //handle the error
});

/*
function callbackTest(variable, callback) {

    var out = null;
    exec('node path.js', function (err, stdout, stderr) {
        if (err !== null) {
            callback(err);
        };
        out = callback(null, stdout);
    });
};

callbackTest("hi" , function (err, out) {
    console.log(out);
  });

// console.log(i);




function callPythonFile (args, callback) {
  var out = null
  exec("../Prácticas/python/Taylor.py 'sin(w)' -10 10 0 10", 
    function (error, stdout, stderr) {
      if (error !== null) 
        callback(err);
      callback(null, out);
    });
}


*/
// console.log(x);
// console.log(process.cwd());

// run_setup_commands('https://github.com/KohinaTheCat/Backend-Demo', commands, daPath);

/*
  // run_setup_commands("asdf", path.join(os.homedir(), 'Boilers'))

  function get_git_repo(url, dir) {
    const folderName = path.basename(url, path.extname(url));
    const fullPath = path.join(dir, folderName);
    console.log(fullPath);
    exec(`cd backend-test && echo %CD%`, function (err, stdout, stderr) {
      console.log("STDout", stdout);
      console.log("Error", err);
      console.log("stderr", stderr);
    }); 
  }

  // get_git_repo("https://github.com/MLH-Fellowship/Boiler.js", path.join(os.homedir(), 'Boilers'))


  */