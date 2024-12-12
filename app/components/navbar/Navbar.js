"use client";
import { Link, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

/**
 * Component: The top navigation bar
 * @returns {JSX.Element}
 */
const Navbars = () => {
  const tokenKeyName = "token";
  const isAuth = !!localStorage.getItem(tokenKeyName);
  const navigate = useNavigate();

  const loginUser = () => {
    const invalidToken = "some-login-token";
    localStorage.setItem(tokenKeyName, invalidToken);
    navigate('/profile/Vijit');
  };

  const logoutUser = () => {
    localStorage.removeItem(tokenKeyName);
    navigate('/');
  };

  const loginButton = (<Button className="button is-white" onClick={loginUser}>Log in</Button>);
  const logoutButton = (<Button className="button is-black" onClick={logoutUser}>Log out</Button>);
  
  return ( 
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">ICON</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/profile/Vijit">Profile</Nav.Link>
            <Nav.Link as={Link} to="/createmasterobject">Create Object or Field Master</Nav.Link>
            <Nav.Link as={Link} to="/validateRecords">Validate Records</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="buttons">
            {isAuth ? logoutButton : loginButton}
        </div>
      </Container>
    </Navbar>
  );
 };
 
 export default Navbars;