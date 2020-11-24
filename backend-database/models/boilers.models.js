 const mongoose = require("mongoose")

 const Schema = mongoose.Schema

 const boilerSchema = new Schema({
   type: String,
   image: String,
   name: String,
   directions: Array,
   repo: String,
   commands: Array,
   description: String,
   files: [String]
 });

 const Boiler = mongoose.model("Boiler", boilerSchema);
 
 module.exports = Boiler;

//  {
// 	"type": "test",
// 	"name": "test",
// 	"directions": "test",
// 	"type": "test",
// 	"repo": "test",
// 	"commands": "test"
// }