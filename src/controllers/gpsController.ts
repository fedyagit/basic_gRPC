import { Request, Response } from "express";
import { saveData, saveBulkData } from "../services/gpsClientService";

export async function postGpsData(req: Request, res: Response) {
  try {
    const response = await saveData(
      Number(req.body.latitude),
      Number(req.body.longitude)
    );

    res.json({ message: response.message });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function postBulkGpsData(req: Request, res: Response) {
  try {
    const gpsDataList = req.body.map((data) => ({
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
    }));

    
    const response = await saveBulkData(gpsDataList);

    res.json({ message: response.message });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
