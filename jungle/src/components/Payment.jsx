import React, { useState } from 'react';
import CreditCard from './CreditCard'; // Adjust the import path as needed

function Payment({ customerId }) {
  // Hard-coded payment methods for testing layout
  // TODO: NEED to remove hard coded methods and consume API to populate paymentMethods 
  // TODO: GET payment methods for customer; POST new payment method 
  const paymentMethods = [
    {
      pmID: 1,
      pmCardNumber: '4111111111111111',
      pmName: 'Johnny Silverhand',
      pmExpDate: '12-01-2023',
    },
    {
      pmID: 2,
      pmCardNumber: '5500000000000004',
      pmName: 'V',
      pmExpDate: '01-01-2077',
    },
    {
      pmID: 3,
      pmCardNumber: '340000000000009',
      pmName: 'Judy Alvarez',
      pmExpDate: '05-01-2079',
    },
  ];

  const [error, setError] = useState(null); // Error handling state
  const [selectedMethod, setSelectedMethod] = useState(null); // Selected payment method state

  const handleSelectMethod = (id) => {
    setSelectedMethod(id); // Update the selected method
  };

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px', margin: '10px 0' }}>
      <h2>Saved Payment Methods</h2>
      {error && <p>Error: {error}</p>} {/* Display error message if exists */}
      {paymentMethods.length === 0 ? (
        <p>No payment methods found.</p> // Message if no payment methods are available
      ) : (
        <table>
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
      <button
        type="button"
        onClick={() => console.log('Proceeding with payment...')}
      >
        Proceed to Payment
      </button>
    </div>
  );
}

export default Payment; // Export the Payment component for use in other files
