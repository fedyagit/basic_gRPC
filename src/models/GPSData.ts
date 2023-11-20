import mongoose, { Document, Schema } from "mongoose";

export interface IGPSData extends Document {
  latitude: number;
  longitude: number;
}

const GPSDataSchema: Schema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const GPSData = mongoose.model<IGPSData>("GPSData", GPSDataSchema, "gpsdatas");

export default GPSData;
