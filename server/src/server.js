import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import employeeRoutes from "./routes/employee.route.js";
import { connectDB } from "./lib/db.js";

const PORT = process.env.PORT || 5003;
dotenv.config();
const app = express();
const __dirname = path.resolve();
console.log(__dirname, "__dirname");

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/employees", employeeRoutes);

if (process.env.NODE_ENV === "production") {
  console.log("!!! APPLICATION IN PRODUCTION MODE !!!");
  try {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get(/.*/, (req, res) => {
      res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
    });
  } catch (error) {
    console.log("PRODUCTION ERROR : " + error);
  }
}

// MongoDB connection
connectDB();
app.listen(PORT, () => console.log("Server is running on : ", PORT));
