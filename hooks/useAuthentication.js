import React, { useState, useEffect } from 'react';
import firebase from '../firebase/firebase';

function useAuthentication() {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);

    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(user => {
            if( user ) {
                setAuthenticatedUser(user);
            } else {
                setAuthenticatedUser(null);
            }
        });
        return () => unsuscribe();
    }, [])
    return authenticatedUser;
}

export default useAuthentication;