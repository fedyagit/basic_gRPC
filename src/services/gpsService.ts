import { MongoClient } from "mongodb";
import { SaveDataResponse } from "../protos/gps_pb";

let client;

export async function connectToDb() {
  client = new MongoClient(process.env.MONGO_CONNECTION_STRING ?? "");

  await client.connect();
  console.log("Connected successfully to MongoDB");

  const db = client.db("local");
  await db.createCollection("gpsdatas");
  console.log("Created collection 'gpsdatas' or it already exists");
}

export function saveData(call, callback) {
  const gpsData = {
    latitude: call.request.latitude,
    longitude: call.request.longitude,
  };

  const db = client.db("local");
  const collection = db.collection("gpsdatas");

  collection
    .insertOne(gpsData)
    .then((result) => {
      let response = new SaveDataResponse();
      response.message = "Saved a new GPS data with id: " + result.insertedId;
      callback(null, response);
    })
    .catch((error) => callback(error));
}

export function closeDbConnection() {
  if (client) {
    client.close();
  }
}
