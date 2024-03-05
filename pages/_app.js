// // pages/_app.js
import StoreProvider from "./StoreProvider";
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  
  return (
    <StoreProvider >
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;