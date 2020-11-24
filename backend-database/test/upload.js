const mongoose = require("mongoose");

var params = {
  docName: "anotherTest",
  image: "gang",
  name: "tset",
  directions: ["yarn start", "yarn build", "yarn deploy xD"],
  repo: "https://google.com",
  commands: ["yarn start", "yarn add", "yarn yarn"],
};

const uri = `mongodb+srv://hi:hi@ranger.lay9i.mongodb.net/testBoiler?retryWrites=true&w=majority`;
const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

let upload = async function (params) {
  try {
    // Connect to Mongoose
    mongoose
      .connect(uri, connectionParams)
      .then(() => {
        console.log("Connected to database ");
        main(params);
      })
      .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
      });
  } finally {
    mongoose.connection.close(function () {
      console.log(
        "Mongoose default connection is disconnected due to application termination"
      );
    });
  }
};

function main(params) {
  const Schema = mongoose.Schema;

  const boilSchema = new Schema(
    {
      type: String,
      image: String,
      name: String,
      directions: Array,
      type: String,
      repo: String,
      commands: Array,
    },
    { collection: "testBoiler" }
  );

  const Model = mongoose.model;
  const boilerSchema = Model(params.docName, boilSchema);

  const boiler = new boilerSchema({
    image: params.image,
    name: params.name,
    directions: ["hi", "bye"],
    repo: "https://google.com",
    commands: ["hi", "bye"],
  });

  boiler.save();
  console.log("worked");
}

module.exports = {
  upload: upload,
};
// upload(params);
// main(params);

/*
const mongoose = require("mongoose");

const uri = `mongodb+srv://hi:hi@ranger.lay9i.mongodb.net/testBoiler?retryWrites=true&w=majority`;
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};

// Connect to Mongoose
mongoose.connect(uri,connectionParams)
    .then( () => {
        console.log("Connected to database ")
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });


const Schema = mongoose.Schema;

const boilSchema = new Schema({
    type: String,
    image: String,
    name: String,
    directions: Array,
    type: String,
    repo: String,
    commands: Array
}, {collection: params.colName});

const Model = mongoose.model
const boilerSchema = Model(params.colName, boilSchema);

const boiler = new boilerSchema({
    type: "frontend",
    image: "bobby",
    name: "John",
    directions: [
        "hi", "bye"
    ],
    type: "backend",
    repo: "https://google.com",
    commands: [
        "hi", "bye"
    ]
})

boiler.save();
*/

/*
const front =  new frontSchema({
    type: "frontend",
    image: params.image,
    name: params.name,
    directions: params.directions
});
const back = new backSchema({
    type: "backend",
    repo: params.repo,
    commands: params.commands
});
front.save();
back.save();

*/

/*
let create = async function create(params){
    const uri = `mongodb+srv://hi:hi@ranger.lay9i.mongodb.net/${params.colName}?retryWrites=true&w=majority`;
    const connectionParams={
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    };
    try {
        // const fontSchema, backSchema = await connect(uri, connectionParams, params.colName);

        const front = await new schemas[0]({
            type: "frontend",
            image: params.image,
            name: params.name,
            directions: params.directions
        });
        const back = await new schemas[1]({
            type: "backend",
            repo: params.repo,
            commands: params.commands
        });
        await front.save();
        await back.save();


    } finally {
        mongoose.connection.close(function(){
            console.log("Mongoose default connection is disconnected due to application termination");
        });
    }
}

async function connect(uri, connectionParams, name){
    // Connect to Mongoose
    mongoose.connect(uri,connectionParams)
    .then( () => {
        console.log("Connected to database ")
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });
}

async function getNames(mongoose){
    mongoose.connection.db.collections().toArray((err, names) => names);
}

var testValues = {
    colName: "testBoilerplate",
    image: "gang",
    name: "sampleBoilerLolz",
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

// create(testValues);

*/
