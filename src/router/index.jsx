import {createBrowserRouter} from 'react-router-dom'
import Home from '../pages/Home'
import BaseLayout from '../layout/Base'

export default createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { path: '/', element: <Home /> },
    ]
  }
])

