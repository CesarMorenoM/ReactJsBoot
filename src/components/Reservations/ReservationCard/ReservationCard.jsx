import './reservationCard.scss'

const ReservationCard = ({ event, id }) => {

  const eventHour = new Date(event.orderDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <div key={id} className='reservationCard' >
      <h3 className='reservationCard__title'>
        <p className='reservationCard__title__text'>
          <i className="material-icons">restaurant</i>
          {eventHour}
        </p>
        <span>In 6 hours - 4 minutes</span>
      </h3>
      <div className='reservationCard__info'>
        <p className='reservationCard__text'> Diner <span> {event.userName} </span> </p>
        <p className='reservationCard__text'> People <span> {event.numberPeople}  </span> </p>
      </div>
      {
        event.dishesList &&
        <div className='reservationCard__menu'>
          <p className='reservationCard__text'> Menu </p>
          <ul className='reservationCard__menu__list'>
            {event.dishesList.map(dish =>
              <li className='reservationCard__menu__dish'>
                <p className="quantity" >{dish.quantity}</p>
                <p className="name" >{dish.name}</p>
                {dish.notes && <p className="notes">{dish.notes}</p>}
              </li>
            )}
          </ul>
        </div>
      }
      <div className='reservationCard__buttons'>
        <button className='delete'>Delete</button>
        <button className='confirm'>Confirm</button>
      </div>
    </div>
  )
}

export default ReservationCard
