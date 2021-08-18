import React, { useState, useEffect, useContext } from 'react'
import './dashboard.scss'
import { Line, Pie } from 'react-chartjs-2';
import Card from '../Common/Cards/Card'
import DishList from './DishList';
import Branches from './Branches';
import Loader from '../Common/Loader/Loader';
import UserContext from '../../context/UserContext/UserContext';
import { prevMonth } from '../../helpers/helpers';

//! Select how many data show
const lastNMonths = 6

const Dashboard = () => {

  //! States
  const { user, branches } = useContext(UserContext)
  const [branch, setBranch] = useState()

  useEffect(() => {
    if (branches !== undefined) {
      setBranch(branches[0])
    }
  }, [branches])

  //! Is charging
  if (!branch || !user) return <Loader />

  //! Component
  return (
    <div className='dashboard'>
      <h1 className='dashboard__user'>Welcome, <span>{user.name}</span></h1>

      <Branches branches={branches} currentBranch={branch} setBranch={setBranch} />

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
            <Card icon='event_available' imp>
              <div>
                <h3>Best Month</h3>
                <p>{branch.bestMonth.month}</p>
                <p>- {branch.bestMonth.sells.toLocaleString()}</p>
              </div>
            </Card>
            <Card icon='dashboard' imp>
              <div>
                <h3>Total Reservations</h3>
                <p>All months</p>
                <p>- {branch.allSells.toLocaleString()}</p>
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
                  x: { reverse: true }
                }
              }}
            />
          </Card>
          <Card title='Some  more text' icon='restaurant_menu'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at maximus turpis. Phasellus pellentesque dui et lacinia rutrum. Suspendisse consectetur lorem erat, et tincidunt enim pellentesque quis. Aenean laoreet lobortis ante. In et consectetur nibh. Duis sagittis ex ac dolor bibendum, a sollicitudin sem sodales. Nullam sodales euismod faucibus. Nullam sollicitudin malesuada metus ut pharetra. Cras sed pellentesque turpis, eu suscipit lectus. Curabitur vel nisl gravida, facilisis urna at, ornare urna. Suspendisse potenti. Nulla ornare tincidunt libero sit amet molestie. Morbi tellus leo, venenatis et pharetra congue, venenatis eget lacus.</p>
          </Card>
        </div>

        <div className='dashboard__statistics__aside' >
          <Card title='Best-Selling Dishes'>
            <Pie
              data={{
                labels: branch.bestDishes.map(a => a.name),
                datasets: [{
                  label: 'Dishes',
                  data: branch.bestDishes.map(a => a.sold),
                  backgroundColor: ['rgba(255, 50, 41,.8)', 'rgba(255, 50, 41,.6)', 'rgba(255, 50, 41,.4)', 'rgba(255, 50, 41,.2)'],
                  hoverOffset: 5
                }]
              }}
              options={{
                responsive: true
              }}
            />
          </Card>
          <Card title='Sells'>
            <DishList dishes={branch.dishes} quantity={5} />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
