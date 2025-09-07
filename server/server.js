import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import http from "http";

import employeeRoutes from "./src/routes/employee.route.js";
import { connectDB } from "./src/lib/db.js";

dotenv.config();
const PORT = process.env.PORT || 5003;
const __dirname = path.resolve();

const app = express();
const server = http.createServer(app);

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));
app.use(cookieParser());

// Enable CORS only in development
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173", // Frontend dev server
      credentials: true,
    })
  );
}

// API Routes
app.use("/api/employees", employeeRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  console.log("!!! APPLICATION IN PRODUCTION MODE !!!");
  const clientPath = path.join(__dirname, "../client/dist");
  app.use(express.static(clientPath));

  // Send index.html for all unmatched routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}/`);
});
