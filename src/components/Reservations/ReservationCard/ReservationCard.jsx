//libraries
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
//personal
import { calculateDateDifference, updateUntilTimeText } from '../../../helpers/helpers'
import './reservationCard.scss'

const ReservationCard = ({ event }) => {

  const [untilTime, setUntilTime] = useState()
  const eventHourText = new Date(event.orderDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  useEffect(() => {
    const difference = calculateDateDifference(event.orderDate)
    let timer

    if (difference > 0) {
      setUntilTime(updateUntilTimeText(event.orderDate))
      timer = setInterval(() =>
        setUntilTime(updateUntilTimeText(event.orderDate))
        , 1000)
    }
    else setUntilTime('Expired')

    return () => clearInterval(timer)

  }, [event])

  return (
    <div className='reservationCard' >
      <h3 className='reservationCard__title'>
        <p className='reservationCard__title__text'>
          <i className="material-icons">restaurant</i>
          {eventHourText}
        </p>
        <span>{untilTime}</span>
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
            {event.dishesList.map((dish, id) =>
              <li key={id} className='reservationCard__menu__dish'>
                <p className="quantity" >{dish.quantity}</p>
                <p className="name" >{dish.name}</p>
                {dish.notes && <p className="notes">{dish.notes}</p>}
              </li>
            )}
          </ul>
        </div>
      }
      {
        untilTime !== 'Expired'
        && <div className='reservationCard__buttons'>
          <button className='delete'>Delete</button>
          <button className='confirm'>Confirm</button>
        </div>
      }
    </div>
  )
}

ReservationCard.propTypes = {
  /**The info of the reservation that we want to add */
  event: PropTypes.object.isRequired
}

export default ReservationCard
