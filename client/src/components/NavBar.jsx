import { Navbar, Nav, Container, Image, NavDropdown, Button } from "react-bootstrap";
import { Bell, SettingsIcon } from "lucide-react";

const NavBar = () => {
  return (
    <Navbar bg="white" expand="sm" className="border-bottom py-2">
      <Container fluid>
        {/* <Container className="border-bottom py-3"> */}
          <div className="fw-bold text-primary ps-3 fs-2 d-md-none">RS-TECH</div>
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
