import './card.scss'

const Card = ({ children, icon, imp, title }) => {
  return (
    <>
      {title && <h2 className='infoCard__title'>{title}</h2>}
      <div className={`infoCard ${imp ? '--imp' : ''}`}>
        {icon && <i className='material-icons'>{icon}</i>}
        {children}
      </div>
    </>
  )
}

export default Card
