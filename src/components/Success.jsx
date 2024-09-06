import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';

const SuccessModal = ({handleClose}) => {


  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Success!!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Your Book Added Successfully.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>Ok</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default SuccessModal;