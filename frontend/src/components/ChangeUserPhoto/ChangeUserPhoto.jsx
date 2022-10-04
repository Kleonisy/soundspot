import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ChangeUserPhoto({ show, setShow }) {
  // const { data: user } = useSelector((state) => state.authState);
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Change photo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <input type="text" /> */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChangeUserPhoto;
