import React, { useContext, useState } from 'react'
import UserContext from '../../../context/UserContext/UserContext'
import Menu from './Menu'
import './nav-bar.scss'

const NavBar = () => {
  const [menuToggle, setMenuToggle] = useState(false)
  const user = useContext(UserContext).user

  return (
    <>
      <nav className='nav-bar'>
        <a href='/'>
          <h1 className='nav-bar__title'>Comensales<span>App</span></h1>
        </a>
        <div className='nav-bar__user'>
          <i className=' nav-bar__user__icon material-icons'>notifications</i>
          <h2 className=' nav-bar__user__name'>{user.name}</h2>
          <div
            className='nav-bar__user__img'
            style={{ backgroundImage: `url(${user.avatar})` }}
            onClick={() => setMenuToggle(!menuToggle)}
          >
          </div>
        </div>
      </nav>
      <Menu menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
    </>
  )
}

export default NavBar
