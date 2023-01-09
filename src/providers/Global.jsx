import React from 'react'

const Context = React.createContext()
const Consumer = Context.Consumer

function reducer(state, action) {
  return {
    ...state,
    [action.type]: action.payload
  };
}

const Provider = props => {
  const [state, dispatch] = React.useReducer(reducer, {
    location: null,
  })

  navigator.geolocation.getCurrentPosition(({coords}) => {
    const {latitude, longitude} = coords
    dispatch({ type: 'location', payload: {latitude, longitude}})
  })
  
  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  )
};

export { Context, Consumer, Provider }
