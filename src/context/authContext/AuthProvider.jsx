import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, onIdTokenChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

const AuthProvider = ({ children }) => {
    const provider = new GoogleAuthProvider();
    const [loading,setLoading]= useState(true);
    const [user,setUser]= useState(null);


    const createUser = (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }


    const updateUserProfile = profileInfo => {
        setLoading(true);
        return updateProfile(auth.currentUser, profileInfo);
    }

    const signInWithGoogle = () => {

    setLoading(true);

    // ✅ Correct Firebase function
    return signInWithPopup(auth, provider);
  };

  const login=(email,password)=>{
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password);
  }


  const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }


  useEffect(() => {
  const unsubscribe = onIdTokenChanged(
    auth,
    async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    }
  );

  return unsubscribe;
}, []);
        

    const info={
        user,
        loading,
        createUser,
        updateUserProfile,
        signInWithGoogle,
        login,
        logOut
    }
    return (
        <AuthContext value={info}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;