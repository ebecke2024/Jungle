
// TODO: Need to modify the card so it appears in the center of the page
// TODO: Need to add a button to register a new account

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

export default function AccountLogin() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null); // Reset error on new login attempt

    try {
      // Fetch the customer data from your API
      const response = await fetch("http://localhost:5137/api/Customers");

      if (!response.ok) {
        throw new Error("Failed to fetch customers.");
      }

      const customers = await response.json(); // Get customer list from API
      console.log("Fetched customers:", customers); // Log the API response

      // Find the customer where the username or email and password match
      const foundCustomer = customers.find(
        (customer) =>
          (customer.custEmail === login || customer.userName === login) &&
          customer.custPassWord === password
      );

      if (foundCustomer) {
        alert(`Login successful! Welcome, ${foundCustomer.custName}`);
        // Handle successful login 
      } else {
        setError("Invalid username/email or password.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "18rem",
      }}
    >
      <Card.Body>
        <Card.Title>Sign in</Card.Title>
        <Form.Label>Email or Username</Form.Label>
        <Form.Control
          type="text"
          id="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          id="inputPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button variant="primary" onClick={handleSignIn} disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </Card.Body>
    </Card>
  );
}
