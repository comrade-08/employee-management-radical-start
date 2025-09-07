import { useRef, useState, useEffect } from "react";
import { Container, Form, Button, Image, Spinner } from "react-bootstrap";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import {
  Camera,
  ChevronLeft,
  CircleUserRoundIcon,
  SquarePenIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEmployeeById, updateEmployee } from "../features/employeeSlice";
import toast from "react-hot-toast";

const EditEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isUpdating } = useSelector((state) => state.employees);

  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    department: "",
    designation: "",
    project: "",
    type: "Full-Time",
    status: "Active",
    profile: "",
  });

  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch employee on mount
  useEffect(() => {
    dispatch(fetchEmployeeById(id))
      .unwrap()
      .then((empData) => {
        setFormData(empData);
        setSelectedImg(empData.profile || null);
      })
      .catch(() => {
        toast.error("Failed to load employee details.");
        navigate("/employees");
      });
  }, [dispatch, id]);

  const handleClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      toast.error("File is too large. Max allowed size is 8MB.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      setFormData({ ...formData, profile: base64Image });
    };
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateEmployee(formData))
      .unwrap()
      .then(() => {
        navigate("/employees")
      })
  };

  return (
    <div className="d-flex">
      <SideBar />
      <div className="flex-grow-1">
        <NavBar />
        <Container className="p-4">
          <div className="mb-4 fw-bold fs-2 d-flex align-items-center gap-2">
            <Button
              className="p-0"
              onClick={() => navigate(-1)}
              variant="link text-dark"
            >
              <ChevronLeft size={45} />
            </Button>
            Edit Employee
          </div>

          <div className="border-bottom border-2 mb-4">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <div
              style={{ width: "fit-content" }}
              className="d-flex align-items-center gap-2 pb-3 border-bottom border-primary border-2 text-primary fw-bold"
            >
              <CircleUserRoundIcon size={20} />
              Personal Information
            </div>
          </div>

          <Form onSubmit={handleSubmit}>
            <div
              className="mb-3 position-relative"
              style={{ width: 100, height: 100 }}
            >
              <Button
                onClick={handleClick}
                className="position-absolute px-2 bottom-0 end-0 me-1 mb-1 rounded-circle"
              >
                <SquarePenIcon size={18} />
              </Button>
              {selectedImg ? (
                <Image
                  width={100}
                  height={100}
                  className="rounded-2"
                  src={selectedImg}
                />
              ) : (
                <div
                  style={{ width: 100, height: 100 }}
                  className="border rounded-2 d-flex justify-content-center align-items-center text-muted"
                >
                  <Camera />
                </div>
              )}
            </div>

            <div className="row">
              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="fw-bold">Name*</Form.Label>
                <Form.Control
                  className="p-3"
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="fw-bold">Employee ID*</Form.Label>
                <Form.Control
                  className="p-3"
                  type="text"
                  name="employeeId"
                  placeholder="Employee ID"
                  value={formData.employeeId}
                  onChange={handleChange}
                  required
                  disabled
                />
              </Form.Group>
            </div>

            <div className="row">
              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="fw-bold">Department*</Form.Label>
                <Form.Control
                  className="p-3"
                  type="text"
                  name="department"
                  placeholder="Enter department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="fw-bold">Designation*</Form.Label>
                <Form.Control
                  className="p-3"
                  type="text"
                  name="designation"
                  placeholder="Enter designation"
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
                  className="p-3"
                  type="text"
                  name="project"
                  placeholder="Enter project name"
                  value={formData.project}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="fw-bold">Type*</Form.Label>
                <Form.Select
                  className="p-3"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Intern">Intern</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className="row">
              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="fw-bold">Status*</Form.Label>
                <Form.Select
                  className="p-3"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className="d-flex justify-content-end gap-3 mt-3 mt-md-0">
              <Button
                size="lg"
                className="px-3 py-2"
                type="button"
                onClick={() => navigate(-1)}
                variant="outline-secondary"
              >
                Cancel
              </Button>
              <Button
                size="lg"
                className="px-3 py-2"
                type="submit"
                variant="primary"
                disabled={isUpdating}
              >
                {isUpdating ? <Spinner size="sm" animation="border" /> : "Update"}
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default EditEmployee;
