//libraries
import {  NavLink } from 'react-router-dom'
import { useContext } from 'react'
//components
import Divider from '../Divider/Divider'
//images
import logo from '../../../static/logo.svg'
import facebook from '../../../static/facebook.svg'
import instagram from '../../../static/instagram.svg'
import mail from '../../../static/mail.svg'
import './footer.scss'
//Personal
import UserContext from "../../../context/UserContext/UserContext"

const Footer = () => {
  const { isAuth,logOut } = useContext(UserContext)
  const links = [
    { name: 'Home', to: '/' },
    { name: 'Log In', to: '/login' },
    { name: 'Register restaurant', to: '/register' },
    { name: 'Recommendation', href: '#recommendation' },
    // { name: 'Help' },
    // { name: 'FAQ' },
  ]
  const social = [
    { name: 'Facebook', icon: facebook, link: 'https://facebook.com' },
    { name: 'Instagram', icon: instagram, link: 'https://instagram.com' },
    { name: 'Email', icon: mail, link: 'mailto:test@gmail.com' },
  ]
  const onCliclHandle = ()=>{
    logOut()
  }
  return (
    <div className='footer'>
      <Divider top color='transparent' />
      <div className='footer__links'>
        {links.map((link, id) =>link.href ?
          <a href={link.href}>{link.name}</a> :
            link.name==='Log In' ?
              isAuth()  ? <a key={'Log Out'} href onClick={onCliclHandle}>Log Out</a>:
              <NavLink key={id} to={link.to || '/'} >{link.name}</NavLink>:
            <NavLink key={id} to={link.to || '/'} >{link.name}</NavLink>
        )}
      </div>
      <hr />
      <div className='footer__low'>
        <a href='/'><img className='footer__low__logo' src={logo} alt="logo" /></a>
        <p className='footer__low__text'> Desarrollado por Exsis &#169; 2021</p>
        <div className='footer__low__social'>
          {social.map((link, id) =>
            <a key={id} target={'_blank'} rel={"noreferrer"} href={link.link}>
              <img className='footer__low__social__icon' src={link.icon} alt={link.name} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default Footer
