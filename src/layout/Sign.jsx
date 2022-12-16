import React from "react";
import {Outlet} from 'react-router-dom'
import {Flex, Box, Heading, Image}  from '@chakra-ui/react'

export default function Sign() {

  const [bgColor, setBgColor] = React.useState('')

  const colorList = [
    'whiteAlpha.500',
    'gray.500',
    'red.500',
    'orange.500',
    'yellow.500',
    'green.500',
    'teal.500',
    'blue.500',
    'cyan.500',
  ]

  React.useEffect(() => {
    const timer = setInterval(() => {
      const index = Math.floor(Math.random() * colorList.length)
      setBgColor(colorList[index])
    }, 50)
    return () => {
      clearInterval(timer)
    }
  }, [])


  return (
    <Flex height="100%">
      <Box flex={1} bg='whiteAlpha.100'>
        <Outlet />
      </Box>
      <Flex bg={bgColor} flex={2} justifyContent="center" alignItems="center">
        <Image w={300} src="./static/images/bg-icon.png" />
      </Flex>
    </Flex >
  );
}