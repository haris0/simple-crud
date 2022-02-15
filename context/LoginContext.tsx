/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export interface LoginContextType{
  token : string;
  changeToken: (newToken: string) => void;
  isSigned : () => boolean;
  signout: () => void;
}

const initialLogin: LoginContextType = {
  token: '',
  changeToken: () => {},
  isSigned: () => false,
  signout: () => {},
};

const LoginContext = createContext<LoginContextType>(initialLogin);

type props = {
  children: ReactNode;
};

const LoginContextProvider = ({ children }: props) => {
  const [token, setToken] = useState(initialLogin.token);

  const isSigned = () => !!token;

  const changeToken = (newToken: string) => {
    setToken(newToken);
  };

  const signout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    setToken(localStorage.getItem('token') as string || '');
  }, []);

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  const contextValue = useMemo<LoginContextType>(() => ({
    token,
    isSigned,
    changeToken,
    signout,
  }), [token]);

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};

export const useToken = () => {
  const { token } = useContext(LoginContext);

  return token;
};

export const useIsSigned = () => {
  const { isSigned } = useContext(LoginContext);

  return isSigned;
};

export const useChangeToken = () => {
  const { changeToken } = useContext(LoginContext);

  return changeToken;
};

export const useSignout = () => {
  const { signout } = useContext(LoginContext);

  return signout;
};

export default LoginContextProvider;
