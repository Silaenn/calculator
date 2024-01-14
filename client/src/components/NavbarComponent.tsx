import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import icon from "../assets/images/icon.svg";
const NavbarComponent = () => {
  return (
    <Navbar expand="lg" className="fixed-top bg-body-tertiary navbar">
      <Container>
        <div>
          <img src={icon} alt="" width={40} className="me-3 mb-1" />
          <Navbar.Brand
            href="#home"
            style={{
              fontStyle: "italic",
              fontFamily: "bulgatti",
            }}
            className="fs-3 fw-bold"
          >
            CalcGenius
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">About</Nav.Link>
            <Nav.Link href="#link">My Profile</Nav.Link>
            <NavDropdown title="Model" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <div className="ms-4">
            <button className="btn btn-outline-danger rounded-1 ps-4 pe-4">
              Join with Me
            </button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
