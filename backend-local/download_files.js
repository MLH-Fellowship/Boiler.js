const path = require('path');
const os = require('os');
const exec = require("child_process").exec;
const execSync = require("child_process").execSync;

// usage: get_git_repo("https://github.com/KohinaTheCat/Backend-Demo", "C:\\Users\\Clara\\Desktop\\MLH");
async function get_git_repo(url, dir) {
  const folderName = path.basename(url, path.extname(url));
  const fullPath = path.join(dir, folderName);
  exec(`git clone ${url}.git "${fullPath}"`, function (err, stdout, stderr) {
    console.log(stdout, err, stderr);  
  });
  console.log(fullPath);
  return fullPath; 
}

// usage: run_commands(path.join(os.homedir(), 'Boilers', 'Backend-Demo'), ["cd frontend", "npm i", "cd .. ", "cd backend", "npm i"]);
async function run_commands(dirPath, commands){
  console.log("Run");
  let last = commands.pop();
  let commandString = commands.map((val) => val + " &&").join(' ').concat(` ${last}`);
  console.log(commandString);
  exec(`${commandString}`, {cwd: dirPath}, function(err, stdout, stderr){
      console.log(stdout, err, stderr);
    });
};

// returns a promise
async function wrapperFunc(res, boilerPath) {
  try {
      let r1 = await get_git_repo(res.repo, boilerPath);
      if (r1 == null) {
        let r2 = await run_commands(r1, res.commands);
      }
      
      // now process r2
      return "Successful";     // this will be the resolved value of the returned promise
  } catch(e) {
      console.log(e);
      throw e;      // let caller know the promise was rejected with this reason
  }
}

wrapperFunc().then(result => {
  // got final result
}).catch(err => {
  // got error
});

module.exports = wrapperFunc

/*
{
  get_repo: get_git_repo,
  run: run_commands
}
*/