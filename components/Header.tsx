import { useChangeToken, useIsSigned, useSignout } from 'context/LoginContext';
import React, { ChangeEvent, useState } from 'react';
import {
  Button, Container, Nav, Navbar,
} from 'react-bootstrap';
import { registerUser, signinUser } from 'services';
import styles from './Header.module.scss';
import SigninModal from './SigninModal';
import SignupModal from './SignupModal';
import SuccessRegisterModal from './SuccessRegisterModal';

const Header = () => {
  const changeToken = useChangeToken();
  const isSigned = useIsSigned();
  const signout = useSignout();
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showSucceedSignup, setShowSucceedSignup] = useState(false);
  const [isRegisterFailed, setIsRegisterFailed] = useState(false);
  const [isSigninFailed, setIsSigninFailed] = useState(false);
  const [emailSingup, setEmailSignup] = useState('');
  const [passwordSingup, setPasswordSingup] = useState('');
  const [emailSingin, setEmailSignin] = useState('');
  const [passwordSingin, setPasswordSingin] = useState('');
  const handleEmailSingupChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsRegisterFailed(false);
    setEmailSignup(event.target.value);
  };
  const handlePasswordSingupChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordSingup(event.target.value);
  };
  const handleEmailSinginChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsSigninFailed(false);
    setEmailSignin(event.target.value);
  };
  const handlePasswordSinginChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordSingin(event.target.value);
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
  const handleSigninUser = async () => {
    console.log(emailSingin);
    console.log(passwordSingin);

    const { signinSuccess, signinFailed } = await signinUser(emailSingin, passwordSingin);
    console.log(signinSuccess, signinFailed);

    setEmailSignin('');
    setPasswordSingin('');

    if (signinSuccess) {
      changeToken(signinSuccess.token);
      setShowSignin(false);
    } else {
      setIsSigninFailed(true);
    }
  };
  const handleSigninAfterRegistration = () => {
    setShowSucceedSignup(false);
    setShowSignin(true);
  };

  const handleSignout = () => {
    signout();
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
        email={emailSingin}
        onEmailChange={handleEmailSinginChange}
        password={passwordSingin}
        onPasswordChange={handlePasswordSinginChange}
        onSignin={handleSigninUser}
        isFailed={isSigninFailed}
      />
      <Navbar bg="light" variant="light" fixed="top" className={styles.navbar}>
        <Container>
          <Navbar.Brand href="/">Simple CRUD</Navbar.Brand>
          <Nav>
            {isSigned() && (
              <Button
                variant="danger"
                onClick={() => handleSignout()}
              >
                Signout
              </Button>
            )}
            {!isSigned() && (
              <div>
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
              </div>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
