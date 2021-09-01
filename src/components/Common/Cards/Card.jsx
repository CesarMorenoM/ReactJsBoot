import './card.scss'
import PropTypes from 'prop-types'

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

Card.propTypes = {
  /**The component that will be inside */
  children: PropTypes.element,
  /**A posible icon at the top of the card */
  icon: PropTypes.string,
  /**Is the card type important? */
  imp: PropTypes.bool,
  /**A possible title at the top of the card */
  title: PropTypes.string
}

export default Card
