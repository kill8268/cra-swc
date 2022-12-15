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
  const [state, dispatch] = React.useReducer(reducer, {})

  
  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  )
};

export { Context, Consumer, Provider }
