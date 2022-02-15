import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import LoginContextProvider from 'context/LoginContext';
import Header from 'components/Header';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <LoginContextProvider>
    <Header />
    <Component {...pageProps} />
  </LoginContextProvider>
);

export default MyApp;
