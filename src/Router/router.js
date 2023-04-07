import {createBrowserRouter} from 'react-router-dom'
import Layout from '../components/Layout'
import {Loader, SigninLoader} from './loader'
import * as P from '../pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    loader: SigninLoader,
    children: [
      {
        path: '/',
        element: <P.Sign type="signin" />,
        loader: SigninLoader
      },
      {
        path: 'signin',
        element: <P.Sign type="signin" />,
        loader: SigninLoader
      },
      {
        path: 'signup',
        element: <P.Sign type="signup" />,
        loader: SigninLoader
      }
    ]
  },
  {
    path: 'todo',
    element: <P.Todo />,
    loader: Loader
  }
])

export default router
