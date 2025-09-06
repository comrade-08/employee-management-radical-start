import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import EmployeeDetail from "./pages/EmployeeDetail";
import { Container } from "react-bootstrap";

function App() {
  return (
    // <Container className="shadow p-0">
      <Router>
        <Routes>
          {/* Default Page */}
          <Route path="/" element={<Employees />} />

          {/* Employees CRUD */}
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/employees/edit/:id" element={<EditEmployee />} />
          <Route path="/employees/:id" element={<EmployeeDetail />} />
        </Routes>
      </Router>
    // </Container>
  );
}

export default App;
