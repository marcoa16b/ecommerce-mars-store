import React from 'react';
import { BiLoader } from "react-icons/bi";
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
  return (
    <div className='flex flex-col text-3xl items-center justify-center w-full h-screen'>
      {/* <h1 className='animate-spin-slow text-6xl duration-500'><BiLoader /></h1> */}
      <CircularProgress />
      <h2 className='mt-6 text-blue-600 font-bold'>Loading</h2>
    </div>
  );
};

export default Loader;