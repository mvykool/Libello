import React from 'react'
import FirebaseApp from '../firebase/firebase'
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

import AddNote from './AddNote';
import ProfilePicAndTheme  from './ProfilePicAndTheme';


import { motion } from 'framer-motion'

/**chakra ui */
import { Button, Box } from '@chakra-ui/react'

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

  const menuShowVariant = {
    initial: { opacity: 0, x: 1000},
    visible: { opacity: 1, x: 0,
    transition: {
      duration: 0.6, ease: 'easeIn'
    }
    }
  }


/** starting firebase auth and firestore */

const auth = getAuth(FirebaseApp);
const firestore = getFirestore(FirebaseApp);


const MenuMobile = ({ userEmail, uid, notes, setNotes}) => {





  
  return (
	<motion.div
  variants={menuShowVariant}
  initial='initial'
  animate='visible'
  >

<Box className='mobile-menu' display={{ lg: 'block'}} mt={{lg:'0', base:'4.7vh'}} border={{base: '1px', lg: 'none'}} bg={{base: 'var(--bg-color)'}} p={{base:2, lg: '0'}} right={{base: 0, lg: '0'}} position={{base: 'absolute', lg: 'relative'}} >

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
        <Button size='sm' mt={{base:'-39vh', lg: '1px'}} bg='var(--icon-color)' color='var(--bg-color)' _hover={{background: 'var(--icon-shadow-color)'}}  ml={{lg: 2}} onClick={()=> signOut(auth)}>Sign Out</Button>
        </motion.div>
        </Box> 
	</motion.div>
  )
}

export default MenuMobile