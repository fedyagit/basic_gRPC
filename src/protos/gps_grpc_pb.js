// GENERATED CODE -- DO NOT EDIT!

"use strict";
var grpc = require("grpc");
var gps_pb = require("./gps_pb.js");

function serialize_gps_GPSData(arg) {
  if (!(arg instanceof gps_pb.GPSData)) {
    throw new Error("Expected argument of type gps.GPSData");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gps_GPSData(buffer_arg) {
  return gps_pb.GPSData.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_gps_SaveDataResponse(arg) {
  if (!(arg instanceof gps_pb.SaveDataResponse)) {
    throw new Error("Expected argument of type gps.SaveDataResponse");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_gps_SaveDataResponse(buffer_arg) {
  return gps_pb.SaveDataResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

var GPSService = (exports.GPSService = {
  saveData: {
    path: "/gps.GPS/SaveData",
    requestStream: false,
    responseStream: false,
    requestType: gps_pb.GPSData,
    responseType: gps_pb.SaveDataResponse,
    requestSerialize: serialize_gps_GPSData,
    requestDeserialize: deserialize_gps_GPSData,
    responseSerialize: serialize_gps_SaveDataResponse,
    responseDeserialize: deserialize_gps_SaveDataResponse,
  },
});

exports.GPSClient = grpc.makeGenericClientConstructor(GPSService);
