import React from 'react';
import { SignupForm } from '../../components/SignupForm';
import { getCookie, removeCookies } from 'cookies-next';

import { useStateContext } from '../../context/ContextProvider';

const Signin = () => {

  const { login, logout } = useStateContext();

  const uid = getCookie('uid');
  // removeCookies('uid')
  if (uid) {
    console.log('el usuario esta loggeado')
  }
  return (
    // <SignupForm />
    <div>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Signin;