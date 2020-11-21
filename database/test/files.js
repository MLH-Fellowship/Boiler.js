const { MongoClient } = require("mongodb");

let back = async function getBackend(database, collectionName) {
  const uri =
    "mongodb+srv://hi:hi@ranger.lay9i.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const files = await getFiles(client, database, collectionName);
    if (files.repo) {
      console.log(files);
      return files;
    } else {
      return files;
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

async function getFiles(client, database, collectionName) {
  const result = await client.db(database).collection(collectionName).findOne({
    type: "backend",
  });
  return result;
}

module.exports = {
  backStuff: back,
};

// getBackend("testBoiler", "basicWebsite").catch(console.err);
