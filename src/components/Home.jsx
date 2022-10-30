import React, { useEffect, useState } from 'react'

import FirebaseApp from '../firebase/firebase'
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

import AddNote from './AddNote';
import NotesList from './NotesList';
import ProfilePicAndTheme  from './ProfilePicAndTheme';


import { motion } from 'framer-motion'
import { SlNotebook } from 'react-icons/sl'
import {GiHamburgerMenu} from 'react-icons/gi'


import { chakra, Spinner} from '@chakra-ui/react';
/**chakra ui */
import { Heading, Button, Box, Icon } from '@chakra-ui/react'
import MenuMobile from './MenuMobile';
import { useOutsideClick } from '@chakra-ui/react'

/** starting firebase auth and firestore */

const auth = getAuth(FirebaseApp);
const firestore = getFirestore(FirebaseApp);



/**button motion */

const buttonVariant = {
  hidden: {scale: 1},
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.5
    }
  }
}

const variantPage = {
  hidden: {x: 1000},
  visible: { x: 0,
  transition: {
  duration: 0.5
  }
  }
}


const Home = ({ userEmail, uid }) => {

/**state for mobile menu */

const [showMenu, setShowMenu] = useState(false);

let menu;

if(showMenu){
  menu = <div >

  </div>
}


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
<motion.div
variants={variantPage}
initial='hidden'
animate='visible'
>

        <chakra.div className='mobile-nav-bar'
        w={{lg: 36, base: '100vw'}} position={{lg: 'absolute'}} h={{lg:'100vh', base: '11vh'}} border='1px' borderColor='var(--border)' p={5} borderRadius='5px'>
        <Heading as='h1' mt={{base:2, lg: '0'}} ml={3} size={{lg: 'sm', base: 'md'}} color='var(--title-color)' letterSpacing={1} textShadow='var(--title-shadow)' fontFamily='var(--font-family)'display='flex' >
            Libello
            <Icon as={SlNotebook} mt={{lg:'0', base: 1}} h={4} w={4} ml={2} color='var(--title-color)' ></Icon>


          <Icon as={GiHamburgerMenu} h={9} mt={{base:'-7px'}} w={9} display={{lg:'none', base: 'block'}} right={{base:8}} position={{base: 'absolute'}} 
          onClick={()=> setShowMenu(!showMenu)}
          ></Icon>
        </Heading>
        { menu ? 
      
        <MenuMobile
              setShowMenu={setShowMenu}
              uid={uid}
              notes={notes}
              setNotes={setNotes}
              userEmail={userEmail}/>
              : false}

  
  <Box  display={{ lg: 'block', base: 'none'}} >
          
          <Box >
            <ProfilePicAndTheme uid={uid}/>
          </Box>
        <Box mb={60}>
        <AddNote
              notes={notes}
              setNotes={setNotes}
              userEmail={userEmail}
          />
        </Box>
      
        <motion.div
        variants={buttonVariant}
        initial='hidden'
        whileHover='hover'
        >
        <Button size='sm' mt={{base:'-40vh', lg: '1px'}} bg='var(--icon-color)' color='var(--bg-color)' _hover={{background: 'var(--icon-shadow-color)'}}  ml={2} onClick={()=> signOut(auth)}>Sign Out</Button>
        </motion.div>
        </Box> 
    


        </chakra.div>
        
        {notes ? <NotesList
            notes={notes}
            setNotes={setNotes}
            userEmail={userEmail}/>: <Spinner
            thickness='5px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            ml={{lg: '50%',base: '45%'}}
            mt={60}
          />}
          </motion.div>
</>
)
}

export default Home