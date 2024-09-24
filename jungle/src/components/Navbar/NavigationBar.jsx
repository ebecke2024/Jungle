import { useState } from "react";
import {
  Navbar,
  NavDropdown,
  Form,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";

export default function NavigationBar() {
  // NOTICE: THIS WILL ALL BE REMOVED WHEN WE ACTUALLY IMPLEMENT LOGGING IN
  var accountName = "Placeholder Username";
  var [isLoggedIn, setIsLoggedIn] = useState(false);

  const LogoUrl = 'https://i.postimg.cc/pdhx5bzJ/865aa6c1-3d95-4e76-a5a8-d3eb25d3d95e.jpg'
  function testLogin() {
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <Navbar className="bg-body-tertiary justify-content-between">
      <Container>
        <Navbar.Brand href="/">
        <img
              src={LogoUrl}
              width="50"
              height="50"
              alt="Logo" />
        <span className="brand-text">
            Jungle
        </span>
        </Navbar.Brand>
        <Form className="d-inline">
          <Row xs={"auto"}>
            <Col>
              <Form.Control type="text" placeholder="Search Jungle" />
            </Col>
            <Col>
              <Button type="submit">Submit</Button>
            </Col>
          </Row>
        </Form>
        <NavDropdown title={isLoggedIn ? accountName : "Not Logged In"}>
          {isLoggedIn ? (
            <div>
              <NavDropdown.Item href="/cart">My Cart</NavDropdown.Item>
              <NavDropdown.Item href="/account">
                Account Settings
              </NavDropdown.Item>
              <NavDropdown.Item onClick={testLogin}>Logout</NavDropdown.Item>
            </div>
          ) : (
            <div>
              {/* NOTICE: SWITCH TO ROUTE TO LOGIN PAGE LATER*/}
              <NavDropdown.Item href={"/login"}>Login</NavDropdown.Item>
              <NavDropdown.Item href="/register">Register</NavDropdown.Item>
            </div>
          )}
        </NavDropdown>
      </Container>
    </Navbar>
  );
}
