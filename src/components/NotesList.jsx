import React from 'react'

import firebaseApp from '../firebase/firebase'
import { getFirestore, updateDoc, doc } from 'firebase/firestore'

/**chakra ui */

import { Box, Button, Heading } from '@chakra-ui/react'

/**setting firestore */

const firestore = getFirestore(firebaseApp);

const NotesList = ({notes, userEmail, setNotes}) => {

  /**handle delete task button  */

async function handleDeleteNote(noteId) {
  /**create new array of tasks */
  const newNotes = notes.filter(
    (notes) => notes.id !== noteId
  );
  /**update database in firestore */
  const docRef = doc(firestore, `notes/${userEmail}`);
  updateDoc(docRef, {notes: [...newNotes] });
  /**update state */
  setNotes(newNotes);
}

  /**handle delete task button  */

  return (
<Box ml={52} mt={9} position='absolute'>
  <Heading mb={16} color='var(--title-color)'>Notes</Heading>
  <Box display='flex' flexWrap='wrap'>
    {notes.map((note)=> {
      return(
        <Box bg='var(--note-color)' color='var(--note-text-color)' border='1px' borderColor='var(--border-color)' p={5} borderRadius='md' m={5} key={note.id} w='220px' h='220px' role='group'>
        <Button borderRadius='100%' display='none' bg='red.500' _groupHover={{ display: 'block'  }}  _hover={{background: 'red.800'}} size='sm' color='white' mt='-30px' ml={44} position='absolute'
        onClick={()=> handleDeleteNote(note.id)}
        >x</Button>
          <p color='var(--note-text-color)'>{note.content}</p>
          <Box display='none' color='var(--note-text-color)' position='absolute' mt={32} _groupHover={{ display: 'block'  }}>
            <p >{note.date}</p>
          </Box>
        </Box>
      )
    })}
    </Box>
  </Box>

  )
}

export default NotesList