import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import firebase from "firebase/app";
import 'firebase/auth';

import initFirebase from "../firebase";
import {
  removeUserCookie,
  setUserCookie,
  getUserFromCookie
} from "./userCokie";
import { getIdToken } from "firebase/auth";

initFirebase();

export const mapUserData = async user => {
  const { uid, email } = user;
  const token = await getIdToken(true);
  return {
    id: uid,
    email,
    token
  };
};

const useUser = () => {
  const [user, setUser] = useState();
  const router = useRouter();

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        router.push('/');
      });
  }

  useEffect(() => {
    const cancelAuthListener = firebase
      .auth()
      .onIdTokenChanged(async userToken => {
        if (userToken) {
          const userData = await mapUserData(userToken);
          setUserCookie(userData);
          setUser(userData);
        } else {
          removeUserCookie();
          setUser();
        }
      });
      const userFromCookie = getUserFromCookie();
      if (!userFromCookie) {
        return;
      }
      setUser(userFromCookie);
      return () => cancelAuthListener;
  }, []);

  return { user, logout };
}

export { useUser };
