import {RouterProvider} from 'react-router-dom'
import router from './Router/router'
import {Reset} from 'styled-reset'

function App() {
  return (
    <>
      <Reset />
      <RouterProvider router={router} />
    </>
  )
}

export default App
