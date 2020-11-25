const path = require("path");
const util = require("util");
// Using the promisify function to allow more graceful async command execution.
const exec = util.promisify(require("child_process").exec);
const os = require("os");

// usage: get_git_repo("https://github.com/KohinaTheCat/Backend-Demo", "C:\\Users\\Clara\\Desktop\\MLH");
async function get_git_repo(url, dir, commands) {
  // Parsing directory and naming structure.
  const folderName = path.basename(url, path.extname(url));
  const fullPath = path.join(dir, folderName);

  try {
    // Create the process as a Promise, then await its resolution.
    const proc = await exec(`git clone ${url}.git "${fullPath}"`, {
      windowsHide: false,
    });
    // Logging.
    console.log("stderr:", proc.stderr);
    console.log("stdout:", proc.stdout);
    // Return some data to be sent to the front end.
    return {
      message: `Boiler successfully deployed to "${fullPath}"!`,
      success: true,
      code: 0,
      path: `${folderName}`,
      commands: commands,
    };
  } catch (e) {
    // console.log(e)
    return {
      message: `Error with code ${e.code}`,
      success: false,
      code: e.code,
      path: `${folderName}`,
      commands: commands,
    };
  }
}

// usage: run_commands(path.join(os.homedir(), 'Boilers', 'Backend-Demo'), ["cd frontend", "npm i", "cd .. ", "cd backend", "npm i"]);
async function run_command(dirPath, command, commandNum) {
  // console.log("Dirpath", dirPath, 'commands', commands);
  // let commandString = commands.join(" && ");
  const boilerPath = path.join(os.homedir(), "Boilers");
  const finalPath = path.join(boilerPath, dirPath);
  let fullCommand = command[commandNum];
  console.log("Final", finalPath);
  console.log("Command", command[commandNum]);
  try {
    const proc = await exec(`${fullCommand} && echo %cd% `, {cwd: finalPath, windowsHide: false});
    console.log("stderr:", proc.stderr);
    console.log("stdout:", proc.stdout);
    var copyPath = [...proc.stdout]
    return {message: `${fullCommand} was successful!`, success: true, code: 0, path: `${proc.stdout}`}
  } catch (e) {
    // console.log(e)
      return {message: `Error with code ${e.code}!`, success: false, code: e.code}
  }
}

module.exports = {
  get: get_git_repo,
  command: run_command
}
