import React from 'react'


const TestComponent = (data) => {

  return (
    <div>{Math.random().toString(36).slice(-6)}</div>
  )
}

export default function Test() {
  
  const [ time, setTime ] = React.useState()

  const [ data, setData ] = React.useState()

  React.useEffect(() => {
    setInterval(() => setTime(new Date().toLocaleTimeString()), 1000)
  }, [])

  return (
    <div>
      <h1>{time}</h1>
      <TestComponent data={data} />
    </div>
  )
}