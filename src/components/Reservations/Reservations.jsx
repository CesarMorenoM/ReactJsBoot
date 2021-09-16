//libraries
import { useState, useContext } from 'react'
//components
import Card from '../Common/Cards/Card'
import Calendar from './Calendar/Calendar'
import BranchesList from '../Common/BranchesList/BranchesList'
import Loader from '../Common/Loader/Loader'
import ReservationCard from './ReservationCard/ReservationCard'
//personal
import UserContext from '../../context/UserContext/UserContext'
import useCalendar from './useCalendar'
import './reservations.scss'

const Reservations = () => {
  //Get the branches
  const { branches, reservations, isFranchise } = useContext(UserContext)

  const [currentBranch, setCurrentBranch] = useState(branches[0])

  const currentReservations = Object.keys(reservations).length !== 0
    ? Object.values(reservations[currentBranch.id]).sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate))
    : undefined

  const [navigation, setNavigation] = useState(0)

  const { displayToday, days, currentDay, setCurrentDay } = useCalendar(navigation, currentReservations)

  //Set the current date to display
  let currentDisplay
  if (currentDay) {
    currentDisplay = new Date(currentDay.date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    })
  }

  /**
   * Change the navigation forward or backward
   * @param {Number} value When we want to change the navigation (>1 ->) (<1 <-)
   */
  const handleNavigation = value => {
    value >= 1
      ? setNavigation(navigation + 1)
      : setNavigation(navigation - 1)
  }

  if (!currentBranch || !currentDay || !currentDisplay || !currentReservations) return <Loader />
  return (
    <div className='reservations'>
      {
        !isFranchise
          ? <div className='reservations__header'>
            <h1>{currentBranch.name}</h1>
          </div>
          : <div className='reservations__list'>
            <BranchesList branches={branches} currentBranch={currentBranch} setBranch={setCurrentBranch} />
          </div>
      }
      <div className='reservations__container'>
        <div className='reservations__main'>
          <Card title='Agenda'>
            <div className='reservations__agenda'>
              <header className="reservations__agenda__header">
                <h2>{currentDisplay}</h2>
                <button onClick={() => setNavigation(0)}>Today <i className="material-icons">arrow_downward</i></button>
              </header>
              {
                !currentDay.events || currentDay.events?.length < 1
                  ? <h2>There are not reservations for today</h2>
                  : currentDay.events.map((event, id) =>
                    <ReservationCard event={event} key={id} />
                  )
              }
            </div>
          </Card>
        </div>
        <div className='reservations__side'>
          <Card title='Calendar'>
            <Calendar
              displayDay={displayToday}
              setCurrentDay={setCurrentDay}
              days={days} currentDay={currentDay}
              handleNavigation={handleNavigation} />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Reservations
