const { MongoClient } = require("mongodb");

async function main() {
    const uri = "mongodb+srv://hi:hi@ranger.lay9i.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    try {
        await client.connect();
        await listDatabases(client);

        /*
        await createListing(client,
            {
                name: "gang gang",
                summary: "Gucci gang",
                bedrooms: 3,
                bathrooms: 420
            }
        ); */

        // await findOneListingByName(client, "gang gang");
        /*
        await createMultipleListings(client, 
            [{
                name: "DJ Kareb",
                age: 69
            },
            {
                name: "Jose",
                age: 21
            }]);
        */

        // await findListings(client);

        /*
        await findOneListingByName(client, "Jose");
        await updateListingByName(client, "Jose", {name: "Jose", age: 17});
        await findOneListingByName(client, "Jose");
        */

        /*
        await findOneListingByName(client, "Jose");
        await upsertListingByName(client, "Kakowin",
            {name: "Kakowin", age: 3});
        */

        // await updateAllListingsToHavePropertyType(client);

        // await deleteListingByName(client, "DJ Kareb");

        // await deleteListings(client, 30)

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.err);

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(`- ${db.name}`))
};

// Create
async function createListing(client, newListing) {
    const result = await client.db("firstCollection").collection("book").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
};

async function createMultipleListings(client, newListings) {
    const result = await client.db("newCollection").collection("book").insertMany(newListings);
    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
}

// Read
async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("newCollection").collection("books")
        .findOne({ name: nameOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name "${nameOfListing}":`);
        console.log(result);
    } else {
        console.log(`No listings found with the name "${nameOfListing}"`);
    }
}

async function findListings(client, { minAge = 30 } = {}) {
    const cursor = client.db("newCollection").collection("books").find({
        age: { $gte: minAge }
    })
        .sort({ age: 1 })
        .limit(10);

    const results = await cursor.toArray();
    console.log(results);
};

// Update
async function updateListingByName(client, nameOfDoc, updateDoc) {
    result = await client.db("newCollection").collection("books")
        .updateOne(
            { name: nameOfDoc },
            { $set: updateDoc },
            { upsert: true });

    console.log(`${result.matchedCount} document(s) matched the query criteria`);
    console.log(`${result.modifiedCount} document(s) was/were updated`);
}

async function upsertListingByName(client, nameOfDoc, updateDoc) {
    result = await client.db("newCollection").collection("books")
        .updateOne(
            { name: nameOfDoc },
            { $set: updateDoc },
            { upsert: true });

    console.log(`${result.matchedCount} document(s) matched the query criteria`);
    if (result.upsertedCount > 0) {
        console.log(`One document was inserted with the id ${result.upsertedId._id}`)
    } else {
        console.log(`${result.modifiedCount} document(s) was/were updated`);
    }
}

async function updateAllListingsToHavePropertyType(client) {
    const result = await client.db("newCollection").collection("books")
        .updateMany({ property_type: { $exists: false } },
            { $set: { property_type: "Kaleeb" } });
    console.log(`${result.matchedCount} document(s) matched the query criteria`);
    console.log(`${result.modifiedCount} document(s) was/were updated`);
};

// Delete

async function deleteListingByName(client, nameOfDoc) {
    const result = await client.db("newCollection").collection("books")
        .deleteOne({ name: nameOfDoc });

    console.log(`${result.deletedCount} document(s) was/were deleted`);
}

async function deleteListings(client, age) {
    const result = await client.db("newCollection").collection("books")
        .deleteMany({ "age": { $lt: age } });

    console.log(`${result.deletedCount} document(s) was/were deleted`);
}