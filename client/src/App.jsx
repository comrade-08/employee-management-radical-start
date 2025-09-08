import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import EmployeeDetail from "./pages/EmployeeDetail";
import { Container } from "react-bootstrap";
import CalendarPage from "./pages/CalendarPage";
import NotFound from "./pages/NotFound";

function App() {
  // console.log(import.meta.env.MODE || "" , 'MODE')
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Employees />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/add" element={<AddEmployee />} />
        <Route path="/employees/edit/:id" element={<EditEmployee />} />
        <Route path="/employees/:id" element={<EmployeeDetail />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
