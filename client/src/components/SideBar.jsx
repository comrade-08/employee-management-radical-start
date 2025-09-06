import { Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCalendarDays, faCoffee, faGridVertical, faMessage, faMinus, faTableCellsLarge, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
    return (
        <div className="bg-light border-end" style={{ minWidth: "300px", minHeight: '100vh' }}>
            <Container className="border-bottom py-3">
                <div className="fw-bold text-primary ps-3 fs-2">RS-TECH</div>
            </Container>
            <Nav className="flex-column gap-2 pt-5">
                <NavLink
                    to="/"
                    end
                    style={{ width: "85%" }}
                    className={({ isActive }) =>
                        `nav-link rounded-start-0 rounded-pill py-3 ${isActive ? "bg-primary text-light" : "text-secondary"
                        }`
                    }
                >
                    <Container className="ps-3 d-flex gap-2 align-items-center">
                        <FontAwesomeIcon icon={faTableCellsLarge} /> Dashboard
                    </Container>
                </NavLink>
                <NavLink
                    to="/employees"
                    end
                    style={{ width: "85%" }}
                    className={({ isActive }) =>
                        `nav-link rounded-start-0 rounded-pill py-3 ${isActive ? "bg-primary text-light" : "text-secondary"
                        }`
                    }
                >
                    <Container className="ps-3 d-flex gap-2 align-items-center">
                        <FontAwesomeIcon icon={faUsers}/> Employee
                    </Container>
                </NavLink>
                <NavLink
                    to="/calendar"
                    end
                    style={{ width: "85%" }}
                    className={({ isActive }) =>
                        `nav-link rounded-start-0 rounded-pill py-3 ${isActive ? "bg-primary text-light" : "text-secondary"
                        }`
                    }
                >
                    <Container className="ps-3 d-flex gap-2 align-items-center">
                        <FontAwesomeIcon icon={faCalendarDays}/> Calendar
                    </Container>
                </NavLink>
                <NavLink
                    to="/messages"
                    end
                    style={{ width: "85%" }}
                    className={({ isActive }) =>
                        `nav-link rounded-start-0 rounded-pill py-3 ${isActive ? "bg-primary text-light" : "text-secondary"
                        }`
                    }
                >
                    <Container className="ps-3 d-flex gap-2 align-items-center">
                        <FontAwesomeIcon icon={faMessage} /> Messages
                    </Container>
                </NavLink>
            </Nav>
        </div>
    );
};

export default SideBar;
