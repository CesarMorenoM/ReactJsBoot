//libraries
import { useState, useEffect, useContext } from 'react'
//personal
import UserContext from '../../context/UserContext/UserContext'
import './dashboard.scss'
//components
import Card from '../Common/Cards/Card'
import DishList from './DishList/DishList'
import BranchesList from '../Common/BranchesList/BranchesList'
import Loader from '../Common/Loader/Loader'

// Select how many data show
const bestDishesQuantity = 3

const Dashboard = () => {
  const { user, branches } = useContext(UserContext)
  const [branch, setBranch] = useState()


  useEffect(() => {
    if (branches !== undefined) setBranch(branches[0])
  }, [branches])

  // Is charging
  if (!branch || !user) return <Loader />

  // Component
  return (
    <div className="dashboard">
      <h1 className="dashboard__user">
        Welcome, <span>{user.name}</span>
      </h1>

      <BranchesList branches={branches} currentBranch={branch} setBranch={setBranch} />
      <h2>Overview</h2>
      <Card icon="restaurant" imp>
        <div>
          <h3>Best seller</h3>
          <p>{branch.bestDishes[0].name}</p>
        </div>
      </Card>
      <Card title="Best-Selling Dishes">
        <div>
          <DishList dishes={branch.bestDishes} quantity={bestDishesQuantity} />
        </div>
      </Card>
    </div>
  )
}

export default Dashboard
