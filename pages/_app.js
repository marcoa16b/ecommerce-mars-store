import '../styles/globals.css'
import { ContextProvider } from '../context/ContextProvider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Component {...pageProps} />
      </LocalizationProvider>
    </ContextProvider>
  )
}

export default MyApp
