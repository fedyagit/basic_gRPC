import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import {
  connectToDb,
  saveData,
  closeDbConnection,
  saveBulkData,
} from "./services/gpsService";
import dotenv = require("dotenv");

dotenv.config();

const PROTO_PATH = __dirname + "/protos/gps.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const gpsProto = grpc.loadPackageDefinition(packageDefinition)
  .gps as unknown as { GPS };

async function main() {
  try {
    await connectToDb();

    const server = new grpc.Server();
    server.addService(gpsProto.GPS.service, {
      saveData: saveData,
      saveBulkData: saveBulkData,
    });

    server.bindAsync(
      process.env.GRPC_SERVER_ADDRESS ?? "",
      grpc.ServerCredentials.createInsecure(),
      () => {
        server.start();
      }
    );
    console.log(`Server running on ${process.env.GRPC_SERVER_ADDRESS}`);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

main().catch(console.error);

process.on("exit", closeDbConnection);
