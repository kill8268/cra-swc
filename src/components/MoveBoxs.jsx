import React from 'react'
import { Provider, Context } from '../context/MoveBoxs'

export function MoveBoxs(props) {
  return (
    <Provider>
      <Boxs {...props}  />
    </Provider>
  )
}

function Boxs({children, className}) {
  const root = React.useRef(null) 

  const {state: {list, coordinates}, dispatch} = React.useContext(Context)

  const handleDrop = (e) => {
    e.preventDefault();
    document.onmousemove = () => { }
    document.ontouchmove = () => { }
    document.onmouseup = () => { }
    document.ontouchend = () => { }
    const { clientX, clientY } = (e.touches ? e.touches[0] : e)
    const id = e.dataTransfer.getData('text/plain')
    const {offsetLeft, offsetTop} = root.current
    const x = clientX - offsetLeft
    const y = clientY - offsetTop
    dispatch({ 
      type: 'list', 
      payload: [...list, {id}]
    });
    dispatch({ 
      type: 'coordinates', 
      payload: {
        ...coordinates,
        [id]: {x, y}
      }
    });
  }

  return (
    <div
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
      className={`overflow-hidden ${className}`}
      style={{ transform: 'translate3d(0, 0, 0)'}} ref={root}>
        {coordinates &&
          list.map((item) => (
            <MoveBox id={item.id} initXY={coordinates[item.id]}>
              {children(item)}
            </MoveBox>
          ))
        }
    </div>
  )
}

export function MoveBox({children, id, initXY}) {
  const [coordinate, setCoordinate] = React.useState(initXY)

  const {state: {coordinates}, dispatch} = React.useContext(Context)

  const box = React.useRef(null)

  const isDrag = React.useRef(false)

  const startXY = React.useRef({ x: 0, y: 0 })

  React.useEffect(() => initXY && coordinate && setCoordinate(initXY), [initXY])

  React.useEffect(() => {
    return () => {
      document.onmousemove = () => { }
      document.ontouchmove = () => { }
      document.onmouseup = () => { }
      document.ontouchend = () => { }
    }
  }, [])

  React.useEffect(() => {
    dispatch({
      type: 'coordinates', 
      payload: {
        ...coordinates,
        [id]: coordinate
      }
    })
  }, [coordinate])

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
    onMouseDown={handleMoveStart} 
    onTouchStart={handleMoveStart}
    style={coordinate && { 
      top: coordinate.y, 
      left: coordinate.x, 
      zIndex: 999 
    }}>
      {children}
    </div>
  )
}