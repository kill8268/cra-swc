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
    list: [],
    coordinates: {}
  })
  
  React.useEffect(() => {
    const coordinates = localStorage.getItem('coordinates')
    if (coordinates) {
      dispatch({ 
        type: 'coordinates', 
        payload: JSON.parse(coordinates)
      });
    }
  }, [])

  React.useEffect(() => {
    localStorage.setItem('coordinates', JSON.stringify(state.coordinates))
  }, [state.coordinates])

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  )
};

export { Context, Consumer, Provider }
