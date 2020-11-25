const path = require("path");
const util = require("util");
// Using the promisify function to allow more graceful async command execution.
const exec = util.promisify(require("child_process").exec);

// usage: get_git_repo("https://github.com/KohinaTheCat/Backend-Demo", "C:\\Users\\Clara\\Desktop\\MLH");
async function get_git_repo(url, dir, commands) {
  try {
    // Parsing directory and naming structure.
    const folderName = path.basename(url, path.extname(url));
    const fullPath = path.join(dir, folderName);
    // Create the process as a Promise, then await its resolution.
    const proc = await exec(`git clone ${url}.git "${fullPath}"`, {
      windowsHide: false,
    });
    // Logging.
    console.log("stderr:", proc.stderr);
    console.log("stdout:", proc.stdout);
    // Return some data to be sent to the front end.
    return {
      message: `Boiler successfully deployed to ${fullPath}!`,
      success: true,
      code: 0,
    };
  } catch (e) {
    // console.log(e)
    return {
      message: `Error with code ${e.code}`,
      success: false,
      code: e.code,
    };
  }
}

// usage: run_commands(path.join(os.homedir(), 'Boilers', 'Backend-Demo'), ["cd frontend", "npm i", "cd .. ", "cd backend", "npm i"]);
function run_commands(dirPath, commands) {
  let commandString = commands.join(" && ");
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

// get_git_repo(
//   "https://github.com/KohinaTheCat/Backend-Demo",
//   "C:\\Users\\Clara\\Desktop\\MLH"
// );
// run_commands("C:\\Users\\Clara\\Desktop\\MLH\\Backend-Demo", [
//   "cd frontend",
//   "npm i",
//   "cd .. ",
//   "cd backend",
//   "npm i",
// ]);

module.exports = get_git_repo;
