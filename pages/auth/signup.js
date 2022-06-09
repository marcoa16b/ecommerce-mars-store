import React from 'react';
import { SignupForm } from '../../components/SignupForm';
import { getCookie, removeCookies } from 'cookies-next';

const signup = () => {

  const uid = getCookie('uid');
  // removeCookies('uid')
  if (uid) {
    console.log('el usuario esta loggeado')
  }
  return (
    <SignupForm />
  );
};

export default signup;