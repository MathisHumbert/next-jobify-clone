import 'normalize.css';
import '../styles/index.css';
import { AppProvider } from '../context/appContext';

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
