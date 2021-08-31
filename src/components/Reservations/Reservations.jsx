//libraries
import { useState, useContext } from 'react'
//components
import Card from '../Common/Cards/Card'
import Calendar from './Calendar/Calendar'
import BranchesList from '../Common/BranchesList/BranchesList'
import Loader from '../Common/Loader/Loader'
import UserContext from '../../context/UserContext/UserContext'
//personal
import useCalendar from './useCalendar'
import './reservations.scss'

const Reservations = () => {
  //Get the branches
  const { branches: branchesInfo } = useContext(UserContext)

  let branches = branchesInfo
  let franch = false

  if (branchesInfo.length > 1) {
    branches = [...branchesInfo]
    branches.shift()
    franch = true
  }

  const [currentBranch, setCurrentBranch] = useState(branches[0])

  //Use the calendar
  const events = [{ date: '8/27/2021' }, { date: '8/1/2021' }, { date: '9/3/2021' }, { date: '8/30/2021' }]

  const [navigation, setNavigation] = useState(0)

  const { displayToday, days, currentDay, setCurrentDay } = useCalendar(navigation, events)

  const currentDisplay = new Date(currentDay.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })

  const handleNavigation = value => {
    value >= 1
      ? setNavigation(navigation + 1)
      : setNavigation(navigation - 1)
  }

  if (!currentBranch || !currentDay) return <Loader />
  return (
    <div className='reservations'>
      {
        !franch
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
            <h2>{currentDisplay}</h2>
            {
              !currentDay.events
                ? <h2>There are not reservations for today</h2>
                : <h2>Today we have reservations!</h2>
            }
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
