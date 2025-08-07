import { Db, MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const uri = `mongodb+srv://joesanthosh:${password}@cluster0.fn7p16c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let database: Db;

export const connect = async () => {
    try {
        await client.connect();
        database = client.db("ProductAppDatabase");
        console.log("Connected to DB");
    }
    catch (err) {
        console.error(err);
    }
}

export const getDatabase = () => {
    if (!database) {
        throw new Error("Database failed to initialize"); 
    }

    return database;
}