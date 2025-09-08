import { DataTypes } from "sequelize";
import sequelize from "../lib/db.js";

const Employee = sequelize.define("Employee", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employeeId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  project: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.ENUM("Full-Time", "Part-Time", "Intern"),
    allowNull: false,
    defaultValue: "Full-Time",
  },
  status: {
    type: DataTypes.ENUM("Active", "Inactive"),
    allowNull: false,
    defaultValue: "Active",
  },
  profile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true, // adds createdAt & updatedAt
});

export default Employee;


// import mongoose from "mongoose";

// const employeeSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     employeeId: { type: String, unique: true }, // auto-generated
//     department: { type: String, required: true },
//     designation: { type: String, required: true },
//     project: { type: String }, // optional
//     type: {
//       type: String,
//       enum: ["Full-Time", "Part-Time", "Intern"],
//       required: true,
//       default: "Full-Time",
//     },
//     status: {
//       type: String,
//       enum: ["Active", "Inactive"],
//       required: true,
//       default: "Active",
//     },
//     profile: { type: String }, // optional, from Cloudinary
//   },
//   { timestamps: true }
// );

// const Employee = mongoose.model("Employee", employeeSchema);
// export default Employee