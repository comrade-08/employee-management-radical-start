import { useState } from "react";
import { Container, Form, Button, Card, Image } from "react-bootstrap";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { ArrowLeft, ChevronLeft, CircleUserRoundIcon, SquarePenIcon } from "lucide-react";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    name: "",
    department: "",
    designation: "",
    project: "",
    type: "Full-Time",
    status: "Active",
    profile: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Employee Added:", formData);
    // TODO: Call backend API (POST)
  };

  return (
    <div className="d-flex">
      <SideBar />
      <div className="flex-grow-1">
        <NavBar />
        <Container className="p-4">
          <div className="mb-4 fw-bold fs-2 d-flex align-items-center gap-2">
            <Button className="p-0" onClick={() => window.history.back()} variant="link text-dark"><ChevronLeft size={45} /></Button> Add Employee
          </div>
          <div className="border-bottom border-2 mb-4">
            <div style={{width: 'fit-content'}} className="d-flex align-items-center gap-2 pb-3 border-bottom border-primary border-2 text-primary fw-bold">
            <CircleUserRoundIcon size={20}/>
            Personal Information
          </div>
          </div>
          <Form onSubmit={handleSubmit}>
            <div className="mb-3 position-relative" style={{width: 100, height: 100}}>
              <Button className="position-absolute px-2 bottom-0 end-0 me-1 mb-1 rounded-circle"><SquarePenIcon size={18}/></Button>
              <Image width={100} height={100} className="rounded-2" src="data:image/jpeg;base64,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"/>
            </div>
            <div className="row">
              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="fw-bold">Name*</Form.Label>
                <Form.Control
                  className="p-3"
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="fw-bold">Employee ID*</Form.Label>
                <Form.Control
                  type="text"
                  name="employeeId"
                  className="p-3"
                  placeholder="Select employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="row">
              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="fw-bold">Department*</Form.Label>
                <Form.Control
                  type="text"
                  name="department"
                  className="p-3"
                  placeholder="Select Department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="fw-bold">Designation*</Form.Label>
                <Form.Control
                  type="text"
                  name="designation"
                  className="p-3"
                  placeholder="Select Department"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="row">
              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="fw-bold">Project (Optional)</Form.Label>
                <Form.Control
                  type="text"
                  name="project"
                  className="p-3"
                  placeholder="Select Department"
                  value={formData.project}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="fw-bold">Type*</Form.Label>
                <Form.Select
                  name="type"
                  className="p-3"
                  placeholder="Select Department"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option>Full-Time</option>
                  <option>Part-Time</option>
                  <option>Intern</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="row">
              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="fw-bold">Status*</Form.Label>
                <Form.Select
                  name="status"
                  className="p-3"
                  placeholder="Select Department"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="d-flex justify-content-end gap-3">
              <Button size="lg" className="px-3 py-2" type="button" onClick={() => window.history.back()} variant="outline-secondary">
                Cancel
              </Button>
              <Button size="lg" className="px-3 py-2" type="submit" variant="primary">
                Confirm
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default AddEmployee;
