const path = require('path');
const os = require('os');
const exec = require("child_process").exec;

// usage: get_git_repo("https://github.com/KohinaTheCat/Backend-Demo", "C:\\Users\\Clara\\Desktop\\MLH");
function get_git_repo(url, dir) {
  const folderName = path.basename(url, path.extname(url));
  const fullPath = path.join(dir, folderName);
  exec(`git clone ${url}.git "${fullPath}"`, function (err, stdout, stderr) {
    console.log(stdout, err, stderr);
  });
}

// usage: run_commands(path.join(os.homedir(), 'Boilers', Backend-Demo), ["cd frontend", "npm i", "cd .. ", "cd backend", "npm i"])
function run_commands(dirPath, commands){
  let last = commands.pop();
  let commandString = commands.map((val) => val + " &&").join(' ').concat(` ${last}`);
  console.log(commandString);
  exec(`${commandString}`, {cwd: dirPath}, function(err, stdout, stderr){
      console.log(stdout, err, stderr);
    });
};

module.exports = get_git_repo;

run_commands(path.join(os.homedir(), 'Boilers', 'Backend-Demo'), ["cd frontend", "npm i", "cd .. ", "cd backend", "npm i"]);
