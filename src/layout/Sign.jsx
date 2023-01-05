import React from "react";
import {Outlet} from 'react-router-dom'
import {Flex, Box}  from '@chakra-ui/react'

export default function Sign() {
  return (
    <Flex height="100%">
      <Flex flex={1} className="bg-blur" justifyContent="center" alignItems="center">
        <Outlet />
      </Flex>
      <Box flex={2} />
    </Flex>
  );
}