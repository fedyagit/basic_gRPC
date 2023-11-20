import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import {
  connectToDb,
  saveData,
  closeDbConnection,
} from "./services/gpsService";

const PROTO_PATH = __dirname + "/protos/gps.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const gpsProto = grpc.loadPackageDefinition(packageDefinition)
  .gps as unknown as { GPS: any };

async function main() {
  try {
    await connectToDb();

    const server = new grpc.Server();
    server.addService(gpsProto.GPS.service, { saveData: saveData });
    server.bindAsync(
      "0.0.0.0:50051",
      grpc.ServerCredentials.createInsecure(),
      () => {
        server.start();
      }
    );
    console.log("Server running on http://0.0.0.0:50051");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

main().catch(console.error);

process.on("exit", closeDbConnection);
