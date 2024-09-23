// Brendan
// TODO: Need to center the card
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

export default function AccountLogin() {
  return (
    <Card
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100 vh",
        width: "18rem",
      }}
    >
      <Card.Body>
        <Card.Title>Sign in</Card.Title>
        <Form.Label>Email or Username</Form.Label>
        <Form.Control type="text" id="username" />
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" id="inputPassword" />
        <Button variant="primary">Sign in</Button>
      </Card.Body>
    </Card>
  );
}
