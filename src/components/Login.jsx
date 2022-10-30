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

import { Button, chakra, Icon } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc'

/**firebase imports */

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
    <>
    <chakra.div className='bg' fontFamily='Comfortaa, cursive'>
    <chakra.div w={{lg: '45%', base: "350px"}} className='form' mt={40} zIndex='50'>
      <chakra.h1 m={10} color='Black' fontWeight='bold' fontSize={{lg: 32, base: 22}} className='login-title'>Welcome to Libello!</chakra.h1>
      <form onSubmit={submitHandler}>
        <chakra.button type='button' bg='gray.400' className="button-container-google" onClick={() => signInWithRedirect(auth, googleProvider)}>
            Continue with Google
            <Icon as={FcGoogle} w={7} h={7} ml={2} mt='-4px'></Icon>
        </chakra.button>
        <Button display='flex' type='button' className="button-container-question" bg='blue.500' _hover={{background: "blue.800"}} onClick={signInAsGuess}>Log in as Demo user</Button>
    </form>
    </chakra.div>
    </chakra.div>
    </>
  )
}

export default Login