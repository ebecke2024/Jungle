// BR
import React from 'react';

function CreditCard({ cardNumber, nameOnCard, expDate, isSelected, onSelect }) {
    // check if the card is expired
    const isExpired = new Date(expDate) < new Date();

  return (
    <tr onClick={onSelect} style={{ cursor: 'pointer' }}> {/* Make the row clickable */}
      <td>
        <input
          type="radio"
          onChange={onSelect}
          checked={isSelected}
          style={{ cursor: 'pointer' }} // Change cursor to pointer for radio button
        />
      </td>
      <td>{nameOnCard}</td> {/* Cell holding the name on the card */}
      <td>{`${cardNumber.slice(-4)}`}</td> {/* Cell with the last four numbers of the card */}
      <td>{`${new Date(expDate).getMonth() + 1}/${new Date(expDate).getFullYear()}`}</td> {/* Cell for card expiration date in MM/YYYY format */}
    </tr>
  );
}

export default CreditCard;
