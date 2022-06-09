import React from 'react';
import { useStateContext } from '../../context/ContextProvider';

const UserPopper = () => {
  const { user, login, logout } = useStateContext();

  return (
    (user)
    ? 
    <div className='p-4 text-center text-xl'>
      <p>{user.displayName}</p>
      <button 
        onClick={logout}
        className='my-4 w-32 h-14 bg-Purple text-White font-bold shadow-lg rounded-xl duration-300 hover:tracking-widest hover:shadow-lg'
      >
        Log out
      </button>
    </div>
    :
    <div className='p-4 text-center text-xl'>
      <p className='my-4'>Login to see more information</p>
      <button 
        onClick={login}
        className='my-4 w-32 h-14 bg-Purple text-White font-bold shadow-lg rounded-xl duration-300 hover:tracking-widest hover:shadow-lg'
      >
        Log in
      </button>
    </div>
  );
};

export default UserPopper;