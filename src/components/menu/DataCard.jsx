import React from 'react'
import {Card, CardBody, Text}  from '@chakra-ui/react'

export default function DataCard({text, id}) {
  const dom = React.useRef(null)

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'copyMove'
    e.dataTransfer.setData('text/plain', e.target.id)
    e.dataTransfer.setDragImage(dom.current, 10, 10)
  }
  
  return (
    <Card id={id} ref={dom} draggable={true} onDragStart={handleDragStart}>
      <CardBody>
        {text && <Text>{text}</Text>} 
      </CardBody>
    </Card>
  )
}