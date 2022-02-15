/* eslint-disable no-unused-vars */
import { ChangeEvent } from 'react';
import {
  Button,
  Col,
  Form,
  Modal,
} from 'react-bootstrap';

type props = {
  show: boolean;
  onHide: () => void
  email: string;
  password: string;
  onEmailChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRegister: () => void;
  isFailed: boolean;
}

const SignupModal = ({
  show,
  onHide,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onRegister,
  isFailed,
}: props) => (
  <Modal
    show={show}
    onHide={onHide}
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Signup
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col>
            <Form.Control
              type="email"
              value={email}
              onChange={onEmailChange}
              placeholder="name@example.com"
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col>
            <Form.Control
              type="password"
              value={password}
              onChange={onPasswordChange}
              placeholder="Password"
            />
          </Col>
          {isFailed && (
            <div style={{ color: 'red' }}>
              Signup failed, please try again
            </div>
          )}
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button
        onClick={() => onRegister()}
      >
        Signup
      </Button>
    </Modal.Footer>
  </Modal>
);

export default SignupModal;
