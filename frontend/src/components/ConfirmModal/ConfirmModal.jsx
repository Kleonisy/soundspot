import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ConfirmModal.css';

function ConfirmModal({ show, setShow, deleteMusicFetch }) {
  return (
    <Modal show={show} onHide={() => setShow(false)} centered aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title className="delete-modal-title">Delete music acception</Modal.Title>
      </Modal.Header>
      <Modal.Body className="delete-modal-body">Are sure?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
        <Button variant="danger" style={{ backgroundColor: '#BE1111' }} onClick={() => deleteMusicFetch()}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
