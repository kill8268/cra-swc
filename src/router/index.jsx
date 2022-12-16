import {createBrowserRouter} from 'react-router-dom'
import Home from '../pages/Home'
import BaseLayout from '../layout/Base'
import SignLayout from '../layout/Sign'

export default createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { path: '/', element: <Home /> },
    ]
  },
  {
    path: '/login',
    element: <SignLayout />,
  }
])

