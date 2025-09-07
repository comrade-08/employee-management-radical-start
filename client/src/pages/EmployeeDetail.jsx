import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Image, Row, Col, Badge, Button, Spinner } from "react-bootstrap";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { Camera, ChevronLeft, CircleUserRoundIcon } from "lucide-react";
import { fetchEmployeeById } from "../features/employeeSlice";
import { useDispatch, useSelector } from "react-redux";

const EmployeeDetail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const { isFetch } = useSelector((state) => state.employees)

  useEffect(() => {
    dispatch(fetchEmployeeById(id)).unwrap().then((empData) => {
      setEmployee(empData);
    }).catch(() => {
      navigate('/employees')
    })
  }, [dispatch, id]);

  return (
    <div className="d-flex">
      <SideBar />
      <div className="flex-grow-1">
        <NavBar />
        <Container className="p-4">
          <div className="mb-4 fw-bold fs-2 d-flex align-items-center gap-2">
            <Button className="p-0" onClick={() => navigate(-1)} variant="link text-dark"><ChevronLeft size={45} /></Button> View Employee Details
          </div>
          <div className="border-bottom border-2 mb-4">
            <div style={{ width: 'fit-content' }} className="d-flex align-items-center gap-2 pb-3 border-bottom border-primary border-2 text-primary fw-bold">
              <CircleUserRoundIcon size={20} />
              Personal Information
            </div>
          </div>
          {
            (isFetch && !employee) ? <div className="py-5 text-center"><Spinner variant="primary"/></div> :
              <div className="">
                <div>
                  {
                    (employee?.profile) ? <Image width={100} height={100} className="rounded-2" src={employee?.profile || ""} /> : <div style={{ width: 100, height: 100 }} className="border rounded-2 d-flex justify-content-center align-items-center text-muted"><Camera /></div>
                  }
                </div>
                <Row className="">
                  <Col md={4} className="border-sm border-md-0 border-bottom py-3">
                    <div className="text-muted mb-1">Name</div>
                    <div className="">{employee?.name}</div>
                  </Col>
                  <Col className="border-sm border-md-0 border-bottom py-3">
                    <div className="text-muted mb-1">Employee ID</div>
                    <div className="">{employee?.employeeId}</div>
                  </Col>
                </Row>
                <Row className="">
                  <Col md={4} className="border-sm border-md-0 border-bottom py-3">
                    <div className="text-muted mb-1">Designation</div>
                    <div className="">{employee?.designation}</div>
                  </Col>
                  <Col className="border-sm border-md-0 border-bottom py-3">
                    <div className="text-muted mb-1">Department</div>
                    <div className="">{employee?.department}</div>
                  </Col>
                </Row>
                <Row className="">
                  <Col md={4} className="border-sm border-md-0 border-bottom py-3">
                    <div className="text-muted mb-1">Project</div>
                    <div className="">{employee?.project || "-"}</div>
                  </Col>
                  <Col className="border-sm border-md-0 border-bottom py-3">
                    <div className="text-muted mb-1">Type</div>
                    <div className="">{employee?.type}</div>
                  </Col>
                </Row>
                <Row className="">
                  <Col className="border-sm border-md-0 border-bottom py-3">
                    <div className="text-muted mb-1">Status</div>
                    <div className="">{employee?.status}</div>
                  </Col>
                </Row>
              </div>
          }
        </Container>
      </div>
    </div>
  );
};

export default EmployeeDetail;
