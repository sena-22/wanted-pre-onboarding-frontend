import React from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {signup} from '../api/signup'

const Signup = () => {
  const navigate = useNavigate()
  const isUser = false
  // const [userInfo, setUserInfo] = useState(null)

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
    const signupResult = await signup({
      email,
      password
    })
    if (signupResult.status === 201) {
      navigate('/signin')
    }
  }

  const SigninHandler = () => {}

  return (
    <div>
      <form onSubmit={isUser ? SigninHandler : SignupHandler}>
        <input
          value={email}
          data-testid="email-input"
          placeholder="email"
          name="email"
          onChange={handleEmail}
        />
        <input
          value={password}
          data-testid="password-input"
          placeholder="password"
          name="password"
          onChange={handlePassword}
        />
        {isUser ? (
          <button
            data-testid="signin-button"
            type="submit"
            disabled={emailValid && passwordValid ? false : true}>
            로그인
          </button>
        ) : (
          <button
            data-testid="signup-button"
            type="submit"
            disabled={emailValid && passwordValid ? false : true}>
            회원가입
          </button>
        )}
      </form>
    </div>
  )
}

export default Signup
