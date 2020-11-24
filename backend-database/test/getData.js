const mongoose = require("mongoose");
// const files = require("./test/files");
// let backSchema = require("./test/schema")
const Schema = mongoose.Schema;

let back = async function getBackend(docName) {
  const uri = `mongodb+srv://hi:hi@ranger.lay9i.mongodb.net/testBoiler?retryWrites=true&w=majority`;
  const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  };

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
    { collection: "uploadTest" }
  );

  try {
    await connect(uri, connectionParams);
    const back = await mongoose.model("uploadTest", boilSchema);
    const files = await back.find({ name: docName });
    console.log(files);
    return files;
  } finally {
    mongoose.connection.close(function () {
      console.log(
        "Mongoose default connection is disconnected due to application termination"
      );
    });
  }
};

let front = async function getFrontend() {
  const uri = `mongodb+srv://hi:hi@ranger.lay9i.mongodb.net/testBoiler?retryWrites=true&w=majority`;
  const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  };

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
    { collection: "uploadTest" }
  );

  try {
    await connect(uri, connectionParams);
    const back = await mongoose.model("uploadTest", boilSchema);
    const files = await back.find();
    console.log(files);
    return files;
  } finally {
    mongoose.connection.close(function () {
      console.log(
        "Mongoose default connection is disconnected due to application termination"
      );
    });
  }
};

async function connect(uri, connectionParams) {
  // Connect to Mongoose
  mongoose
    .connect(uri, connectionParams)
    .then(() => {
      console.log("Connected to database ");
    })
    .catch((err) => {
      console.error(`Error connecting to the database. \n${err}`);
    });
}

// back("sampleBoilerLolz");
// front();

module.exports = {
  back: back,
  front: front,
};
