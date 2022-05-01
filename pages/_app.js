import 'normalize.css';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import store from '../utils/store';
import '../styles/index.css';
import { AppProvider } from '../context/appContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
