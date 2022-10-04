import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'filepond/dist/filepond.min.css';
import UploadMusic from '../UploadMusic/UploadMusic';

function AddMusicModal({ show, setShow }) {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add music</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Song title</Form.Label>
            <Form.Control
              type="email"
              placeholder="title..."
              autoFocus
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <UploadMusic />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={() => setShow(false)}>
          Close
        </Button>
        <Button variant="danger">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddMusicModal;
