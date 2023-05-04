import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-router-dom";

export default class NavBar extends Component
{
    render()
    {
        return (
            <React.Fragment>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                  <Container>
                    <Navbar.Brand>Name of Software</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">


                      <Nav className="justify-content-end" style={{ width: "100%" }}>
                          <NavDropdown title="Participant" id="collasible-nav-dropdown">
                          <NavDropdown.Item>
                              <Link to="/activity">Play New Game</Link>
                          </NavDropdown.Item>
                          </NavDropdown>

                          <NavDropdown title="Researcher" id="collasible-nav-dropdown">
                          <NavDropdown.Item>
                              <Link to="/image-upload-options">Create Study</Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                              <Link to="/analytics">Analytics </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item>
                              <Link to="/results">Generate Results</Link>
                          </NavDropdown.Item>
                          </NavDropdown>
                      </Nav>
                    </Navbar.Collapse>
                  </Container>
                </Navbar>
            </React.Fragment>
        );
    }
}

