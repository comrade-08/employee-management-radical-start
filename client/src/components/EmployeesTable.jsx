import { useState, useEffect } from "react";
import { Table, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { Search, Eye, Pencil, Trash2, Plus, PlusCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";

const EmployeesTable = () => {
  const [employees, setEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);

  const empData = [
    {
      _id: "1",
      employeeId: "EMP001",
      name: "Jeeva Krishnan",
      department: "Frontend",
      designation: "Senior UI/UX Developer",
      project: "EMS",
      type: "Full-Time",
      status: "Active",
    },
    {
      _id: "2",
      employeeId: "EMP002",
      name: "Aarav Sharma",
      department: "Backend",
      designation: "Node.js Developer",
      project: "Payroll",
      type: "Full-Time",
      status: "Inactive",
    },
  ]

  useEffect(() => {
    setEmployees(empData);
    setAllEmployees(empData)
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase();

    if (!val) {
      setEmployees(allEmployees); // restore original list
      return;
    }

    const filteredEmployees = allEmployees.filter((emp) =>
      emp.name.toLowerCase().includes(val) // partial + case-insensitive
    );

    setEmployees(filteredEmployees);
  }

  return (
    <div className="bg-white p-4 w-100">
      {/* Top Bar */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <div className="fs-2 fw-bold">Employees</div>
        </div>
        <div className="d-flex gap-3">
          <div>
            <InputGroup size="lg">
              <InputGroup.Text className="bg-white rounded-start-3">
                <Search size={18} />
              </InputGroup.Text>
              <Form.Control type="text" onChange={handleSearch} placeholder="Search" className="px-3 py-2 border search-input rounded-end-3" />
            </InputGroup>
          </div>
          <div className="">
            <Link to="/employees/add" className="text-decoration-none">
              <Button size="lg" variant="primary" className="d-flex align-items-center gap-2 rounded-3 px-3 py-2">
                <PlusCircleIcon size={20} /> Add New Employee
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-2 p-2 rounded-3">
        <table className="table table-responsive overflow-auto">
          <thead className="">
            <tr className="border-b-0">
              <th className="p-3 text-muted fw-medium">Employee Name</th>
              <th className="p-3 text-muted fw-medium">Employee ID</th>
              <th className="p-3 text-muted fw-medium">Department</th>
              <th className="p-3 text-muted fw-medium">Designation</th>
              <th className="p-3 text-muted fw-medium">Project</th>
              <th className="p-3 text-muted fw-medium">Type</th>
              <th className="p-3 text-muted fw-medium">Status</th>
              <th className="p-3 text-muted fw-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr className="">
                <td colSpan="8" className="text-center border-0 py-5 fw-bold fs-4">
                  No records found
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp._id}>
                  <td className="p-3">{emp.name}</td>
                  <td className="p-3">{emp.employeeId}</td>
                  <td className="p-3">{emp.department}</td>
                  <td className="p-3">{emp.designation}</td>
                  <td className="p-3">{emp.project || "—"}</td>
                  <td className="p-3">{emp.type}</td>
                  <td className="p-3">
                    <span
                      className={`badge ${emp.status === "Active" ? "bg-success" : "bg-danger"
                        }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-3 d-flex gap-3">
                    <Link to={`/employees/${emp._id}`} title="View Employee">
                      <Button variant="outline-primary" size="sm">
                        <Eye size={16} />
                      </Button>
                    </Link>
                    <Link to={`/employees/edit/${emp._id}`} title="Edit Employee">
                      <Button variant="outline-success" size="sm">
                        <Pencil size={16} />
                      </Button>
                    </Link>
                    <Button
                      title="Delete Employee"
                      variant="outline-danger"
                      size="sm"
                      onClick={() => console.log("Delete", emp._id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesTable;
