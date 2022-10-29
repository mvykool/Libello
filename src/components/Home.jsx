import React, { useEffect, useState } from 'react'

import FirebaseApp from '../firebase/firebase'
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

import AddNote from './AddNote';
import NotesList from './NotesList';
import ProfilePic from './ProfilePic';


import { chakra, useColorMode } from '@chakra-ui/react';

/** starting firebase auth and firestore */

const auth = getAuth(FirebaseApp);
const firestore = getFirestore(FirebaseApp);



/** starting firebase auth and firestore */

/**chakra ui */
import { Heading, Button, Box } from '@chakra-ui/react'


const Home = ({ userEmail, uid }) => {

  console.log(uid)

/** place holder note*/

const placeholderData = [{
    id: 1,
    content: "Start adding your notes!"
}
]


/** geting or creating the actual data from firestore */

async function getDocOrCreateDoc (docId){
  /**create reference to docu */
const docRef = doc(firestore, `notes/${docId}`);
  /**search for doc */
const searchDoc = await getDoc(docRef);

  /**check if it exist */

if(searchDoc.exists()){
/**if exist*/
const data = searchDoc.data()
return data.notes;
}else {
/**if it doesnt exist*/
await setDoc(docRef, { notes: [...placeholderData] });
const searchDoc = await getDoc(docRef);
const data = searchDoc.data()
return data.notes;
}
}

/** geting or creating the actual data from firestore */

/**usestate of notes */
const [notes, setNotes] = useState(null);


/**useEffect to get the info in the first render */
useEffect(()=> {
async function fetchNotes(){
  
    const fetchedNotes = await getDocOrCreateDoc(userEmail !== null? userEmail : userEmail == null );
    setNotes(fetchedNotes);
}

fetchNotes();
}, [])
/**useEffect to get the info in the first render */

return (
<>
        <chakra.div w={36} position='absolute' h='100vh' border='1px' borderColor='var(--border)' p={5} borderRadius='5px'>
        <Heading as='h1' size='md' color='var(--title-color)'>
            Libello
        </Heading>
        
        <Box >
          <ProfilePic uid={uid}/>
        </Box>
        <AddNote
            notes={notes}
            setNotes={setNotes}
            userEmail={userEmail}
        />
        <Button size='sm' bottom='0' pos='absolute' mb={5} ml={2} onClick={()=> signOut(auth)}>Sign Out</Button>
        </chakra.div>
        {notes ? <NotesList
            notes={notes}
            setNotes={setNotes}
            userEmail={userEmail}/>: <p className='text'>"no tasks"</p>}
      
</>
)
}

export default Home