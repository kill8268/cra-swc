import React from 'react'
import {MoveBoxs, MoveBox } from '../components/MoveBoxs'
import {Flex, Card, CardBody, Text}  from '@chakra-ui/react'

export default function Home() {

  return (
    <Flex flex={1}>
      <MoveBoxs className="flex-1">
        {({id}) => (
           <Card width={400}>
           <CardBody>
             id:{id}
           </CardBody>
         </Card>
        )}
      </MoveBoxs>
    </Flex>
  )
}