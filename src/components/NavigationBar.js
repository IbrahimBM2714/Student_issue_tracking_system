import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/" style={{ padding: "0px 10px" }}>
        Student Issue Portal
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
          <Link as={Link} to="/issue-form" className="nav-link">
            Issue Form
          </Link>
          <Link as={Link} to="/display-issues" className="nav-link">
            Display Issues
          </Link>
          <Link as={Link} to="/about" className="nav-link">
            About
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
