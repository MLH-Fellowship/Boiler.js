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

module.exports = get_git_repo;