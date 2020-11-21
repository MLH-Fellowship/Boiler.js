const mongoose = require('mongoose')
const Schema = mongoose.Schema

const boilSchema = new Schema({
    type: String,
    image: String,
    name: String,
    directions: Array,
    type: String,
    repo: String,
    commands: Array
}, {collection: 'uploadTest'});

module.exports = boilSchema;