import React, { useState, useEffect } from 'react'
import './dashboard.scss'
import { Line, Pie } from 'react-chartjs-2';
import Card from '../Common/Cards/Card'
import DishList from './DishList';
import Branches from './Branches';
import Loader from '../Common/Loader/Loader';

//! Micelaneus functions
const prevMonth = (max, date = new Date()) => {
  max += 1
  let temp = new Date(date)
  const prevMonths = []
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  for (let i = 0; i < max; i++) {
    if (temp.getMonth) {
      prevMonths.push(months[temp.getMonth()])
      temp = new Date(temp.setMonth(temp.getMonth() - 1))

    } else {
      prevMonths.push(months[temp.getMonth()])
      temp = temp.setYear(temp.getYear() - 1);
      temp.setMonth(12);
    }
  }
  return [...new Set(prevMonths)]
}

//! Select how many data show
const lastNMonths = 6
const lastNDishes = 3


const Dashboard = () => {

  //! States
  const [user, setUser] = useState()
  const [branches, setBranches] = useState()
  const [branch, setBranch] = useState()

  //! Fetching user data
  useEffect(() => {
    fetch('https://610d6bcd48beae001747b83c.mockapi.io/user/20')
      .then(res => res.json())
      .then(user => {
        let totalBranches = user.branches
        if (totalBranches.length > 1) {
          // Create the General view of all branches
          let generalBranch = { name: 'General' }
          generalBranch.lastsells =
            user.branches
              .map(a => a.lastsells)
              .reduce((a, b) =>
                a.map((num, idx) => b[idx] ? num + b[idx] : num))
          generalBranch.dishes =
            user.branches
              .map(a => a.dishes)
              .reduce((a, b) => a.concat(b))
              .filter((elem, index, arr) => {
                let names = arr.map(a => a.name)
                if (!names.includes(elem.name, index + 1)) return elem
                else {
                  let indexPos = names.indexOf(elem.name, index + 1)
                  arr[indexPos].sold = elem.sold + arr[indexPos].sold
                  return null
                }
              })
          totalBranches.unshift(generalBranch)
        }

        // Set initial values
        setUser(user.name)
        setBranches(totalBranches)
        setBranch(totalBranches[0])
      })
  }, [])

  //! Create specific data from sells
  useEffect(() => {
    if (!branches) return
    branches.map(branch => {
      const today = new Date()
      today.setDate(1)

      branch.bestDishes = branch.dishes.sort((a, b) => b.sold - a.sold).slice(0, lastNDishes)

      branch.bestMonth = { 'sells': [...branch.lastsells.slice(0, today.getMonth() + 1)].sort((a, b) => b - a)[0] }
      branch.bestMonth.index = branch.lastsells.indexOf(branch.bestMonth.sells)
      branch.bestMonth.month = prevMonth(0, today.setMonth(today.getMonth() - branch.bestMonth.index)).toString()

      branch.allSells = branch.lastsells.slice(0, new Date().getMonth() + 1).reduce((a, b) => a + b)
      return branch
    })
  }, [branches])

  //! Is charging
  if (!branch) return <Loader />

  //! Component
  return (
    <div className='dashboard'>
      <h1 className='dashboard__user'>Bienvenído, <span>{user}</span></h1>

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
