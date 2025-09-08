import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "employee_management_db",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  }
);

export default sequelize;

// import mongoose from "mongoose";

// export const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URI);
//     console.log(`MongoDB connected : ${conn.connection.host}`);
//   } catch (error) {
//     console.log(`MongoDB not connected : ${error}`);
//   }
// };


