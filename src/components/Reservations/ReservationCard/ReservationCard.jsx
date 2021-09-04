import './reservationCard.scss'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useEffect } from 'react/cjs/react.development'

const ReservationCard = ({ event, id }) => {

  const [untilTime, setUntilTime] = useState()
  const eventHourText = new Date(event.orderDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  /**
   * Calculate the time until a specifc date
   * @param {String} date The date we want to know the time
   * @returns A number with the time time until something happens
   */
  const calculateDifference = (date) => {
    const now = new Date().getTime()
    const eventHour = new Date(date).getTime()
    return eventHour - now
  }

  useEffect(() => {
    const updateUntilTime = () => {
      const untilDifference = calculateDifference(event.orderDate)
      const untilDays = Math.floor(untilDifference / (1000 * 60 * 60 * 24))
      const untilHours = Math.floor((untilDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const untilMinutes = Math.floor((untilDifference % (1000 * 60 * 60)) / (1000 * 60))
      setUntilTime(
        `In ${untilDays > 0 ? `${untilDays} days - ` : ''}
            ${untilHours > 0 ? `${untilHours} hours - ` : ''}
            ${untilMinutes > 0 ? `${untilMinutes} minutes` : ''}`)
    }

    const difference = calculateDifference(event.orderDate)
    let updateTime

    if (difference > 0) {
      updateUntilTime()
      updateTime = setInterval(updateUntilTime, 1000)
    }
    else setUntilTime('Expired')

    return () => updateTime ? clearInterval(updateTime) : null

  }, [event])



  return (
    <div key={id} className='reservationCard' >
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
  event: PropTypes.object.isRequired,
  /**An unique id to identify the event */
  id: PropTypes.number.isRequired
}

export default ReservationCard
