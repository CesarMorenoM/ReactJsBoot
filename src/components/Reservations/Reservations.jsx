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
  const events = [
    {
      "orderDate": "2021-09-02T18:25:55.380Z",
      "numberPeople": 7,
      "dishesList": [
        {
          "dishId": 0,
          "quantity": 0,
          "notes": "string"
        }
      ]
    },
    {
      "orderDate": "2021-09-02T18:50:55.380Z",
      "numberPeople": 15,
      "dishesList": [
        {
          "dishId": 0,
          "quantity": 0,
          "notes": "string"
        }
      ]
    }
  ]

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
            <div className='reservations__agenda'>
              <h2>{currentDisplay}</h2>
              {
                !currentDay.events || currentDay.events?.length < 1
                  ? <h2>There are not reservations for today</h2>
                  : currentDay.events.map(event =>
                    <div className='reservations__reservation' >
                      <h3>{new Date(event.orderDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</h3>
                      <p>People: {event.numberPeople}</p>
                    </div>
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
