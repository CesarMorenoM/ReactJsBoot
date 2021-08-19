import React, { useContext, useState } from 'react'
import UserContext from '../../../context/UserContext/UserContext'
import MenuNavBar from './MenuNavBar'
import logo from '../../../static/logo.svg'
import './nav-bar.scss'
import { NavLink, useHistory } from 'react-router-dom'

const NavBar = ({ logged, minimal }) => {
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
      <nav className='nav-bar' style={!logged ? initialStyle : {}} id='inicio'>
        <NavLink to='/'>
          <img className='nav-bar__title' src={logo} alt="logo" />
        </NavLink>
        {logged
          ? createLogged()
          : <button className="nav-bar__login hvr-br-to-right"
            onClick={() => history.push('/login')}> Log In </button>}
      </nav>
      <MenuNavBar menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
    </>
  )
}

export default NavBar
