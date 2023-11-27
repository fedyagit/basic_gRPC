import { MongoClient, Db, Collection } from "mongodb";
import { Pool } from "pg";
import { SaveDataResponse } from "../protos/gps_pb";
import dotenv = require("dotenv");

dotenv.config();

interface IGpsRepository {
  connect(): Promise<void>;
  closeConnection(): Promise<void>;
  saveData(data: any): Promise<any>;
  saveBulkData(data: any): Promise<any>;
}

class MongoGpsRepository implements IGpsRepository {
  private client: MongoClient;
  private db!: Db;

  constructor() {
    const connectionString = process.env.MONGO_CONNECTION_STRING;
    if (!connectionString) {
      throw new Error(
        "Please define the MONGO_CONNECTION_STRING environment variable"
      );
    }
    this.client = new MongoClient(connectionString);
  }

  async connect() {
    await this.client.connect();
    this.db = this.client.db("local");
  }

  async closeConnection() {
    await this.client.close();
  }

  async saveData(data: any) {
    const collection = this.db.collection("gpsdatas");
    const result = await collection.insertOne(data);
    return result;
  }

  async saveBulkData(data: any) {
    const collection = this.db.collection("gpsdatas");
    const result = await collection.insertMany(data);
    return result;
  }
}

class PostgresGpsRepository implements IGpsRepository {
  async connect() {
    // Mocked connection, does nothing
  }

  async closeConnection() {
    // Mocked connection, does nothing
  }

  async saveData(data: any) {
    // Mocked save, returns a successful result
    return { rows: [{ id: 1, ...data }], rowCount: 1 };
  }

  async saveBulkData(data: any) {
    // Mocked bulk save, returns a successful result
    return {
      rows: data.map((d: any, i: number) => ({ id: i + 1, ...d })),
      rowCount: data.length,
    };
  }
}

// Use an environment variable to determine which repository to use
const REPOSITORY = process.env.REPOSITORY;

let gpsRepository: IGpsRepository;

if (REPOSITORY === "MongoDB") {
  gpsRepository = new MongoGpsRepository();
} else if (REPOSITORY === "PostgreSQL") {
  gpsRepository = new PostgresGpsRepository();
} else {
  throw new Error(`Unsupported repository: ${REPOSITORY}`);
}

export async function connectToDb() {
  return gpsRepository.connect();
}

export async function closeDbConnection() {
  return gpsRepository.closeConnection();
}

export async function saveData(
  call: any,
  callback: (error: any, response?: SaveDataResponse) => void
) {
  const gpsData = {
    latitude: call.request.latitude,
    longitude: call.request.longitude,
  };

  try {
    const result = await gpsRepository.saveData(gpsData);
    let response = new SaveDataResponse();
    response.message = "Saved a new GPS data with id: " + result.insertedId;
    callback(null, response);
  } catch (error) {
    callback(error);
  }
}

export async function saveBulkData(
  call: any,
  callback: (error: any, response?: SaveDataResponse) => void
) {
  const gpsDataList = call.request.data.map((data: any) => ({
    latitude: data.getLatitude(),
    longitude: data.getLongitude(),
  }));

  try {
    const result = await gpsRepository.saveBulkData(gpsDataList);
    let response = new SaveDataResponse();
    response.message = "Saved " + result.insertedCount + " new GPS data";
    callback(null, response);
  } catch (error) {
    callback(error);
  }
}