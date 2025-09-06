import Employee from "../models/Employee.model.js";
import cloudinary from "../lib/cloudinary.js";

// Helper ➝ Generate random 10-digit Employee ID
const generateEmployeeId = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

// ------------------ CREATE ------------------
export const createEmployee = async (req, res) => {
  try {
    const { name, department, designation, project, type, status, profile } = req.body;

    // 🔹 Validation (project and profile are optional)
    if (!name || !department || !designation || !type || !status) {
      return res.status(400).json({
        message: "Name, Department, Designation, Type, and Status are required fields.",
      });
    }

    let profileImageUrl = "";

    // If profile is provided, upload to Cloudinary
    if (profile) {
      const uploadResult = await cloudinary.uploader.upload(profile, {
        folder: "employees",
      });
      profileImageUrl = uploadResult.secure_url;
    }

    const employee = new Employee({
      name,
      department,
      designation,
      project,
      type,
      status,
      employeeId: generateEmployeeId(),
      profileImage: profileImageUrl,
    });

    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ------------------ READ (ALL) ------------------
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------ READ (ONE) ------------------
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------ UPDATE ------------------
export const updateEmployee = async (req, res) => {
  try {
    const { name, department, designation, project, type, status, profile } = req.body;

    // 🔹 Validation (project and profile are optional)
    if (!name || !department || !designation || !type || !status) {
      return res.status(400).json({
        message: "Name, Department, Designation, Type, and Status are required fields.",
      });
    }

    let updateData = { name, department, designation, project, type, status };

    // If new profile is provided, upload to Cloudinary
    if (profile) {
      const uploadResult = await cloudinary.uploader.upload(profile, {
        folder: "employees",
      });
      updateData.profileImage = uploadResult.secure_url;
    }

    const employee = await Employee.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ------------------ DELETE ------------------
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
