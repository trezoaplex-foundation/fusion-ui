import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Wallet } from '../components/Wallet';
import AppBar from '../components/AppBar';
import { ToastContainer } from "react-toastify";
import { TrezoaplexProvider } from '../components/TrezoaplexProvider';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Wallet>
    <TrezoaplexProvider>
      <AppBar />
      <Component {...pageProps} />
      <ToastContainer position="bottom-right" />
    </TrezoaplexProvider>
  </Wallet>
}

export default MyApp
