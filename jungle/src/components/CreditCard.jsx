// BR
import React from 'react';

function CreditCard({ cardNumber, nameOnCard, expDate, isSelected, onSelect }) {
    // check if the card is expired
    const isExpired = new Date(expDate) < new Date();

  return (
    <tr> {/* Returns a table row for each card belonging to the customer */}
      <td>
        <input
          type="radio"
          onChange={onSelect}
          checked={isSelected}
        />
      </td>
      <td>{nameOnCard}</td> {/* Cell holding the name on the card */}
      <td>{`${cardNumber.slice(-4)}`}</td> {/* Cell with the last four numbers of the card */}
      <td>
        {isExpired && <span style={{ color: 'red' }}>Expired</span>} {/* Display "Expired" if the card is expired */}
        <div>{`${new Date(expDate).getMonth() + 1}/${new Date(expDate).getFullYear()}`}</div> {/* Cell for card expiration date in MM/YYYY format */}
      </td>

    </tr>
  );
}

export default CreditCard;
