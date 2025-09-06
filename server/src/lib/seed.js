import mongoose from "mongoose";
import dotenv from "dotenv";
import Employee from "./models/Employee.js";

dotenv.config();

const employees = [
    {
        name: "Jeeva Krishnan",
        employeeId: "EMP001",
        department: "Frontend",
        designation: "Senior UI/UX Developer",
        project: "Employee Management System",
        type: "Full-Time",
        status: "Active",
    },
    {
        name: "Aarav Sharma",
        employeeId: "EMP002",
        department: "Backend",
        designation: "Node.js Developer",
        project: "Payroll System",
        type: "Full-Time",
        status: "Active",
    },
    {
        name: "Priya Nair",
        employeeId: "EMP003",
        department: "HR",
        designation: "HR Manager",
        project: "Recruitment Portal",
        type: "Part-Time",
        status: "Inactive",
    },
    {
        name: "Vikram Singh",
        employeeId: "EMP004",
        department: "DevOps",
        designation: "DevOps Engineer",
        project: "CI/CD Pipeline",
        type: "Full-Time",
        status: "Active",
    },
];

const seedEmployees = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await Employee.deleteMany(); // Clear old records
        await Employee.insertMany(employees);

        console.log("✅ Employee data seeded successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Error seeding employees:", error);
        mongoose.connection.close();
    }
};

seedEmployees();
