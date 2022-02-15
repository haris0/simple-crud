import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import LoginContextProvider from 'context/LoginContext';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <LoginContextProvider>
    <Component {...pageProps} />
  </LoginContextProvider>
);

export default MyApp;
