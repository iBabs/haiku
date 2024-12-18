import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI; // Store your MongoDB URI in an environment variable
const options = {};

let client;
let clientPromise;

if (!uri) {
    throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

async function getDatabase() {
    const client = await clientPromise;
    return client.db();
}

export async function getCollection(collectionName) {
    const db = await getDatabase();
    return db.collection(collectionName);
}

export default clientPromise;
