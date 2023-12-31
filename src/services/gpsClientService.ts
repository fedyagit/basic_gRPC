import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { GPSData, GPSDataList, SaveDataResponse } from "../protos/gps_pb";
import dotenv = require("dotenv");

dotenv.config();

const PROTO_PATH = __dirname + "/../protos/gps.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const gpsProto = grpc.loadPackageDefinition(packageDefinition)
  .gps as unknown as { GPS };

const client = new gpsProto.GPS(
  process.env.GRPC_SERVER_ADDRESS,
  grpc.credentials.createInsecure()
);

export function saveData(
  latitude: number,
  longitude: number
): Promise<SaveDataResponse> {
  return new Promise((resolve, reject) => {
    const gpsData = new GPSData();
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

export function saveBulkData(
  gpsDataArray: { latitude: number; longitude: number }[]
): Promise<SaveDataResponse> {
  return new Promise((resolve, reject) => {
    const gpsDataList = new GPSDataList();

    gpsDataArray.forEach((data) => {
      const gpsData = new GPSData();
      gpsData.setLatitude(data.latitude);
      gpsData.setLongitude(data.longitude);
      gpsDataList.addData(gpsData);
    });

    client.saveBulkData(gpsDataList, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}
