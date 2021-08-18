import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../context/UserContext/UserContext'
import NavBar from '../Common/NavBar/NavBar'
import bgImage from '../../static/background-restaurant.jpg'
import './login.scss'
import toast from 'react-hot-toast'

const LogIn = () => {
  const { logIn } = useContext(UserContext)
  const [username, setUsername] = useState('')

  const history = useHistory()

  const handleLogin = async () => {
    if (username === '') toast.error("Please complete all fields", { duration: 1000, iconTheme: { primary: '#ff3229' } })
    else {
      const verification = await logIn(username)
      if (verification) history.push('/')
    }
  }

  return (
    <div className='logIn' style={{ backgroundImage: `url(${bgImage})` }}>
      <NavBar />
      <div className='logIn__container'>
        <form className="logIn__form" onSubmit={e => e.preventDefault()}>
          <div className="logIn__field">
            <i className="material-icons">local_post_office</i>
            <input
              value={username}
              placeholder='User ID'
              onChange={({ target }) => {
                setUsername(target.value)
              }}
            />
          </div>
          <div className="logIn__field">
            <i className="material-icons">lock_outline</i>
            <input
              value={username}
              placeholder='User ID'
              onChange={({ target }) => {
                setUsername(target.value)
              }}
            />
          </div>
          <button className="logIn__submit" onClick={handleLogin}>Log In</button>
          <div className="logIn__help">
            <a href='#!' >Forgot your password?</a>
            <a href='#!' >Register</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LogIn
