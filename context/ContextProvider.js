import React, {createContext, useEffect, useContext, useState} from 'react';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { getCookie, setCookies, removeCookies } from 'cookies-next';
import { collection, getDocs, addDoc } from "firebase/firestore";

const stateContext = createContext();
const authProvider = new GoogleAuthProvider();

export const ContextProvider = ({ children }) => {
  const [adminMenu, setAdminMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [productsList, setProductsList] = useState([]);

  const login = () => {
    signInWithPopup(auth, authProvider)
      .then(async (result) => {
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential?.accessToken;
        const myUser = result.user;
        try {
          const querySnapshot = await getDocs(collection(db, "users"));
          let found = false;
          querySnapshot.forEach((doc) => {
            if (doc.data().uid === myUser.uid){
              const dataUserDB = doc.data();
              if (dataUserDB.admin && dataUserDB.admin === true){
                setCookies('AdmUsAccs', myUser.uid, {maxAge: 60 * 60 * 24 * 7});
                console.log("Cookie guardada");
              }
              found = true;
            }
          });
          if (!found){
            const docRef = await addDoc(collection(db, "users"), {
              uid: myUser.uid,
              name: myUser.displayName,
              email: myUser.email
            })
          }
        } catch (error) {
          console.log(error);
        }
        //console.log({ credential, token, myUser })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log({ errorCode, errorMessage, email, credential });
      })
  }

  const logout = async () => {
    const cookie = getCookie("AdmUsAccs");
    if (cookie){
      removeCookies("AdmUsAccs")
    }
    auth.signOut();
    console.log('logout');
  }
  
  useEffect(() => {
    onAuthStateChanged(auth, (userr) => {
      if (userr) {
        //const uid = userr.uid;
        setUser(userr);
        //console.log(userr);
      } else {
        setUser(null);
        //console.log("no user");
      }
    });
  }, []);

  return (
    <stateContext.Provider
      value={{
        adminMenu,
        setAdminMenu,
        login,
        logout,
        user,
        cart, 
        setCart,
        wishlist, 
        setWishlist,
        productsList,
        setProductsList,
      }}
    >
      {children}
    </stateContext.Provider>
  )
}

export const useStateContext = () => useContext(stateContext);
