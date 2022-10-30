import React from 'react'
import { Icon } from '@chakra-ui/react'
import { MdAddCircle } from 'react-icons/md'

/**chakra ui */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Circle,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'

/**importing framer motion */

import { motion } from 'framer-motion';

/**importing uuid */
import { v4 as uuidv4 } from 'uuid';

/**fireabase, firestore, storage */
import FirebaseApp from '../firebase/firebase';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';

/**initiallizing firestore and storage */
const firestore = getFirestore(FirebaseApp);


const AddNote = ({notes, setNotes, userEmail}) => {

  /**framer motion icon variant */

  const iconsVariants = {
    hidden: { scale: 1, rotate: 0 },
    hover: { scale: 1.2,
      rotate: 50, x: 8, y: 10,
      transition: { duration: 0.5}
    }
  }

   /**open modal with chakra ui */
   const { isOpen, onOpen, onClose } = useDisclosure();

  /**url ref for upload pic */

  var d = new Date();

  var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
  d.getHours() + ":" + d.getMinutes();

console.log(userEmail)

  /**handle form */

async function handleForm(e){
    e.preventDefault();
    const content = e.target.formId.value

    /**create new array */
    const newNotes = [...notes, {id: uuidv4(), content: content, date: datestring } ];
    /**update database */
    const docRef = doc(firestore, `notes/${userEmail}`);
    updateDoc(docRef, { notes: [...newNotes]});
    /**update state */
    setNotes(newNotes);
}



return (
  <>
	
    <motion.div
    variants={iconsVariants}
		initial='hidden'
		whileHover='hover'

    >
    <Icon as={MdAddCircle} onClick={onOpen} w={12} h={12} _hover={{color: 'var(--icon-shadow-color)'}} mt={7} ml={5} cursor='pointer' color='var(--icon-color)' />
    </motion.div>
  
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent bg='var(--bg-color)' border='1px' borderColor='var(--title-color)'>
          <ModalHeader>New Note:</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleForm}>
          <ModalBody>
          
          <FormLabel htmlFor='formId'>Note:</FormLabel>
          <Input type='text'mt={5} placeholder='Reminder' borderColor='var(--title-color)' id='formId'autoComplete="off" />
          </ModalBody>

          <ModalFooter mt={10}>
            <Button bg='var(--icon-color)' color='var(--bg-color)' _hover={{background: 'var(--icon-shadow-color)'}}  mr={3}  onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' type='submit' color='var(--title-color)' onClick={onClose}>Add Notes</Button>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
)
}

export default AddNote