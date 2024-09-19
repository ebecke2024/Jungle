import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import CreditCard from "./CreditCard"; // Adjust the import path as needed

function Payment({ customerId }) {
  // Hard-coded payment methods for testing layout
  // TODO: NEED to remove hard coded methods and consume API to populate paymentMethods
  // TODO: GET payment methods for customer; POST new payment method
  const paymentMethods = [
    {
      pmID: 1,
      pmCardNumber: "4111111111111111",
      pmName: "Johnny Silverhand",
      pmExpDate: "12-01-2023", // Expired card created for testing
    },
    {
      pmID: 2,
      pmCardNumber: "5500000000000004",
      pmName: "V",
      pmExpDate: "01-01-2077",
    },
    {
      pmID: 3,
      pmCardNumber: "340000000000009",
      pmName: "Judy Alvarez",
      pmExpDate: "05-01-2079",
    },
  ];

  const [error, setError] = useState(null); // Error handling state
  const [selectedMethod, setSelectedMethod] = useState(null); // This state will track the selected payment method

  // This function will handle the selected method 
  const handleSelectMethod = (id) => {
    setSelectedMethod(id); // Update the selected method
  };

  return (
    <div class="container">
      <h2>Your credit and debit cards</h2>
      {error && <p>Error: {error}</p>} {/* Display error message if exists */}
      {paymentMethods.length === 0 ? (
        <p>No payment methods found.</p> // Message if no payment methods are available
      ) : (
        <table className="table table-hover">
          <thead>
            <tr>
              <th></th>
              <th>Name on Card</th>
              <th>Last 4</th>
              <th>Expires</th>
            </tr>
          </thead>
          <tbody>
            {paymentMethods.map((method) => (
              <CreditCard
                key={method.pmID} // Unique key for each credit card
                cardNumber={method.pmCardNumber} // Card number
                nameOnCard={method.pmName} // Cardholder name
                expDate={method.pmExpDate} // Expiration date
                isSelected={selectedMethod === method.pmID} // Check if this method is selected
                onSelect={() => handleSelectMethod(method.pmID)} // Handle selection change
              />
            ))}
          </tbody>
        </table>
      )}
      <Button
        variant="secondary"
        onClick={() => {
          if (!selectedMethod) {
            alert("Please select a payment method before proceeding.");
          } else {
            // Validate whether the card is expired or not
            const selectedPaymentMethod = paymentMethods.find(
              (method) => method.pmID === selectedMethod
            );
            // Get the current Date by creating a new date object
            const currentDate = new Date();
            // Get the expiration date from the selectedPaymentMethod 
            const expDate = new Date(selectedPaymentMethod.pmExpDate);
            // Logic to check if the card is expired or not
            if (expDate < currentDate) {
              alert(
                "The selected card is expired. Please choose a valid payment method."
              );
            } else {
              alert("Proceeding with payment...");
              // TODO: Process payment
            }
          }
        }}
      >
        Use this payment method
      </Button>
    </div>
  );
}

export default Payment; // Export the Payment component for use in other files
