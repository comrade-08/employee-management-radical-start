import { Container } from "react-bootstrap";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import EmployeesTable from "../components/EmployeesTable";

const Employees = () => {
  
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-grow-1">
        <NavBar />
        <Container fluid className="my-4">
          <EmployeesTable />
        </Container>
      </div>
    </div>
  );
};

export default Employees;
