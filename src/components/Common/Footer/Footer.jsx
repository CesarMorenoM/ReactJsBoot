//libraries
import { NavLink } from 'react-router-dom'
//components
import Divider from '../Divider/Divider'
//images
import logo from '../../../static/logo.svg'
import facebook from '../../../static/facebook.svg'
import instagram from '../../../static/instagram.svg'
import mail from '../../../static/mail.svg'
import './footer.scss'

const Footer = () => {
  const links = [
    { name: 'Home', to: '/' },
    { name: 'Log In', to: '/login' },
    { name: 'Register restaurant' },
    { name: 'Recomendations' },
    { name: 'Help' },
    { name: 'FAQ' },
  ]
  const social = [
    { name: 'Facebook', icon: facebook, link: '#!' },
    { name: 'Instagram', icon: instagram, link: '#!' },
    { name: 'Email', icon: mail, link: '#!' },
  ]
  return (
    <div className='footer'>
      <Divider top color='transparent' />
      <div className='footer__links'>
        {links.map((link, id) =>
          <NavLink key={id} to={link.to || '/'}>{link.name}</NavLink>
        )}
      </div>
      <hr />
      <div className='footer__low'>
        <a href='/'><img className='footer__low__logo' src={logo} alt="logo" /></a>
        <p className='footer__low__text'> Desarrollado por Exsis &#169; 2021</p>
        <div className='footer__low__social'>
          {social.map((link, id) =>
            <a key={id} href={link.link}>
              <img className='footer__low__social__icon' src={link.icon} alt={link.name} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default Footer
