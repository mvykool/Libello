import React from 'react'
import { Box } from '@chakra-ui/react';

const ColorItem = ({color, setColor}) => {
  return (
	 <Box mt={7} ml={20}>
    <div onClick={setColor} className='color-item' style={{"--bg-color": color}}>{color}</div>
   </Box>
  )
}

export default ColorItem;