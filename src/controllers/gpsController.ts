import { Request, Response } from "express";
import { saveData } from "../services/gpsClientService";

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
