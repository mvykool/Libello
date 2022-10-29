import React from 'react'

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

/**importing uuid */
import { v4 as uuidv4 } from 'uuid';

/**fireabase, firestore, storage */
import FirebaseApp from '../firebase/firebase';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';

/**initiallizing firestore and storage */
const firestore = getFirestore(FirebaseApp);


const AddNote = ({notes, setNotes, userEmail}) => {

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
	<Circle bg='gray.100' size={14} cursor='pointer' ml={4} mt={16} color='black' display='flex' justifyContent='center' alignItems="center" fontSize={35} onClick={onOpen}>+</Circle>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Note:</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleForm}>
          <ModalBody>
          
          <FormLabel htmlFor='formId'>Note:</FormLabel>
          <Input type='text' placeholder='Reminder' id='formId'autoComplete="off" />
          </ModalBody>

          <ModalFooter mt={10}>
            <Button colorScheme='blue' mr={3}  onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' type='submit' onClick={onClose}>Add Task</Button>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
)
}

export default AddNote