//libraries
import { useState, useEffect, useContext } from 'react'
import { Line, Pie } from 'react-chartjs-2';
//personal
import UserContext from '../../context/UserContext/UserContext';
import './dashboard.scss'
//components
import Card from '../Common/Cards/Card'
import DishList from './DishList';
import BranchesList from '../Common/BranchesList/BranchesList';
import Loader from '../Common/Loader/Loader';
//utility
import { prevMonth } from '../../helpers/helpers';

// Select how many data show
const lastNMonths = 6
const bestDishesQuantity = 3

const Dashboard = () => {
  const { user, branches } = useContext(UserContext)
  const [branch, setBranch] = useState()

  useEffect(() => {
    if (branches !== undefined) {
      setBranch(branches[0])
    }
  }, [branches])

  // Is charging
  if (!branch || !user) return <Loader />

  // Component
  return (
    <div className='dashboard'>
      <h1 className='dashboard__user'>Welcome, <span>{user.name}</span></h1>

      <BranchesList branches={branches} currentBranch={branch} setBranch={setBranch} />
      <div className='dashboard__statistics'>

        <div className='dashboard__statistics__main' >
          <h2>Overview</h2>
          <div className='dashboard__statistics__overview'>
            <Card icon='restaurant' imp>
              <div>
                <h3>Best seller</h3>
                <p>{branch.bestDishes[0].name}</p>
                <p>- {branch.bestDishes[0].sold.toLocaleString()}</p>
              </div>
            </Card>
            <Card icon='dashboard' imp>
              <div>
                <h3>Total Reservations</h3>
                <p>All months</p>
                <p>- {branch.allSells.toLocaleString()}</p>
              </div>
            </Card>
            <Card icon='event_available' imp>
              <div>
                <h3>Best Month</h3>
                <p>{branch.bestMonth.month}</p>
                <p>- {branch.bestMonth.sells.toLocaleString()}</p>
              </div>
            </Card>
          </div>

          <Card title='Reservations'>
            <Line
              data={{
                labels: prevMonth(lastNMonths - 1),
                datasets: [{
                  label: 'Reservations',
                  data: branch.lastsells.slice(0, lastNMonths),
                  backgroundColor: 'rgba(255, 50, 41,.2)',
                  borderColor: '#ff3229',
                  borderWidth: 2,
                  fill: true,
                  tension: 0.2,
                }]
              }}
              options={{
                scales: {
                  y: { beginAtZero: true },
                  x: { reverse: true },
                }
              }}
            />
          </Card>
        </div>
        <div className='dashboard__statistics__aside' >
          <Card title='Best-Selling Dishes'>
            <DishList dishes={branch.bestDishes} quantity={bestDishesQuantity} />
            <Pie
              data={{
                labels: branch.bestDishes.slice(0, bestDishesQuantity + 2).map(a => a.name),
                datasets: [{
                  label: 'Dishes',
                  data: branch.bestDishes.slice(0, bestDishesQuantity + 2).map(a => a.sold),
                  backgroundColor: ['rgba(255, 50, 41,.8)', 'rgba(255, 50, 41,.6)', 'rgba(255, 50, 41,.4)', 'rgba(255, 50, 41,.2)'],
                  hoverOffset: 5
                }]
              }}
              options={{
                responsive: true
              }}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
