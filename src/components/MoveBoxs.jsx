import React from 'react'

export function MoveBoxs({children, className, onAddElement}) {
  const root = React.useRef(null) 

  const handleDrop = (e) => {
    e.preventDefault();
    const { clientX, clientY } = (e.touches ? e.touches[0] : e)
    const id = e.dataTransfer.getData('text/plain')
    const {offsetLeft, offsetTop} = root.current
    onAddElement && onAddElement({
      id, 
      x: clientX - offsetLeft, 
      y: clientY - offsetTop})
  }

  return (
    <div
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
      className={`overflow-hidden ${className}`}
      style={{ transform: 'translate3d(0, 0, 0)'}} ref={root}>
      {React.Children.map(children, 
        (child) => React.cloneElement(child))}
    </div>
  )
}

export function MoveBox({children, initXY}) {
  const [coordinate, setCoordinate] = React.useState(null)

  const box = React.useRef(null)

  const isDrag = React.useRef(false)

  const startXY = React.useRef({ x: 0, y: 0 })

  React.useEffect(() => initXY && setCoordinate(initXY), [initXY])

  React.useEffect(() => {
    return () => {
      document.onmousemove = () => { }
      document.ontouchmove = () => { }
      document.onmouseup = () => { }
      document.ontouchend = () => { }
    }
  }, [])

  const handleMove = React.useCallback((e) => {
    if (!isDrag.current) return
    const { clientX, clientY } = (e.touches ? e.touches[0] : e)
    let x = clientX - (startXY.current.x - startXY.current.left)
    let y = clientY - (startXY.current.y - startXY.current.top)
    x = x > window.innerWidth? window.innerWidth: x
    y = y > window.innerHeight? window.innerHeight: y
    x = x < 0 ? 0 : x
    y = y < 0 ? 0 : y
    setCoordinate({ x, y })
  }, [])

  const handleMoveEnd = React.useCallback(() => {
    isDrag.current = false
  }, [])

  const handleMoveStart = (e) => {
    document.onmousemove = handleMove
    document.ontouchmove = handleMove
    document.onmouseup = handleMoveEnd
    document.ontouchend = handleMoveEnd
    const { offsetLeft, offsetTop } = box.current
    const xy = e.touches ? e.touches[0] : e
    console.info({
      x: xy.clientX, y: xy.clientY,
      left: offsetLeft, top: offsetTop
    })
    startXY.current = {
      x: xy.clientX, y: xy.clientY,
      left: offsetLeft, top: offsetTop
    }
    isDrag.current = true
  }

  return (
    <div 
    ref={box}
    className="fixed"
    style={coordinate && { top: coordinate.y, left: coordinate.x, zIndex: 999 }}
    onMouseDown={handleMoveStart} onTouchStart={handleMoveStart}>
      {children}
    </div>
  )
}