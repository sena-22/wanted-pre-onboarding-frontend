import React from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {sign_up, sign_in} from '../api/signAPI'

const Sign = ({type}) => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)

  const handleEmail = e => {
    setEmail(e.target.value)
    setEmailValid(emailValidationCheck(e.target.value) ? true : false)
  }

  const handlePassword = e => {
    setPassword(e.target.value)
    setPasswordValid(passwordValidationCheck(e.target.value) ? true : false)
  }

  const emailRegExp = /@/
  const passwordRegExp = /.{8,}/

  const emailValidationCheck = email => {
    return emailRegExp.test(email) ? true : false
  }

  const passwordValidationCheck = password => {
    return passwordRegExp.test(password) ? true : false
  }

  const SignupHandler = async e => {
    e.preventDefault()
    const signupResult = await sign_up({
      email,
      password
    })
    if (signupResult.status === 201) {
      navigate('/signin')
    }
  }

  const SigninHandler = async e => {
    e.preventDefault()
    const signinResult = await sign_in({
      email,
      password
    })
    if (signinResult === 'success') navigate('/todo')
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen font-mono text-zinc-100">
      <div className="flex items-center justify-center bg-lime-900 rounded-xl h-3/6">
        <form
          onSubmit={type === 'signin' ? SigninHandler : SignupHandler}
          className="flex flex-col items-center justify-center w-4/6 h-3/5">
          <label className="mb-3">email</label>
          <input
            value={email}
            data-testid="email-input"
            placeholder="email"
            name="email"
            onChange={handleEmail}
            className="w-full p-3 mb-5 text-orange-900 rounded h-1/6"
          />
          <label className="mb-3">password</label>
          <input
            value={password}
            data-testid="password-input"
            placeholder="password"
            name="password"
            onChange={handlePassword}
            className="w-full p-3 mb-5 text-orange-900 rounded h-1/6 "
          />
          {type === 'signin' ? (
            <button
              data-testid="signin-button"
              type="submit"
              disabled={emailValid && passwordValid ? false : true}
              className="w-full mt-3 bg-orange-600 rounded h-1/6">
              sign in
            </button>
          ) : (
            <button
              data-testid="signup-button"
              type="submit"
              disabled={emailValid && passwordValid ? false : true}
              className="w-full mt-3 bg-orange-600 rounded h-1/6">
              sign up
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default Sign
