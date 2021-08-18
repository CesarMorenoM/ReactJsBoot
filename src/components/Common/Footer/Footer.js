import React from 'react'
import Divider from '../Divider/Divider'
import './footer.scss'

const Footer = () => {
  return (
    <div className='footer'>
      <Divider top color='transparent' />
      <h3 className='footer__title'> 2021 &#169; Comensales App</h3>
    </div>
  )
}

export default Footer
