import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { GPSData, SaveDataResponse } from "../protos/gps_pb";

const PROTO_PATH = __dirname + "/../protos/gps.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const gpsProto = grpc.loadPackageDefinition(packageDefinition)
  .gps as unknown as { GPS: any };

const client = new gpsProto.GPS(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

export function saveData(
  latitude: number,
  longitude: number
): Promise<SaveDataResponse> {
  return new Promise((resolve, reject) => {
    let gpsData = new GPSData();
    gpsData.setLatitude(latitude);
    gpsData.setLongitude(longitude);

    client.saveData(gpsData.toObject(), (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}
