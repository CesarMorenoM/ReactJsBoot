import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../context/UserContext/UserContext'
import './login.scss'

const LogIn = () => {
  const { logIn } = useContext(UserContext)
  const [username, setUsername] = useState('')
  const history = useHistory()

  const handleLogin = async () => {
    if (username !== '') {
      await logIn(username)
      history.push('/')
    }
  }

  return (
    <div className='logIn'>
      <h1>Log in</h1>
      <input
        value={username}
        placeholder='User ID'
        onChange={({ target }) => {
          setUsername(target.value)
        }}
      />
      <button onClick={handleLogin} >Log In</button>
    </div>
  )
}

export default LogIn
