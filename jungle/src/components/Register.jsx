import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const Register = () => {
  const [customer, setCustomer] = useState({
    custName: "",
    custEmail: "",
    userName: "",
    custPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to API using the fetch API
      const response = await fetch("https://localhost:7080/api/Customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });

      if (response.ok) {
        alert("Customer added successfully!");
        // Reset the form after successful submission
        setCustomer({
          custName: "",
          custEmail: "",
          userName: "",
          custPassword: "",
        });
      } else {
        alert("Failed to add customer.");
      }
    } catch (error) {
      console.error("Error adding customer", error);
      alert("Failed to add customer.");
    }
  };

  return (
    <div>
        <Container>
            <h2 className="my-4">Customer Registration</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        id="custName" 
                        name="custName" 
                        placeholder="Enter your name" 
                        onChange={handleChange}
                        value={customer.custName} 
                        required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        id="custEmail" 
                        name="custEmail" 
                        placeholder="name@email.com" 
                        onChange={handleChange}
                        value={customer.custEmail} 
                        required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control 
                        type="text" 
                        id="userName" 
                        name="userName" 
                        placeholder="Select unique username" 
                        onChange={handleChange}
                        value={customer.userName} 
                        required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        id="custPassword" 
                        name="custPassword" 
                        placeholder="Enter password" 
                        onChange={handleChange}
                        value={customer.custPassword} 
                        required />
                </Form.Group>

                <Button variant="success" type="submit">Register</Button>
            </Form>
      </Container>
    </div>
  );
};

export default Register;