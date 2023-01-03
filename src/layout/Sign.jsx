import React from "react";
import {Outlet} from 'react-router-dom'
import {Flex, Box, Heading, Image}  from '@chakra-ui/react'

export default function Sign() {

  const [bgColor, setBgColor] = React.useState('')

  const [style, setStyle] = React.useState({})

  const [width, setWidth] = React.useState(300)

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
    const timer1 = setInterval(() => {
      const index = Math.floor(Math.random() * colorList.length)
      setBgColor(colorList[index])
    }, 70)
    
    const timer2 = setInterval(() => {
      setStyle({transform: `translate3d(${Math.random() * 100}%, ${Math.random() * 100}%, 0)`})
    }, 50)

    const timer3 = setInterval(() => {
      setWidth(Math.random() * 600)
    }, 300)

    return () => {
      clearInterval(timer1)
      clearInterval(timer2)
      clearInterval(timer3)
    }
  }, [])

  return (
    <Flex height="100%">
      <Flex flex={1} className="bg-blur" justifyContent="center" alignItems="center">
        <Outlet />
      </Flex>
      <Box flex={2} />
      {/* <Flex className="overflow-hidden" style={{transform: 'translate3d(0, 0, 0)'}} bg={bgColor} flex={2} justifyContent="center" alignItems="center">
        <Image style={style} w={width} 
          src="./static/images/bg-icon.png" />
      </Flex> */}
    </Flex>
  );
}