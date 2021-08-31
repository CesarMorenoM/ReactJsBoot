import './calendar.scss'
import { capitalize } from '../../../helpers/helpers'
import { useEffect } from 'react/cjs/react.development'

const Calendar = ({ displayDay, setCurrentDay, days, currentDay, handleNavigation }) => {

  const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']



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
            ${day.events ? '--events' : ''} 
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

export default Calendar
