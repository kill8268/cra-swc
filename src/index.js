import React from 'react'
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from './context/Global'
import router from './router'
import './index.css'

function App() {
  return (
    <Provider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  )
}

createRoot(document.getElementById('root')).render(<App />);