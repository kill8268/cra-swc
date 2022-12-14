import {createBrowserRouter} from 'react-router-dom'
import Home from '../pages/Home'

export default createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    exact: true,
  }
])

