import React from 'react'
import { Provider, Context } from '@/providers/MoveBoxs'

export function MoveBoxs(props) {
  return (
    <Provider>
      <Boxs {...props} />
    </Provider>
  )
}

function Boxs({ children, className }) {
  const root = React.useRef(null)

  const { state: { list, coordinates }, dispatch } = React.useContext(Context)

  const handleDrop = (e) => {
    e.preventDefault();
    document.onmousemove = () => { }
    document.ontouchmove = () => { }
    document.onmouseup = () => { }
    document.ontouchend = () => { }
    const { clientX, clientY } = (e.touches ? e.touches[0] : e)
    const id = e.dataTransfer.getData('text/plain')
    const { offsetLeft, offsetTop } = root.current
    const x = clientX - offsetLeft
    const y = clientY - offsetTop
    dispatch({
      type: 'list',
      payload: [...list.filter(item => item.id !== id), { id }]
    });
    dispatch({
      type: 'addCoordinates',
      payload: {
        [id]: { x, y }
      }
    });
  }

  const handleRemove = (id) => {
    dispatch({
      type: 'list',
      payload: [...list.filter(item => item.id !== id)]
    });
    dispatch({
      type: 'deleteCoordinates',
      payload: id
    });
  }

  return (
    <div
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
      className={`overflow-hidden ${className}`}
      style={{ transform: 'translate3d(0, 0, 0)' }} ref={root}>
      {coordinates &&
        list.map((item) => (
          <MoveBox key={item.id} id={item.id}>
            {children(item, () => handleRemove(item.id))}
          </MoveBox>
        ))
      }
    </div>
  )
}

function MoveBox({ children, id }) {

  const { state: { coordinates }, dispatch } = React.useContext(Context)

  const box = React.useRef(null)

  const isDrag = React.useRef(false)

  const startXY = React.useRef({ x: 0, y: 0 })

  const handleMove = (e) => {
    if (!isDrag.current) return
    const { clientX, clientY } = (e.touches ? e.touches[0] : e)
    let x = clientX - (startXY.current.x - startXY.current.left)
    let y = clientY - (startXY.current.y - startXY.current.top)
    x = x > window.innerWidth ? window.innerWidth : x
    y = y > window.innerHeight ? window.innerHeight : y
    x = x < 0 ? 0 : x
    y = y < 0 ? 0 : y
    dispatch({
      type: 'addCoordinates',
      payload: {
        [id]: { x, y }
      }
    })
  }

  const handleMoveEnd = () => {
    isDrag.current = false
    document.onmousemove = () => { }
    document.ontouchmove = () => { }
    document.onmouseup = () => { }
    document.ontouchend = () => { }
  }

  const handleMoveStart = (e) => {
    document.onmousemove = handleMove
    document.ontouchmove = handleMove
    document.onmouseup = handleMoveEnd
    document.ontouchend = handleMoveEnd
    const { offsetLeft, offsetTop } = box.current
    const xy = e.touches ? e.touches[0] : e
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
      style={coordinates && {
        top: coordinates[id]?.y,
        left: coordinates[id]?.x,
        zIndex: 999
      }}>
      {children}
    </div>
  )
}