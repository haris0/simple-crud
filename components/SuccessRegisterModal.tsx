import React from 'react';
import { Button, Modal } from 'react-bootstrap';

type props = {
  show: boolean,
  onHide: () => void
  onSignin: () => void
}

const SuccessRegisterModal = ({ show, onHide, onSignin }: props) => (
  <Modal
    show={show}
    onHide={onHide}
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title>Register Success</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <p>Your registration has been successfully, please signin</p>
    </Modal.Body>

    <Modal.Footer>
      <Button
        variant="primary"
        onClick={() => onSignin()}
      >
        Signin
      </Button>
    </Modal.Footer>
  </Modal>
);

export default SuccessRegisterModal;
