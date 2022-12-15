import React from 'react'
import {MoveBoxs, MoveBox } from '../components/MoveBoxs'
import {Flex, Card, CardBody, Text}  from '@chakra-ui/react'

export default function Home() {

  const [list, setList] = React.useState([])

  const handleAddElement = (e) => {
    setList([...list.filter(({id}) => id !== e.id), e])
  }

  return (
    <Flex flex={1}>
      <MoveBoxs className="flex-1" onAddElement={handleAddElement}>
        {
          list.map((item) => (
            <MoveBox key={item.id} initXY={{
              x: item.x,
              y: item.y
            }}>
              <Card width={400}>
                <CardBody>
                  id:{item.id}
                </CardBody>
              </Card>
            </MoveBox>
          ))
        }
      </MoveBoxs>
    </Flex>
  )
}