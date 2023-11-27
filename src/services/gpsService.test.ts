import {
  connectToDb,
  closeDbConnection,
  saveData,
  saveBulkData,
} from "./gpsService";
import { SaveDataResponse } from "../protos/gps_pb";
import dotenv = require("dotenv");

dotenv.config();

jest.mock("./gpsService");

describe("GPS Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("connects to the database", async () => {
    await connectToDb();
    expect(connectToDb).toHaveBeenCalled();
  });

  it("closes the database connection", async () => {
    await closeDbConnection();
    expect(closeDbConnection).toHaveBeenCalled();
  });

  it("saves data", async () => {
    const mockCall = {
      request: {
        latitude: 1,
        longitude: 2,
      },
    };
    const mockCallback = jest.fn();

    await saveData(mockCall, mockCallback);

    expect(saveData).toHaveBeenCalledWith(mockCall, mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(
      null,
      expect.any(SaveDataResponse)
    );
  });

  it("saves bulk data", async () => {
    const mockCall = {
      request: {
        data: [
          {
            getLatitude: () => 1,
            getLongitude: () => 2,
          },
        ],
      },
    };
    const mockCallback = jest.fn();

    await saveBulkData(mockCall, mockCallback);

    expect(saveBulkData).toHaveBeenCalledWith(mockCall, mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(
      null,
      expect.any(SaveDataResponse)
    );
  });
});
