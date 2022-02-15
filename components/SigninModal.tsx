import {
  Button,
  Col,
  Form,
  Modal,
} from 'react-bootstrap';

type props = {
  show: boolean;
  onHide: () => void
}

const SigninModal = ({ show, onHide }: props) => (
  <Modal
    show={show}
    onHide={onHide}
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Signin
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col>
            <Form.Control type="email" placeholder="name@example.com" />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col>
            <Form.Control type="password" placeholder="Password" />
          </Col>
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button>Signup</Button>
    </Modal.Footer>
  </Modal>
);

export default SigninModal;
