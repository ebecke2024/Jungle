import { useState } from "react";
import { Navbar, NavDropdown, Form, Button, Container, Row, Col } from "react-bootstrap";

export default function NavigationBar() {
    var accountName = "Placeholder Username";

    var [isLoggedIn, setIsLoggedIn] = useState(false);

    function testLogin() {
        setIsLoggedIn(!isLoggedIn);
    }

    return (
        <Navbar className="bg-body-tertiary justify-content-between">
            <Container>
                <Navbar.Brand href="/">Jungle Store</Navbar.Brand>
                <Form inline>
                    <Row xs={"auto"}>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Search Jungle"
                            />
                        </Col>
                        <Col>
                            <Button type="submit">Submit</Button>
                        </Col>
                    </Row>
                </Form>
                <NavDropdown title={isLoggedIn ? (accountName) : ("Not Logged In")}>
                    {isLoggedIn ? (
                        <div>
                            <NavDropdown.Item href="/cart">
                                My Cart
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/account">
                                Account Settings
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={testLogin}>
                                Logout
                            </NavDropdown.Item>
                        </div>
                    ) : (
                        <div>
                            <NavDropdown.Item onClick={testLogin}> {/* NOTICE: SWITCH TO ROUTE TO LOGIN PAGE LATER*/}
                                Login
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/register">
                                Register
                            </NavDropdown.Item>
                        </div>
                    )}
                </NavDropdown>
            </Container>
        </Navbar>
    );
}