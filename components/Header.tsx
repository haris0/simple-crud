import React, { useState } from 'react';
import {
  Button, Container, Nav, Navbar,
} from 'react-bootstrap';
import styles from './Header.module.scss';
import SigninModal from './SigninModal';
import SignupModal from './SignupModal';

const Header = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false);

  return (
    <>
      <SignupModal
        show={showSignup}
        onHide={() => setShowSignup(false)}
      />
      <SigninModal
        show={showSignin}
        onHide={() => setShowSignin(false)}
      />
      <Navbar bg="light" variant="light" fixed="top" className={styles.navbar}>
        <Container>
          <Navbar.Brand href="/">Simple CRUD</Navbar.Brand>
          <Nav>
            <Button
              variant="primary"
              className={styles.signup}
              onClick={() => setShowSignup(true)}
            >
              Signup
            </Button>
            <Button
              variant="secondary"
              className={styles.signin}
              onClick={() => setShowSignin(true)}
            >
              Signin
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
