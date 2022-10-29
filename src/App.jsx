import { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';

/**importing firebase */

import FirebaseApp from './firebase/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";

/** starting firebase Auth */

const auth = getAuth(FirebaseApp);

function App() {

  /** user to login state */

const [userState, setUserState] = useState(null);
const [uid, setUid ] = useState(null);

/** changing auth state */

onAuthStateChanged(auth, (userFirebase) => {
  if (userFirebase) {
    setUserState(userFirebase);
    setUid(userFirebase.photoURL)
  }else {
    setUserState(null);
  }
});


  return (
    <>
    { userState ? <Home userEmail={userState.email} uid={uid} />  : <Login/> }
    </>
  )
}

export default App
