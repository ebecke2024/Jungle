// Author: BR
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// React component that will be a Modal, which will appear on top of the parent component
// show is a boolean that is set by the parent. It indicates whether the modal should be displayed
// handleClode - this is a function that will close the modal
// onAdd - will use the handleAddPaymentMethod, and return a new credit card
function AddPaymentMethod({ show, handleClose, onAdd }) {
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    nameOnCard: "",
    expDate: "",
  });

  const handleAddCard = () => {
    onAdd(newCard); // this will pass the newly created card to the parent
    setNewCard({ cardNumber: "", nameOnCard: "", expDate: "" }); //This will reset the form when the modal is closed
    handleClose(); // this will close the modal when finished
  };

  const currentYear = new Date().getFullYear(); // Used for the expiration date

  return (
    <Modal show={show} onHide={handleClose}>
      {/* will be shown if show = true */}
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
              // e is the 'e'vent that triggered the onChange event. In this case, it is user typing numbers into the field
              onChange={(
                e // When the field is modified, this will change the state and set the value inside the fied to newCard.cardNumber
              ) => setNewCard({ ...newCard, cardNumber: e.target.value })}
              required // FIXME: attribute that makes the field required
            />
          </div>
          <div className="form-group">
            <label>Name on Card</label>
            <input
              type="text"
              className="form-control"
              value={newCard.nameOnCard} // form-group is a bootstrap feature that creates a structured layout
              onChange={(e) =>
                // This will update expDate in the context whenever the month changes
                // It will also set the day to '01'
                setNewCard({ ...newCard, nameOnCard: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Expiration Date</label>
            <div className="d-flex">
              {/* Expiration Month Dropdown */}
              <div className="mr-2">
                <label htmlFor="month">Month</label>
                <select
                  id="month"
                  className="form-control"
                  value={newCard.expMonth}
                  onChange={(e) => {
                    const month = e.target.value;
                    setNewCard((prev) => ({
                      ...prev,
                      expMonth: month,
                      expDate: `${month}-01-${prev.expYear}`, // Update expDate whenever month changes
                    }));
                  }}
                  required
                >
                    {/* Select Month is a place holder for the select month option */}
                  <option value="">Select Month</option>
                  {/* Creates an array of numbers 01 - 12 to represent the 12 months of the year */}
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                      {String(i + 1).padStart(2, "0")} {/* Displays the number with a leading zero */}
                    </option>
                  ))}
                </select>
              </div>

              {/* Expiration Year Dropdown */}
              <div className="mr-2">
                <label htmlFor="year">Year</label>
                <select
                  id="year"
                  className="form-control"
                  value={newCard.expYear}
                  onChange={(e) => {
                    const year = e.target.value;
                    setNewCard((prev) => ({
                      ...prev,
                      expYear: year,
                      expDate: `${prev.expMonth}-01-${year}`, // Update expDate whenever year changes
                    }));
                  }}
                  required
                >
                  <option value="">Select Year</option>
                  {Array.from({ length: 20 }, (_, i) => (
                    <option key={i + currentYear} value={i + currentYear}>
                      {i + currentYear}
                    </option>
                  ))}
                </select>
              </div>
            </div>
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
