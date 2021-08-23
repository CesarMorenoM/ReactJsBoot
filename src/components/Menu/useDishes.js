import { useState, useEffect, useContext } from 'react'
import toast from 'react-hot-toast'
import UserContext from '../../context/UserContext/UserContext'

const API_URL = process.env.REACT_APP_MOCKAPI
const changeDishStatus = (userId, branchId, dishId, currentStatus) => {
  fetch(`${API_URL}/user/${userId}/branches/${branchId}/dishes/${dishId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: currentStatus
    })
  })
}

const useDishes = () => {
  const { user, branches } = useContext(UserContext)
  const [dishesStatus, setDishesStatus] = useState({})

  const getDishes = id => {
    let current = branches.find(branch => branch.id === id)
    return current.dishes
  }

  const noFranchise = () => branches[0]

  //Fill the dishes statuses for switches in menu
  useEffect(() => {
    if (Object.keys(dishesStatus).length === 0) {
      let initialStatuses = {}
      branches.forEach(branch => {
        let dishesStatus = {}
        branch.dishes.forEach(dish => dishesStatus = { ...dishesStatus, [dish.id]: dish.status })
        initialStatuses = { ...initialStatuses, [branch.id]: { ...dishesStatus } }
      })
      setDishesStatus(initialStatuses)
    }
  }, [dishesStatus, branches])

  //Handlers for actions with dishes
  const switchDishStatus = (dishId, branchId) => {
    const currentStatus = dishesStatus[branchId][dishId]
    setDishesStatus({
      ...dishesStatus,
      [branchId]: { ...dishesStatus[branchId], [dishId]: !currentStatus }
    })
    changeDishStatus(user.id, branchId, dishId, !currentStatus)
  }

  const deleteDish = () => {
    //Notification to confirm
    toast(t => {
      return <div>
        <p>Estas seguro? <i class="material-icons" onClick={() => toast.dismiss(t.id)}>cancel</i></p>
        <button>Delete</button>
      </div>
    })
  }

  return {
    dishesStatus,
    getDishes,
    switchDishStatus,
    deleteDish,
    noFranchise
  }
}

export default useDishes
