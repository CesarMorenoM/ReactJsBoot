import React from 'react'
import './card.scss'

const Card = ({ children, icon, imp, type, title }) => {
  return (
    <>
      <h2 className='infoCard__title'>{title}</h2>
      <div className={imp ? 'infoCard --imp' : 'infoCard'}>
        {icon && <i className='material-icons'>{icon}</i>}
        {children}
      </div>
    </>
  )
}

export default Card
