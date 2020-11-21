const { MongoClient } = require("mongodb");

let front = async function getFrontend(database) {
  const uri =
    "mongodb+srv://hi:hi@ranger.lay9i.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const names = await getCollectionNames(client, database);
    const docs = await getAllDocuments(client, database, names);
    return docs;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

async function getCollectionNames(client, database) {
  let collectionName = [];
  let collection = await client.db(database).listCollections().toArray();
  for (i = 0; i < collection.length; i++) {
    collectionName.push(collection[i].name);
  }
  // console.log(collectionName);
  return collectionName;
}

async function getAllDocuments(client, database, names) {
  let frontendDocuments = [];
  for (i = 0; i < names.length; i++) {
    let test = await client
      .db(database)
      .collection(names[i])
      .findOne({ type: "frontend" });
    frontendDocuments.push(test);
  }
  console.log(frontendDocuments);
}

module.exports = {
  frontStuff: front,
};

// https://docs.mongodb.com/drivers/node/quick-start
