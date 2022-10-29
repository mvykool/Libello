import React, { useState } from 'react'

/**importing firebase */

import  firebaseApp  from '../firebase/firebase'
import { getAuth,
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      signInWithRedirect,
      GoogleAuthProvider,
      signInAnonymously
  } from 'firebase/auth'

import { Button } from '@chakra-ui/react';

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const user = auth.currentUser;


const Login = () => {

  /**check if the user registers */
  const [isRegistered, setIsRegistered] = useState(false)

  /**submit login */

async function submitHandler(e) {
  e.preventDefault();
  
  const email = e.target.email.value;
  const password = e.target.pass.value;
  const photo = user.photoURL;

  if (isRegistered) {
    const userData = await createUserWithEmailAndPassword(auth, email, password, photo);
    console.log(userData.photo);

  }
  else {
    signInWithEmailAndPassword(auth, email, password);
    
  }
}

/**sign in as guess */

async function signInAsGuess () {
  signInAnonymously(auth)
}


  return (
    <div className='form'>
      <h1 className='login-title'>Welcome to Libello!</h1>
      <form onSubmit={submitHandler}>
        <button type='button' className="button-container-google" onClick={() => signInWithRedirect(auth, googleProvider)}>
            Continue with Google
        </button>
        <Button type='button' className="button-container-question" ml={8} bg='gray.400' onClick={signInAsGuess}>Log in as Demo user</Button>
    </form>
    </div>
  )
}

export default Login