import React from 'react'
import Upload from '@components/Upload'
import { MoveBoxs } from '@components/MoveBoxs'
import {
  Flex, Card, CardBody, CardHeader, Box, CloseButton, Button,
  Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay,
  DrawerContent, DrawerCloseButton, useDisclosure, Collapse,
  FormControl, FormLabel, Input, FormErrorMessage,
  SkeletonCircle, SkeletonText, Fade
} from '@chakra-ui/react'


const DataCard = ({ id, onClose }) => {

  const { isOpen, onToggle } = useDisclosure()

  const { isOpen: isShow, onToggle: onShowToggle } = useDisclosure()

  React.useEffect(() => {
    onShowToggle()
    setTimeout(() => {
      onToggle()
    }, 100)
  }, [])

  const handleClose = () => {
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
          onDoubleClick={onToggle}>
          <Flex justifyContent="space-between" alignItems="center">
            <Box>id:{id}</Box>
            <CloseButton onClick={handleClose} />
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

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSubmit = (values, actions) => {

    actions.setSubmitting(false)
  }

  return (
    <Flex flex={1} direction="column">
      <MoveBoxs className="flex-1 px-4 py-4">
        {(item, onRemove) => <DataCard {...item} onClose={onRemove} />}
      </MoveBoxs>
      <Drawer onClose={onClose} isOpen={isOpen} placement="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>新增计划</DrawerHeader>
          <DrawerBody>
            <FormControl name="file">
              <FormLabel>附件</FormLabel>
              <Upload url="/api/file">
                {(onSelectFile) =>
                  <Button onClick={onSelectFile}>上传文件</Button>
                }
              </Upload>
            </FormControl>
          </DrawerBody>
          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              取消
            </Button>
            <Button>提交</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}