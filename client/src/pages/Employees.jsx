import { useState, useEffect } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import { Search, Eye, Pencil, Trash2, PlusCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, fetchEmployees } from "../features/employeeSlice.js";
import toast from "react-hot-toast";
import DeleteEmployee from "../pages/DeleteEmployee.jsx";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import {
  Table,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Paper,
  CircularProgress,
  Avatar,
  Chip,
} from "@mui/material";

const Employees = () => {
  const dispatch = useDispatch();
  const [employees, setEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const { loading } = useSelector((state) => state.employees);

  const [showDel, setShowDel] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);

  const openDeleteModal = (emp) => {
    setSelectedEmp(emp);
    setShowDel(true);
  };

  const closeDeleteModal = () => {
    setShowDel(false);
    setSelectedEmp(null);
  };

  useEffect(() => {
    dispatch(fetchEmployees())
      .unwrap()
      .then((empData) => {
        setEmployees(empData);
        setAllEmployees(empData);
      })
      .catch(() => {
        toast.error("Failed to fetch employees!");
      });
  }, [dispatch]);

  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase();
    if (!val) {
      setEmployees(allEmployees);
      return;
    }
    const filteredEmployees = allEmployees.filter((emp) =>
      emp.name.toLowerCase().includes(val)
    );
    setEmployees(filteredEmployees);
  };

  const handleDelete = () => {
    if (!selectedEmp?._id) return;

    dispatch(deleteEmployee(selectedEmp._id))
      .unwrap()
      .then(() => {
        setEmployees((prev) =>
          prev.filter((emp) => emp._id !== selectedEmp._id)
        );
        setAllEmployees((prev) =>
          prev.filter((emp) => emp._id !== selectedEmp._id)
        );
        closeDeleteModal();
      });
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      <SideBar />
      <div className="flex-grow-1">
        <NavBar />
        <Container fluid className="py-4 px-3 px-md-4">
          {/* Page Heading with Search + Add */}
          <div className="d-flex flex-column flex-xl-row justify-content-between align-items-start align-items-xl-center gap-3 mb-4">
            <div className="fw-bold fs-3 fs-md-2">Employees</div>

            <div className="d-flex flex-column flex-md-row gap-2 gap-md-3 w-xl-auto">
              {/* Search */}
              <InputGroup className="flex-grow-1 flex-md-grow-0">
                <InputGroup.Text className="bg-white border rounded-start-3">
                  <Search size={18} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  onChange={handleSearch}
                  placeholder="Search"
                  className="border rounded-end-3 shadow-none"
                />
              </InputGroup>

              {/* Add Button */}
              <Link
                to="/employees/add"
                className="text-decoration-none w-100 w-md-auto"
              >
                <Button
                  variant="primary"
                  className="d-flex align-items-center justify-content-center gap-2 rounded-3 px-3 py-2 w-100 w-md-auto text-nowrap"
                >
                  <PlusCircleIcon size={18} /> Add New Employee
                </Button>
              </Link>
            </div>
          </div>

          {/* Table Card */}
          <div className="border border-2 rounded-3 bg-white">
            {/* Only table scrolls on small screens */}
            <div style={{ overflowX: "auto"}} className="w-100" >
              <TableContainer
                className=""
                component={Paper}
                sx={{ borderRadius: "12px", maxWidth: '100%' }}
              >
                <Table className="" sx={{ minWidth: 500 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell className="fw-medium text-nowrap text-muted">
                        Employee Name
                      </TableCell>
                      <TableCell className="fw-medium text-nowrap text-muted">
                        Employee ID
                      </TableCell>
                      <TableCell className="fw-medium text-nowrap text-muted">
                        Department
                      </TableCell>
                      <TableCell className="fw-medium text-nowrap text-muted">
                        Designation
                      </TableCell>
                      <TableCell className="fw-medium text-nowrap text-muted">
                        Project
                      </TableCell>
                      <TableCell className="fw-medium text-nowrap text-muted">
                        Type
                      </TableCell>
                      <TableCell className="fw-medium text-nowrap text-muted">
                        Status
                      </TableCell>
                      <TableCell className="fw-medium text-nowrap text-muted">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {/* Loading State */}
                    {loading && employees?.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} align="center" sx={{ py: 5 }}>
                          <CircularProgress color="primary" />
                        </TableCell>
                      </TableRow>
                    )}

                    {/* No Records */}
                    {employees.length === 0 && !loading ? (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          align="center"
                          sx={{ py: 8, fontWeight: "bold", fontSize: 18 }}
                        >
                          No records found
                        </TableCell>
                      </TableRow>
                    ) : (
                      employees.map((emp) => (
                        <TableRow key={emp._id} hover>
                          <TableCell
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              whiteSpace: "nowrap",
                              // border: employees.length < 2 ? 'none' :''
                            }}
                          >
                            {emp.profile ? (
                              <Avatar
                                src={emp.profile}
                                alt={emp.name}
                                sx={{ width: 30, height: 30 }}
                              />
                            ) : (
                              <Avatar
                                src={`${emp.name}`}
                                alt={emp.name}
                                sx={{ width: 30, height: 30 }}
                              />
                            )}
                            {emp.name}
                          </TableCell>
                          <TableCell className="text-nowrap">
                            {emp.employeeId}
                          </TableCell>
                          <TableCell className="text-nowrap">
                            {emp.department}
                          </TableCell>
                          <TableCell className="text-nowrap">
                            {emp.designation}
                          </TableCell>
                          <TableCell className="text-nowrap">
                            {emp.project || "—"}
                          </TableCell>
                          <TableCell className="text-nowrap">
                            {emp.type}
                          </TableCell>
                          <TableCell className="text-nowrap">
                            <Chip
                              label={emp.status}
                              color={
                                emp.status === "Active" ? "success" : "error"
                              }
                              size="small"
                            />
                          </TableCell>
                          <TableCell className="text-nowrap">
                            <div style={{ display: "flex", gap: "8px" }}>
                              <Link
                                to={`/employees/${emp._id}`}
                                title="View Employee"
                              >
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  size="sm"
                                >
                                  <Eye size={16} />
                                </Button>
                              </Link>
                              <Link
                                to={`/employees/edit/${emp._id}`}
                                title="Edit Employee"
                              >
                                <Button
                                  variant="outlined"
                                  color="success"
                                  size="sm"
                                >
                                  <Pencil size={16} />
                                </Button>
                              </Link>
                              <Button
                                title="Delete Employee"
                                variant="outlined"
                                color="error"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation(); // optional: prevent row click handlers
                                  openDeleteModal(emp);
                                }}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </Container>
      </div>
      <DeleteEmployee
        showDel={showDel}
        handleClose={closeDeleteModal}
        emp={selectedEmp}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Employees;
