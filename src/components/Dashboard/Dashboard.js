import React, { useState } from 'react'
import './dashboard.scss'
import { Line, Pie } from 'react-chartjs-2';
import Card from '../Common/Card'
import DishList from './DishList';
import Branches from './Branches';

//Micelaneus functions
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

//Data we will need
const branches = ['General', 'Portal 80', 'Cedritos', 'Titan Plaza', 'Centro Mayor']
const user = 'Company Name'
const lastMonthsSells = [17, 20, 32, 24, 40, 17, 45, 32, 50, 40] //This month first
const dishes = [
  {
    name: 'Arroz con Pollo',
    price: 12.0,
    sold: 35,
    img: 'https://mui.today/__export/1596623283303/sites/mui/img/2020/08/05/arroz-con-pollo-divino.jpg_796529157.jpg'
  },
  {
    name: 'Ajiaco',
    price: 23.0,
    sold: 78
  },
  {
    name: 'Bandeja Paisa',
    price: 6.0,
    sold: 45,
    img: 'https://cdn.colombia.com/gastronomia/2011/08/02/bandeja-paisa-1616-1.gif'
  },
  {
    name: 'Lentejas',
    price: 14.0,
    sold: 90
  },
  {
    name: 'Hamburguesa',
    price: 14.0,
    sold: 230,
    img: 'https://www.buffalocity.com.co/wp-content/uploads/2021/01/ARTICULO-portafolio.jpg'
  },
  {
    name: 'Pasta',
    price: 14.0,
    sold: 80,
    img: 'https://elmundoenrecetas.s3.amazonaws.com/uploads/recipe/picture/450/IMG_2851-500.jpg'
  },
]

//Select how many data show
const lastNMonths = 6
const lastNDishes = 3

//Select specific information to display
const bestDishes = dishes.sort((a, b) => b.sold - a.sold).slice(0, lastNDishes)

const today = new Date()
today.setDate(1)
const bestMonth = {
  'sells': [...lastMonthsSells.slice(0, today.getMonth() + 1)].sort((a, b) => b - a)[0],
}
bestMonth.index = lastMonthsSells.indexOf(bestMonth.sells)
bestMonth.month = prevMonth(0, today.setMonth(today.getMonth() - bestMonth.index)).toString()

const allSells = lastMonthsSells.slice(0, new Date().getMonth() + 1).reduce((a, b) => a + b)

//Component
const Dashboard = () => {
  const [branch, setBranch] = useState('General')
  return (
    <div className='dashboard'>
      <h1 className='dashboard__user'>Bienvenído, <span>{user}</span></h1>

      <Branches branches={branches} branch={branch} setBranch={setBranch} />

      <div className='dashboard__statistics'>
        <div className='dashboard__statistics__main' >
          <h2>Overview</h2>
          <div className='dashboard__statistics__overview'>
            <Card icon='restaurant' imp>
              <div>
                <h3>Best seller</h3>
                <p>{bestDishes[0].name}</p>
                <p>{bestDishes[0].sold}</p>
              </div>
            </Card>
            <Card icon='event_available' imp>
              <div>
                <h3>Best Month</h3>
                <p>{bestMonth.month}</p>
                <p>{bestMonth.sells}</p>
              </div>
            </Card>
            <Card icon='dashboard' imp>
              <div>
                <h3>Total Reservations</h3>
                <p>{allSells}</p>
              </div>
            </Card>
          </div>

          <Card title='Reservations'>
            <Line
              data={{
                labels: prevMonth(lastNMonths - 1),
                datasets: [{
                  label: 'Reservations',
                  data: lastMonthsSells.slice(0, lastNMonths),
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
          <Card title='Sells'>
            <DishList dishes={dishes} quantity={5} />
          </Card>
          <Card title='Best-Selling Dishes'>
            <Pie
              data={{
                labels: bestDishes.map(a => a.name),
                datasets: [{
                  label: 'Dishes',
                  data: bestDishes.map(a => a.sold),
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
