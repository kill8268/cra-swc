import React from 'react'
import useFileUploader from '../hooks/api/useFileUploader'

export default function Upload({className, style, beforeUpload, children}) {

  const input = React.useRef(null)

  const [uploader, progress, isLoading, error ] = useFileUploader()

  const onSelectFile = () => !isLoading && input.current.click()

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    beforeUpload && (await handleUpload(file))
    uploader(file)
  }

  return (
    <div className={className} style={style}>
      {children(onSelectFile)}
      <input onChange={handleUpload} ref={input} type="file" className='hidden' />
      <div className='flex'>

      </div>
    </div>
  )

}