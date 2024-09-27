import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';

const CUSTOMER_API_URL = 'https://localhost:7080/api/Customers/';
const CustomersList = () => {
  const [customers, setCustomers] = useState([]);

  // Function to fetch customers from API
  const fetchCustomers = async () => {
    try {
      const response = await fetch(CUSTOMER_API_URL); // Replace with your API URL
      const data = await response.json();
      setCustomers(data); // Set the data in the state
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  // Fetch customers when the component loads
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <Container>
        <br />
      <h2>Customer List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customerId}>
              <td>{customer.customerId}</td>
              <td>{customer.custName}</td>
              <td>{customer.custEmail}</td>
              <td>{customer.userName}</td>
              <td>{customer.custPassWord}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CustomersList;
