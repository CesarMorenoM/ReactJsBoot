import React, { useContext, useState } from 'react'
import UserContext from '../../../context/UserContext/UserContext'
import Menu from './Menu'
import logo from '../../../static/logo.svg'
import './nav-bar.scss'
import { useHistory } from 'react-router-dom'

const NavBar = ({ logged }) => {
  const history = useHistory()
  const [menuToggle, setMenuToggle] = useState(false)
  const { user } = useContext(UserContext)

  const initialStyle = {
    backgroundColor: 'transparent',
    padding: '1em',
    position: 'relative'
  }

  const createLogged = () => {
    return <div className='nav-bar__user'>
      <i className=' nav-bar__user__icon material-icons'>notifications</i>
      <h2 className=' nav-bar__user__name'>{user.name}</h2>
      <div
        className='nav-bar__user__img'
        style={{ backgroundImage: `url(${user.avatar})` }}
        onClick={() => setMenuToggle(!menuToggle)}
      >
      </div>
    </div>
  }

  return (
    <>
      <nav className='nav-bar' style={!logged ? initialStyle : {}}>
        <a href='/'>
          <img className='nav-bar__title' src={logo} alt="logo" />
        </a>
        {logged
          ? createLogged()
          : <button className="nav-bar__login hvr-br-to-right"
            onClick={() => history.push('/login')}> Inicia sesion </button>}
      </nav>
      <Menu menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
    </>
  )
}

export default NavBar
