import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default class NavBar extends Component
{
    render()
    {
        return (
            <React.Fragment>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                  <Container>
                    <Navbar.Brand href="#home">Name of Software</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">


                      <Nav className="justify-content-end" style={{ width: "100%" }}>
                          <NavDropdown title="Participant" id="collasible-nav-dropdown">
                          <NavDropdown.Item href="#">Play New Game</NavDropdown.Item>
                          </NavDropdown>

                          <NavDropdown title="Researcher" id="collasible-nav-dropdown">
                          <NavDropdown.Item href="#">Create Study</NavDropdown.Item>
                          <NavDropdown.Item href="#">Analytics</NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href="#">Generate Results</NavDropdown.Item>
                          </NavDropdown>
                      </Nav>
                    </Navbar.Collapse>
                  </Container>
                </Navbar>
            </React.Fragment>
        );
    }
}

