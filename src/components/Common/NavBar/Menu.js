import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './menu.scss'

const Menu = ({ menuToggle, setMenuToggle }) => {
  const links = [
    { id: '1', name: 'Profile', path: '/profile', icon: 'person', active: true },
    { id: '2', name: 'Dashboard', path: '/', icon: 'view_quilt' },
    { id: '3', name: 'Reservations', path: '/reservations', icon: 'chrome_reader_mode' },
    { id: '4', name: 'Configuration', path: '/configuration', icon: 'settings' }
  ]

  //! Close menu with scrolling or click
  useEffect(() => {
    const changeToggle = () => setMenuToggle(!menuToggle)
    const stop = e => e.stopPropagation()
    if (menuToggle) {
      document.addEventListener('scroll', changeToggle)
      document.addEventListener('click', changeToggle)
      document.getElementById('Menu').addEventListener('click', stop)
    }
    return () => {
      document.removeEventListener('click', changeToggle)
      document.getElementById('Menu').removeEventListener('click', stop)
      document.removeEventListener('scroll', changeToggle)
    }

  }, [menuToggle, setMenuToggle])

  const logOut = () => {
    console.log('Bye')
  }

  return (
    <div id='Menu' className={`menu ${menuToggle ? '--active' : ''}`}>
      <ul className='menu__list'>
        {links.map(link =>
          <NavLink exact key={link.id}
            to={link.path}
            activeClassName='--active'
            className='menu__list__item hvr-bg-to-right'
          >
            <i className="menu__list__item__icon material-icons">{link.icon}</i>
            <p className='menu__list__item__title'>{link.name}</p>
          </NavLink>
        )}
        <li className='menu__list__item hvr-bg-to-right' onClick={logOut}>
          <i className="menu__list__item__icon material-icons">exit_to_app</i>
          <p className='menu__list__item__title'>Log Out</p>
        </li>
      </ul>
    </div>
  )
}

export default Menu