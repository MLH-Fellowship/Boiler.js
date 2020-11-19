var util = require("util");
var exec = require("child_process").exec;

function get_git_repo(url, dir) {
  var folderName = url.split("/").pop();
  exec(`git clone ${url} ${dir}\\${folderName}`, function (err, stdout, stderr) {
    console.log(stdout);
  });
}

get_git_repo("https://github.com/KohinaTheCat/Backend-Demo", "C:\\Users\\Clara\\Desktop\\MLH");