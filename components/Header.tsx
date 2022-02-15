import React, { ChangeEvent, useState } from 'react';
import {
  Button, Container, Nav, Navbar,
} from 'react-bootstrap';
import { registerUser } from 'services';
import styles from './Header.module.scss';
import SigninModal from './SigninModal';
import SignupModal from './SignupModal';
import SuccessRegisterModal from './SuccessRegisterModal';

const Header = () => {
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showSucceedSignup, setShowSucceedSignup] = useState(false);
  const [isRegisterFailed, setIsRegisterFailed] = useState(false);
  const [emailSingup, setEmailSignup] = useState('');
  const handleEmailSingupChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsRegisterFailed(false);
    setEmailSignup(event.target.value);
  };
  const [passwordSingup, setPasswordSingup] = useState('');
  const handlePasswordSingupChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordSingup(event.target.value);
  };
  const handleRegisterUser = async () => {
    console.log(emailSingup);
    console.log(passwordSingup);

    const { registerSuccess, registerFailed } = await registerUser(emailSingup, passwordSingup);
    console.log(registerSuccess, registerFailed);

    setEmailSignup('');
    setPasswordSingup('');

    if (registerSuccess) {
      setShowSignup(false);
      setShowSucceedSignup(true);
    } else {
      setIsRegisterFailed(true);
    }
  };

  const handleSigninAfterRegistration = () => {
    setShowSucceedSignup(false);
    setShowSignin(true);
  };

  return (
    <>
      <SignupModal
        show={showSignup}
        onHide={() => setShowSignup(false)}
        email={emailSingup}
        onEmailChange={handleEmailSingupChange}
        password={passwordSingup}
        onPasswordChange={handlePasswordSingupChange}
        onRegister={handleRegisterUser}
        isFailed={isRegisterFailed}
      />
      <SuccessRegisterModal
        show={showSucceedSignup}
        onHide={() => setShowSucceedSignup(false)}
        onSignin={() => handleSigninAfterRegistration()}
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
