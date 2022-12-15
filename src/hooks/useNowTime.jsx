import React from 'react'
import dayjs from 'dayjs'

export default function useNowTime({format = 'YYYY年MM月DD日 HH:mm'}) {
  const [nowTime, setNowTime] = React.useState(new Date())

  React.useEffect(() => {
    const timer = setInterval(() => {
      setNowTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return dayjs(nowTime).format(format)
}