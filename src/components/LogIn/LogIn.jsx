//libraries
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
//components
import UserContext from '../../context/UserContext/UserContext'
import NavBar from '../Common/NavBar/NavBar'
//images
import bgImage from '../../static/background-restaurant.jpg'
import './login.scss'

const LogIn = () => {
  const { logIn } = useContext(UserContext)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const history = useHistory()

  const handleLogin = async data => {
    const verification = await logIn(data.username)
    if (verification) history.push('/')
  }

  return (
    <div className='logIn' style={{ backgroundImage: `url(${bgImage})` }}>
      <NavBar logged={false} />
      <div className='logIn__container'>
        <form className="logIn__form" onSubmit={handleSubmit(handleLogin)}>
          <div className="logIn__field">
            <i className="material-icons">local_post_office</i>
            <input placeholder='User Email' defaultValue=''
              {...register('username', { required: 'Please put your username' })} />
          </div>
          <span className='logIn__error'>{errors?.username?.message}</span>

          <div className="logIn__field">
            <i className="material-icons">lock_outline</i>
            <input type='password' placeholder='Password' defaultValue=''
              {...register('password', { required: 'Please put your password' })} />
          </div>
          <span className='logIn__error'>{errors?.password?.message}</span>

          <button type='submit' className="logIn__submit" >Log In</button>
          <div className="logIn__help">
            <a href='#!' >Forgot your password?</a>
            <a href='/register' >Register</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LogIn
