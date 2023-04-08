export const saveTokenToLocalStorage = accessToken => {
  localStorage.setItem('token', accessToken)
}

export const getTokenToLocalStorage = () => {
  return localStorage.getItem('token')
}
