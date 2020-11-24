const path = require("path");
const os = require("os");
const exec = require("child_process").exec;
const execSync = require("child_process").execSync;

// usage: get_git_repo("https://github.com/KohinaTheCat/Backend-Demo", "C:\\Users\\Clara\\Desktop\\MLH");
function get_git_repo(url, dir, commands) {
  const folderName = path.basename(url, path.extname(url));
  const fullPath = path.join(dir, folderName);
  exec(
    `git clone ${url}.git "${fullPath}"`,
    {
      windowsHide: false,
    },
    function (err, stdout, stderr) {
      console.log(stdout, err, stderr);
      // run_commands(fullPath, commands);
    }
  );
  console.log(fullPath);
  return fullPath;
}

// usage: run_commands(path.join(os.homedir(), 'Boilers', 'Backend-Demo'), ["cd frontend", "npm i", "cd .. ", "cd backend", "npm i"]);
function run_commands(dirPath, commands) {
  var commandString = ""
  commands.map((command) =>{
    commandString += command + " && "
  })
  commandString = commandString.slice(0, -3)
  exec(
    `${commandString}`,
    {
      windowsHide: false,
    },
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log("just ran: ", commandString);
    }
  );
}

get_git_repo(
  "https://github.com/KohinaTheCat/Backend-Demo",
  "C:\\Users\\Clara\\Desktop\\MLH"
);
run_commands("C:\\Users\\Clara\\Desktop\\MLH\\Backend-Demo", [
  "cd frontend",
  "npm i",
  "cd .. ",
  "cd backend",
  "npm i",
]);

module.exports = get_git_repo;
