"use client";
import { Link, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navbars = ({ history }) => {
  const isAuth = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const loginUser = () => {
    localStorage.setItem("token", "some-login-token");
    navigate('/profile/Vijit');
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate('/');
  };
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
            {/* <Nav.Link as={Link} to="about">About</Nav.Link>
            <Nav.Link as={Link} to="/counter">Counter</Nav.Link> */}
            <Nav.Link as={Link} to="/profile/Vijit">Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="buttons">
            {!isAuth ? (
                <Button className="button is-white" onClick={loginUser}>
                Log in
                </Button>
            ) : (
                <Button className="button is-black" onClick={logoutUser}>
                Log out
                </Button>
            )}
        </div>
      </Container>
    </Navbar>
  );
 };
 
 export default Navbars;