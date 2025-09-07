import { useState, useEffect } from "react";
import { Table, Form, Button, InputGroup, Row, Col, Image, Spinner } from "react-bootstrap";
import { Search, Eye, Pencil, Trash2, Plus, PlusCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { fetchEmployees } from "../features/employeeSlice.js";
import toast from "react-hot-toast";
import DeleteEmployee from "../pages/DeleteEmployee.jsx";

const EmployeesTable = () => {
  const dispatch = useDispatch()
  const [employees, setEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const {loading} = useSelector((state) => state.employees)

  const [showDel, setShowDel] = useState(false);
  const handleClose = () => {
    console.log('closed');
    setShowDel(false)
  };
  const handleShow = () => setShowDel(true);

  useEffect(() => {
    dispatch(fetchEmployees()).unwrap().then((empData) => {
      console.log(empData, 'employeetable')
      setEmployees(empData)
      setAllEmployees(empData)
    }).catch(() => {
      toast.error("Failed to fetch employees!")
    });
  }, [dispatch]);

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
      <div className="d-md-flex justify-content-between align-items-center mb-5">
        <div>
          <div className="fs-2 fw-bold mb-3 mb-md-0">Employees</div>
        </div>
        <div className="d-flex gap-3">
          <div>
            <InputGroup size='lg'>
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
      <div className="border border-2 p-2 rounded-3 table-responsive w-100">
        <Table>
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
            {
              loading && employees?.length === 0 && (
                <tr className="">
                <td colSpan="8" className="text-center border-0 py-5">
                  <Spinner variant="primary"/>
                </td>
              </tr>
              )
            }
            {employees.length === 0 && !loading ? (
              <tr className="">
                <td colSpan="8" className="text-center border-0 py-5 fw-bold fs-4">
                  No records found
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp._id}>
                  <td className="p-3 d-flex align-items-center gap-2">{emp.profile && <Image src={emp.profile} style={{ width: 30, height: 30 }} className="rounded-circle" />}{emp.name}</td>
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
                      onClick={handleShow}
                    >
                      <Trash2 size={16} />
                      <DeleteEmployee showDel={showDel} handleClose={handleClose} emp={emp} />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

      </div>
    </div>
  );
};

export default EmployeesTable;
