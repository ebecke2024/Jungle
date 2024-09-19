// AddPayment.js
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function AddPaymentMethod({ show, handleClose, onAdd }) {
  const [newCard, setNewCard] = useState({ cardNumber: "", nameOnCard: "", expDate: "" });

  const handleAddCard = () => {
    onAdd(newCard); // Pass the new card data back to the parent
    setNewCard({ cardNumber: "", nameOnCard: "", expDate: "" }); // Reset form
    handleClose(); // Close the modal
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Payment Method</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              className="form-control"
              value={newCard.cardNumber}
              onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Name on Card</label>
            <input
              type="text"
              className="form-control"
              value={newCard.nameOnCard}
              onChange={(e) => setNewCard({ ...newCard, nameOnCard: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Expiration Date (MM/YYYY)</label>
            <input
              type="text"
              className="form-control"
              value={newCard.expDate}
              onChange={(e) => setNewCard({ ...newCard, expDate: e.target.value })}
              required
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddCard}>
          Add Card
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddPaymentMethod;
