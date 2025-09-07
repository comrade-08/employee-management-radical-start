import { Container, Nav, Offcanvas, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faTableCellsLarge,
  faUsers,
  faMessage,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar, closeSidebar } from "../features/employeeSlice";

const menuItems = [
  { to: "/", label: "Dashboard", icon: faTableCellsLarge },
  { to: "/employees", label: "Employees", icon: faUsers },
  { to: "/calendar", label: "Calendar", icon: faCalendarDays },
  { to: "/messages", label: "Messages", icon: faMessage },
];

const SideBar = () => {
  const dispatch = useDispatch();
  const isSideOpen = useSelector((state) => state.employees.isSideOpen);

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className="bg-light border-end d-none d-md-block"
        style={{ minWidth: "250px", minHeight: "100vh" }}
      >
        {/* Logo/Header */}
        <Container className="border-bottom py-3">
          <div className="fw-bold text-primary ps-3 fs-2">RS-TECH</div>
        </Container>

        {/* Navigation */}
        <Nav className="flex-column gap-2 pt-4 pe-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `nav-link rounded-start-0 rounded-pill py-3 px-3 d-flex align-items-center gap-2 ${
                  isActive ? "bg-primary text-light fw-semibold" : "text-secondary"
                }`
              }
            >
              <FontAwesomeIcon icon={item.icon} size="lg" />
              {item.label}
            </NavLink>
          ))}
        </Nav>
      </div>

      {/* Mobile Offcanvas Sidebar */}
      <Offcanvas
        show={isSideOpen}
        onHide={() => dispatch(closeSidebar())}
        className="bg-light"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold text-primary fs-3">RS-TECH</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column gap-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  `nav-link rounded-3 py-2 px-3 d-flex align-items-center gap-2 ${
                    isActive ? "bg-primary text-light fw-semibold" : "text-secondary"
                  }`
                }
                onClick={() => dispatch(closeSidebar())} // ✅ dispatch required
              >
                <FontAwesomeIcon icon={item.icon} size="lg" />
                {item.label}
              </NavLink>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SideBar;
