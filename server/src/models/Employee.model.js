import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    employeeId: { type: String, unique: true }, // auto-generated
    department: { type: String, required: true },
    designation: { type: String, required: true },
    project: { type: String }, // optional
    type: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Intern"],
      required: true,
      default: "Full-Time",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      required: true,
      default: "Active",
    },
    profileImage: { type: String }, // optional, from Cloudinary
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);
