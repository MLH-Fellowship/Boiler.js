// Frontend
let get = require("./getData");
// get.front();

// Backend
// get.back("tset");

// Create
let upload = require("./upload");

var params = {
  docName: "finalTest",
  image: "gang",
  name: "tset",
  directions: ["yarn start", "yarn build", "yarn deploy xD"],
  repo: "https://google.com",
  commands: ["yarn start", "yarn add", "yarn yarn"],
};

upload.upload(params);
