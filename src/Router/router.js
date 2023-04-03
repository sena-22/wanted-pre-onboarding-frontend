import {createBrowserRouter} from 'react-router-dom'
import Layout from '../components/Layout'
import * as P from '../pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'todo',
        element: <P.Todo />
      }
    ]
  },
  {
    path: 'signin',
    element: <P.Signin />
  },
  {
    path: 'signup',
    element: <P.Signup />
  }
])

export default router
