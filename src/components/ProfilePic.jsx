import { Box, chakra } from "@chakra-ui/react"
import React, {useEffect } from "react"
import ColorItem from "./ColorItem"
import cyberPunk from "../themes/cyberPunk"
import {
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure
  } from '@chakra-ui/react'

const ProfilePic = ({uid}) => {



	/**array with the color options */

	const colors = ["cyberPunk", "vaporwave", "cream"];

	/**set useEffect with loca storage */
	useEffect(()=>{
    const currentColor = localStorage.getItem("color")
	setTheme(currentColor);
    if (currentColor == "cyberPunk") {
		cyberPunk();
	}else if (currentColor == "vaporwave"){
		document.documentElement.style.setProperty("--text-color", "pink")
		document.documentElement.style.setProperty("--bg-color", "purple")
	}else if (currentColor == "cream"){
		document.documentElement.style.setProperty("--text-color", "#7D6E83")
		document.documentElement.style.setProperty("--bg-color", "#F8EDE3")
	}
	},[])

	const setTheme = (color) => {
		document.documentElement.style.setProperty("--bg-color", color)
	}
	/**set color */

	const setColor = (e) => {
		const currentColor = e.target.style.getPropertyValue("--bg-color");
          
		setTheme(currentColor);
	    if (currentColor == "cyberPunk") {
		    cyberPunk();
		}else if (currentColor == "vaporwave"){
			document.documentElement.style.setProperty("--text-color", "pink")
			document.documentElement.style.setProperty("--bg-color", "purple")
		}else if (currentColor == "cream"){
			document.documentElement.style.setProperty("--text-color", "#7D6E83")
			document.documentElement.style.setProperty("--bg-color", "#F8EDE3")
		}
		

		localStorage.setItem("color", currentColor);
	}

	const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()


  return (
	<>
	<img className='profile-img' referrerPolicy='no-referrer' src={uid? uid : "https://www.pngitem.com/pimgs/m/111-1114675_user-login-person-man-enter-person-login-icon.png"} alt="" />
	<hr />
	<Box mt={10} ml={5} >
	<chakra.img cursor='pointer' color='gray.400' w={9} ml={2} src="../public/theme-icon.png" alt="" ref={btnRef} colorScheme='teal' onClick={onOpen} />
	<Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
		  {colors.map((color, idx) => <ColorItem key={idx} setColor={setColor} color={color}  isOpen={isOpen} />)}

        </DrawerContent>
      </Drawer>
	</Box>
    </>
  )
}

export default ProfilePic

