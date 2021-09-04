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
import ReservationCard from './ReservationCard/ReservationCard'

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
  let events = [
    {
      "userName": 'Santiago',
      "orderDate": "2021-09-05T21:25:55.380Z",
      "numberPeople": 7,
      "dishesList": [
        {
          "name": 'Tacos al pastor',
          "dishId": 0,
          "quantity": 7,
          "notes": "More sauce please"
        },
        {
          "name": 'Arroz con pollo',
          "dishId": 0,
          "quantity": 1
        },
        {
          "name": 'Arroz con pollo',
          "dishId": 0,
          "quantity": 2,
          "notes": "Without carrot"
        }
      ]
    },
    {
      "userName": 'Ana María',
      "orderDate": "2021-09-05T18:25:55.380Z",
      "numberPeople": 2,
    },
    {
      "userName": 'Juan Carlos',
      "orderDate": "2021-09-05T18:50:55.380Z",
      "numberPeople": 15,
      "dishesList": [
        {
          "name": 'Arroz con pollo',
          "dishId": 0,
          "quantity": 3,
        }
      ]
    },
    {
      "userName": 'Pedro',
      "orderDate": "2021-09-04T18:50:55.380Z",
      "numberPeople": 2,
      "dishesList": [
        {
          "name": 'Arroz con atún',
          "dishId": 0,
          "quantity": 4,
          "notes": "Without tuna"
        }
      ]
    }
  ]

  events = events.sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate))

  const [navigation, setNavigation] = useState(0)
  const { displayToday, days, currentDay, setCurrentDay } = useCalendar(navigation, events)

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

  console.log('Re-rendered')

  if (!currentBranch || !currentDay || !currentDisplay) return <Loader />
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
              <header className="reservations__agenda__header">
                <h2>{currentDisplay}</h2>
                <button onClick={() => setNavigation(0)}>Today <i className="material-icons">arrow_downward</i></button>
              </header>
              {
                !currentDay.events || currentDay.events?.length < 1
                  ? <h2>There are not reservations for today</h2>
                  : currentDay.events.map((event, id) =>
                    <ReservationCard event={event} id={id} key={id} />
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
