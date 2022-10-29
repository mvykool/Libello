import React from 'react'
import firebaseApp from '../firebase/firebase'
import { getFirestore, updateDoc, doc } from 'firebase/firestore'

/**chakra ui */

import { Box, Heading, Icon, chakra } from '@chakra-ui/react'
import { BiX } from 'react-icons/bi'

import { motion } from 'framer-motion'

/**setting firestore */

const firestore = getFirestore(firebaseApp);

const NotesList = ({notes, userEmail, setNotes}) => {

  /**framer motion variatn */
  const noteVariant = {
    hidden: {scale: 1, opacity: 0},
    show: {opacity: 1,
      transition: {
        delay: 0.5,
        x: { duration: 1 },
        default: { ease: "linear" }
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.5
      }
    }
  }

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
  <Heading mb={16} color='var(--title-color)' textShadow='var(--title-shadow)' letterSpacing={2} fontFamily='var(--font-family)'> My Notes</Heading>
  
  <Box display='flex' flexWrap='wrap'>
    {notes.map((note)=> {
      return(
      <motion.div
      variants={noteVariant}
      initial='hidden'
      whileHover='hover'
      drag
      dragConstraints={{
        top: -270,
        left: -300,
        right: 300,
        bottom: 270,
      }}
     animate='show'
      key={note.id}
      >
        <Box bg='var(--note-color)' shadow='var(--note-shadow)' cursor='pointer' color='var(--note-text-color)' border='1px' borderColor='var(--border-color)' p={5} borderRadius='var(--border-radius)' m={5}  w='220px' h='220px' role='group'>
        <Icon as={BiX} display='none' opacity={0.3} _groupHover={{ display: 'block'  }} w={10} h={10} color='var(--icon-color)' mt='-23px' ml={40} cursor='pointer' position='absolute'
        onClick={()=> handleDeleteNote(note.id)}
        ></Icon>
          <chakra.p color='var(--note-text-color)' fontSize='19px' letterSpacing={1} >{note.content}</chakra.p>
          <Box display='none' color='var(--note-date-color)' mt={20} _groupHover={{ display: 'block'  }}>
            <chakra.small fontSize='11px'>{note.date}</chakra.small>
          </Box>
        </Box>
      </motion.div>
      )
    })}
    </Box>

  </Box>

  )
}

export default NotesList