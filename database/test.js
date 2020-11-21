const mongoose = require('mongoose')

let api = require('./api');
let schema = require('./schema');

var params = {
    colName: "uploadTest",
    image: "flask.icon",
    name: "flask",
    directions: [
        "yarn start",
        "yarn build",
        "yarn deploy xD"
    ],
    repo: "https://google.com",
    commands: [
        "yarn start",
        "yarn add",
        "yarn yarn"
    ]
}

// api.front(schema);
// api.back('sampleBoilerLolz', schema);
api.upload(params, schema);

/*
// Frontend
let get = require('./getData');
let schema = require('./schema');
get.front(schema);
*/

// Backend
// get.back("tset");

// Create
// let upload = require('./upload');



// upload.upload(params);

