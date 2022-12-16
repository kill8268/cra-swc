import React from 'react'
import { MoveBoxs } from '../components/MoveBoxs'
import {
  Flex, Card, CardBody, CardHeader, Box, CloseButton,
  useDisclosure, Collapse, SkeletonCircle, SkeletonText, Fade
} from '@chakra-ui/react'

const DataCard = ({ id, onClose }) => {

  const { isOpen, onToggle } = useDisclosure()

  const { isOpen: isShow , onToggle: onShowToggle } = useDisclosure({
    isOpen: true
  })

  React.useEffect(() => {
    onShowToggle()
    setTimeout(() => {
      onToggle()
    }, 100)
  }, [])

  const handleDoubleClick = () => {
    onShowToggle()
    setTimeout(() => {
      onClose && onClose()
     }, 100)
  }

  return (
    <Fade in={isShow}>
      <Card width={400}>
        <CardHeader
          className={isOpen ? 'border-b' : ''}
          onDoubleClick={handleDoubleClick}>
          <Flex justifyContent="space-between" alignItems="center">
            <Box>id:{id}</Box>
            <CloseButton onClick={handleDoubleClick} />
          </Flex>
        </CardHeader>
        <Collapse in={isOpen} animateOpacity>
          <CardBody>
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </CardBody>
        </Collapse>
      </Card>
    </Fade>
  )
}


export default function Home() {
  return (
    <Flex flex={1} direction="column">
      <MoveBoxs className="flex-1 px-4 py-4">
        {(item, onRemove) => <DataCard {...item} onClose={onRemove} />}
      </MoveBoxs>
      <Box className="border-t h-8">
        asdasd
      </Box>
    </Flex>
  )
}