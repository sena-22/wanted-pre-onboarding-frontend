import React from 'react'
import {useState} from 'react'

const Signup = () => {
  const isUser = false
  const [userInfo, setUserInfo] = useState(null)

  const SignupHandler = () => {}
  const SigninHandler = () => {}

  return (
    <div>
      <form onSubmit={isUser ? SigninHandler : SignupHandler}>
        <input data-testid="email-input" placeholder="email" name="email" />
        <input data-testid="password-input" placeholder="password" name="password" />
        {isUser ? (
          <button data-testid="signin-button" type="submit">
            로그인
          </button>
        ) : (
          <button data-testid="signup-button" type="submit">
            회원가입
          </button>
        )}
      </form>
    </div>
  )
}

export default Signup
