import React from "react";
import {Outlet} from 'react-router-dom'
import {Flex, Box, Heading}  from '@chakra-ui/react'
import useNowTime from '../hooks/useNowTime'
import Menu from '../components/menu'

export default function Base() {

  const nowTime = useNowTime({format: 'YYYY年MM月DD日 HH时mm分'})

  return (
    <Flex height="100%">
      <Box flex={1} bg='whiteAlpha.100'>
        <Box px={4} py={4}>
          <Heading>欢迎！XXX</Heading>
          <Heading mt={1} size="md">{nowTime}</Heading>
        </Box>
        <Menu />
      </Box>
      <Flex flex={2} px={4} py={4}>
        <Outlet />
      </Flex>
    </Flex >
  );
}