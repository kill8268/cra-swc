import React from 'react'

export default function useFileUploader() {

  const [progress, setProgress] = React.useState(0)

  const [isLoading, setIsLoading] = React.useState(false)

  const clear = () => setProgress(0)

  const uploader = (url, file, formFileKey, params) => {
    setIsLoading(true)
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const formData = new FormData()
      formData.append(formFileKey || 'file', file)
      if (params) {
        Object.keys(params).forEach(key => {
          formData.append(key, params[key])
        })
      }
      xhr.upload.onprogress = (e) => setProgress(Math.round(e.loaded / e.total * 100))
      xhr.upload.onerror = reject
      xhr.upload.onabort = reject
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          setIsLoading(false)
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response))
          } else {
            reject(xhr)
          }
        }
      }
      xhr.open('POST', url)
      xhr.send(formData)
    })
  }

  return [uploader, clear, progress, isLoading]
}