import 'normalize.css';
import { SessionProvider } from 'next-auth/react';
import '../styles/index.css';
import { AppProvider } from '../context/appContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </SessionProvider>
  );
}

export default MyApp;
