import express from "express";
import {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
} from "../controllers/employee.controller.js";

const router = express.Router();

router.post("/", createEmployee);       // ➝ Create employee
router.get("/", getEmployees);          // ➝ Get all employees
router.get("/:id", getEmployeeById);    // ➝ Get single employee
router.put("/:id", updateEmployee);     // ➝ Update employee
router.delete("/:id", deleteEmployee);  // ➝ Delete employee

export default router;
