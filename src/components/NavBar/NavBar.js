import React from 'react'
import './nav-bar.scss'

const Menu = ({ user }) => {
  user.img = 'https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-PNG.png'
  user.name = 'Company Name'

  return (
    <nav className='nav-bar'>
      <h1 className='nav-bar__title'>Comensal<span>App</span></h1>
      <div className='nav-bar__user'>
        <i className=' nav-bar__user__icon material-icons'>notifications</i>
        <h2 className=' nav-bar__user__name'>{user.name}</h2>
        <div className='nav-bar__user__img' style={{ backgroundImage: `url(${user.img})` }}></div>
      </div>
    </nav>
  )
}

export default Menu
