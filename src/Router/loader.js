import {redirect} from 'react-router-dom'

export const Loader = () => {
  const isLogged = localStorage.getItem('token')

  if (!isLogged) return redirect('/signin') //토큰이 없으면 signin으로 이동

  return null
}

export const SigninLoader = () => {
  const isLogged = localStorage.getItem('token')

  if (isLogged) return redirect('/todo') //토큰이 있으면 todo로 이동

  return null
}
