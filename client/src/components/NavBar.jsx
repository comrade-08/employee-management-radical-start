import {
  Navbar,
  Nav,
  Container,
  Image,
  NavDropdown,
  Button,
} from "react-bootstrap";
import { Bell, SettingsIcon, TextQuoteIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { openSidebar } from "../features/employeeSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  return (
    <Navbar bg="white" expand className="border-bottom py-2">
      <Container fluid>
        {/* <Container className="border-bottom py-3"> */}
        <div className="d-md-none">
          <Button
          title="Open Sidebar"
            variant="outline-primary"
            onClick={() => dispatch(openSidebar())}
          >
            <TextQuoteIcon size={22}/>
          </Button>
        </div>
        <div className="fw-bold text-primary ps-3 fs-2 d-md-none">RS-TECH</div>
        {/* Mobile Toggle Button */}
        {/* </Container> */}
        <Nav className="ms-auto d-flex align-items-center gap-2 py-1">
          <Nav.Link className="position-relative bg-light rounded-circle">
            <SettingsIcon size={22} />
          </Nav.Link>
          <Nav.Link className="position-relative bg-light rounded-circle">
            <Bell size={22} />
          </Nav.Link>
          <Nav.Link className="position-relative">
            <Image
              src="https://randomuser.me/api/portraits/men/32.jpg"
              roundedCircle
              width={40}
              height={40}
            />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
