import { setCookies, getCookie, removeCookies } from 'cookies-next';

export const getUserFromCookie = () => {
  const cookie = getCookie('auth');
  if (!cookie){
    return;
  }
  return JSON.parse(cookie);
}

export const setUserCookie = (user) => {
  setCookies('auth', user, {maxAge: 60 * 60 * 24 * 7});
}

export const removeUserCookie = () => {
  removeCookies('auth');
}