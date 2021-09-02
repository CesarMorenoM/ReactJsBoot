import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { capitalize } from '../../../helpers/helpers'
import './calendar.scss'

const Calendar = ({ displayDay, setCurrentDay, days, currentDay, handleNavigation }) => {
  const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  // Update the focus day when navigate
  useEffect(() => {
    const isInitialMonth = !!days.filter(day => day.date === currentDay.date).length

    const initMonth = new Date(displayDay).getMonth() + 1
    const initDay = new Date(displayDay).getDate()
    const initYear = new Date(displayDay).getFullYear()
    const realMonth = new Date().getMonth() + 1
    const realYear = new Date().getFullYear()

    if (!isInitialMonth) {
      setCurrentDay(days.find(day => day.date === `${initMonth}/${initDay}/${initYear}`))
    }
    else if (initMonth === realMonth && initYear === realYear) {
      const realDay = new Date().getDate()
      if (new Date(currentDay.date).getMonth() + 1 !== realMonth) {
        setCurrentDay(days.find(day => day.date === `${realMonth}/${realDay}/${realYear}`))
      }
    }
  }, [days, displayDay, setCurrentDay, currentDay])

  //Component
  return (
    <div className='calendar'>
      <div className='calendar__header'>
        <h2>{displayDay}</h2>
        <div className='calendar__header__buttons'>
          <button onClick={() => handleNavigation(-1)}><i className="material-icons">arrow_back</i></button>
          <button onClick={() => handleNavigation(1)}><i className="material-icons">arrow_forward</i></button>
        </div>
      </div>
      <div className='calendar__weeks'>
        {weekDays.map((name, id) =>
          <div className='calendar__week' key={id}>
            {capitalize(name.substring(0, 3))}
          </div>
        )}
      </div>
      <div className='calendar__days'>
        {days.map((day, id) => {
          const type = `
            ${day.isInitialDay ? '--initial' : ''} 
            ${day.events !== undefined && day.events?.length > 0 ? '--events' : ''} 
            ${day.date === currentDay.date ? '--current' : ''}`
          if (!day.value) return <div className='calendar__day --none' key={id}></div>
          return (
            <div className={'calendar__day ' + type}
              key={id}
              onClick={() => setCurrentDay(day)}>
              {day.value && day.value}
            </div>
          )
        })}
      </div>
    </div>
  )
}

Calendar.propTypes = {
  /**The date we want to put in the title */
  displayDay: PropTypes.string.isRequired,
  /**Function to change the focused/current day */
  setCurrentDay: PropTypes.func.isRequired,
  /**List of all days ( with padding days ) */
  days: PropTypes.array.isRequired,
  /**The current/focused day */
  currentDay: PropTypes.object.isRequired,
  /**Function to manage the navigation in the menu */
  handleNavigation: PropTypes.func
}

export default Calendar
