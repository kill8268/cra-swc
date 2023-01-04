import React from 'react'
import { SWRConfig } from 'swr'
import { useToast } from '@chakra-ui/react'
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from './context/Global'
import router from './config/router'
import theme from './config/theme'
import './index.css'

function App() {
  const toast = useToast({position: 'top'})

  return (
    <SWRConfig value={{
      errorRetryCount: 2,
      onError: (error) => {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        }) 
      }
    }}>
      <Provider>
        <ChakraProvider theme={theme}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </Provider>
    </SWRConfig>
  )
}

createRoot(document.getElementById('root')).render(<App />);