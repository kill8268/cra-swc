import React from 'react'

export default function useFileUploader() {

  const [progress, setProgress] = React.useState(0)

  const [isLoading, setIsLoading] = React.useState(false)

  const [error, setError] = React.useState(null)

  const uploader = (file, params) => {
    setProgress(0)
    setError(null)
    const xhr = new XMLHttpRequest()
    const formData = new FormData()
    formData.append('file', file)
    if (params) {
      Object.keys(params).forEach(key => {
        formData.append(key, params[key])
      })
    }
    xhr.upload.onprogress = (e) => setProgress(Math.round(e.loaded / e.total * 100))
    xhr.upload.onloadstart = () => setIsLoading(true)
    xhr.upload.onloadend = () => setIsLoading(false)
    xhr.upload.onerror = (e) => setError(e)
    xhr.open('POST', '/api/upload')
    xhr.send(formData)
  }

  return [uploader, progress, isLoading, error]

}