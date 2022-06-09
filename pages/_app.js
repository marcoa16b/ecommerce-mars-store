import '../styles/globals.css'
import { ContextProvider } from '../context/ContextProvider';

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )
}

export default MyApp
