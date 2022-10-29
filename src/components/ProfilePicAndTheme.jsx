import { Box, Heading, Icon } from "@chakra-ui/react"
import {GiPaintRoller } from 'react-icons/gi'
import React, {useEffect } from "react"
import ColorItem from "./ColorItem"
import cyberPunk from "../themes/cyberPunk"
import vaporWave from '../themes/vaporWave'
import Cream from '../themes/Cream'
import Matrix from '../themes/Matrix'
import Azul from '../themes/Azul'
import {
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure
  } from '@chakra-ui/react'

  /**importing framer motion */
import { motion } from 'framer-motion'

const ProfilePicAndTheme = ({uid}) => {

/**framer motion variants */

const iconsVariants = {
	hidden: { scale: 1 },
	hover: { scale: 1.2 ,x: 3,
		transition: { duration: 0.5}
	}
}




	/**array with the color options */

	const colors = ["Cyber-Punk", "vaporwave", "cream", "Matrix", "Azul"];

	/**set useEffect with loca storage */
	useEffect(()=>{
    const currentColor = localStorage.getItem("color")
	setTheme(currentColor);
    if (currentColor == "Cyber-Punk") {
		cyberPunk();
	}else if (currentColor == "vaporwave"){
		vaporWave();
	}else if (currentColor == "cream"){
		Cream();
	}else if (currentColor == "Matrix"){
		Matrix();
	}else if (currentColor == "Azul"){
		Azul();
	}
	
	},[])

	const setTheme = (color) => {
		document.documentElement.style.setProperty("--bg-color", color)
	}
	/**set color */

	const setColor = (e) => {
		const currentColor = e.target.style.getPropertyValue("--bg-color");
          
		setTheme(currentColor);
	    if (currentColor == "Cyber-Punk") {
		    cyberPunk();
		}else if (currentColor == "vaporwave"){
			vaporWave();
		}else if (currentColor == "cream"){
			Cream();
		}else if (currentColor == "Matrix"){
			Matrix();
		}
		else if (currentColor == "Azul"){
			Azul();
		}
		

		localStorage.setItem("color", currentColor);
	}

	const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()


  return (
	<>
	<img className='profile-img' referrerPolicy='no-referrer' src={uid? uid : "https://www.pngitem.com/pimgs/m/111-1114675_user-login-person-man-enter-person-login-icon.png"} alt="" />
	<hr />
	<Box mt={10} ml={4} >
	<motion.div
		variants={iconsVariants}
		initial='hidden'
		whileHover='hover'
	>
	<Icon as={GiPaintRoller}  onClick={onOpen} w={12} h={12} _hover={{color: 'var(--icon-shadow-color)'}} mt={1} ml={1} cursor='pointer' color='var(--icon-color)'  />
	</motion.div>
	<Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg='var(--bg-color)' border='1px' borderColor='var(--title-color)'>
			<Heading as='h1' mt={7} ml={24} mb='30px' fontFamily='var(--font-family)' color='var(--title-color)' textShadow='var(--title-shadow)'>Themes</Heading>
          <DrawerCloseButton />
		  {colors.map((color, idx) => <ColorItem key={idx} setColor={setColor} color={color}  isOpen={isOpen} />)}
        <Box color='var(--title-color)' mt={36} fontSize='12px' ml={20} letterSpacing={2} >Created By Maicol H</Box>
        </DrawerContent>
		
      </Drawer>
	</Box>
    </>
  )
}

export default ProfilePicAndTheme

