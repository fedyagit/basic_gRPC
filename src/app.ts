import express = require("express");
import * as bodyParser from "body-parser";
import { postBulkGpsData, postGpsData } from "./controllers/gpsController";
import dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    if (authHeader === process.env.SECRET_TOKEN) {
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.post("/gps", postGpsData);
app.post("/gps/bulk", postBulkGpsData);

app.listen(3000, () => {
  console.log("REST API is listening on port 3000");
});
