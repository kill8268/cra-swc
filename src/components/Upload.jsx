import React from 'react'
import useFileUploader from '../hooks/api/useFileUploader'
import { Progress, Spinner, Text } from '@chakra-ui/react'
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons'

export default function Upload(props) {
  const {
    className, style, children, beforeUpload, url,
    formFileKey, param
  } = props

  const input = React.useRef(null)

  const [fileList, setFileList] = React.useState([])

  const [isLoading, setIsLoading] = React.useState(false)

  const [uploader, clear, progress] = useFileUploader()

  const onSelectFile = () => !isLoading && input.current.click()

  const updateList = (uid, data) => {
    setFileList(e => [...e.map(item => item.uid === uid ? {
      ...item,
      ...data,
    } : item)])
  }

  const handleUpload = async (e) => {
    const files = e.target.files
    if (!files.length) return
    setIsLoading(true)
    const list = []
    for (var i = 0; i < files.length; i++) {
      const file = files.item(i);
      list.push({
        uid: Math.random().toString(36).slice(-8),
        status: 'waiting',
        type: file.type,
        name: file.name,
        file,
      })
    }
    beforeUpload && (await handleUpload(files))
    setFileList(e => [...e, ...list])
    const loop = (inx) => {
      const uid = list[inx].uid
      uploader(url, list[inx].file, formFileKey, param)
        .then(res => {
          updateList(uid, {
            status: 'done',
            ...res,
          })
        })
        .catch(err => {
          console.error(err)
          updateList(uid, { status: 'error' })
        })
        .finally(() => {
          clear()
          if (inx < list.length - 1) {
            loop(inx + 1)
          } else {
            setIsLoading(false)
          }
        })
    }
    loop(0)
  }

  const getProgressValue = (status) => {
    switch (status) {
      case 'uploading':
        return progress
      case 'done':
        return 100
      default:
        return 0
    }
  }

  const getIcon = (status) => {
    switch (status) {
      case 'done':
        return <CheckCircleIcon color='green.500' mr={2} />
      case 'error':
        return <WarningIcon color='red.500' mr={2} />
      default:
        return <Spinner size='xs' colorScheme='green' mr={2} />
    }
  }

  return (
    <div className={className} style={style}>
      {fileList.map(({ uid, status, name }) => (
        <div key={uid} className="mb-2">
          <div className='flex items-center'>
            {getIcon(status)}
            <Text className='text-ellipsis' as={status === 'error' ? 's' : ''}>
              {name}
            </Text>
          </div>
          {new Set(['uploading', 'waiting']).has(status) && (
            <Progress size='xs' value={getProgressValue(status)}
              isIndeterminate={status === 'waiting'} />
          )}
        </div>
      ))}
      {children && children(onSelectFile)}
      <input onChange={handleUpload} ref={input} type="file" className='hidden' multiple />
    </div>
  )

}