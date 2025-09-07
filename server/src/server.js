import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import http from 'http'

const app = express()
const server = http.createServer(app)

dotenv.config();
const PORT = process.env.PORT || 5003;
const __dirname = path.resolve()

import employeeRoutes from './routes/employee.route.js'

import { connectDB } from "./lib/db.js";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json({limit: '15mb'}));
app.use(express.urlencoded({limit: '15mb', extended: true}))

app.use(bodyParser.json({limit: '15mb'}))
app.use(bodyParser.urlencoded({limit: '15mb', extended: true}))


app.use("/api/employees", employeeRoutes);

if (process.env.NODE_ENV === "production") {
  console.log("!!! APPLICATION IN PRODUCTION MODE !!!");
  try {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get(/.*/, (req, res) => {
      res.sendFile(
        path.join(__dirname, "../client", "dist", "index.html")
      );
    });
  } catch (error) {
    console.log("PRODUCTION ERROR : " + error);
  }
}

server.listen(PORT, () => {
  console.log(`Server is running on : http://localhost:${PORT}/`);
  connectDB();
});
