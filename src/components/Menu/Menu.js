//libraries
import { useContext, useState, useEffect } from 'react'
import Switch from "react-switch";
import ModalView from './Modal/Modal'
import toast from 'react-hot-toast'
//personal
import UserContext from '../../context/UserContext/UserContext'
//components
import Loader from '../Common/Loader/Loader'
import Card from '../Common/Cards/Card'
import './Menu.scss'


const Menu = ({ franch = true, branch }) => {

  //Initial states
  const { user, branches } = useContext(UserContext)
  const [currentDishes, setCurrentDishes] = useState([])
  const [dishesStatus, setDishesStatus] = useState({})

  //Get the dishes when change branch
  useEffect(() => {
    setCurrentDishes([])
    setDishesStatus({})
    getDishes(user.id, branch.id)
      .then(res => setCurrentDishes(res))
  }, [branch, user])

  //Fill the init dishesStatus
  useEffect(() => {
    if (currentDishes.length !== 0 && Object.keys(dishesStatus).length === 0) {
      const setInitalStatus = {}
      currentDishes.forEach(dish => { setInitalStatus[dish.id] = dish.status })
      setDishesStatus(setInitalStatus)
    }
  }, [dishesStatus, currentDishes])

  //Put the first branch for NO franchises
  if (branch === undefined) branch = branches[0]

  //GET and PUT methods
  const changeDishStatus = (userId, branchId, dishId, currentStatus) => {
    fetch(`https://610d6bcd48beae001747b83c.mockapi.io/user/${userId}/branches/${branchId}/dishes/${dishId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: currentStatus
      })
    })
  }
  const getDishes = async (userId, branchId) => {
    let dishes
    try {
      await fetch(`https://610d6bcd48beae001747b83c.mockapi.io/user/${userId}/branches/${branchId}/dishes`)
        .then(res => res.json())
        .then(data => dishes = data)
        .catch(err => err)
    } catch (err) { }
    return dishes
  }

  //Handlers for the different buttons
  const handleSwitchDishStatus = (dishId) => {
    const currentStatus = dishesStatus[dishId]
    setDishesStatus({ ...dishesStatus, [dishId]: !currentStatus })
    changeDishStatus(user.id, branch.id, dishId, !currentStatus)
  }
  const handleDeleteDish = () => {
    //Notification to confirm
    toast(t => {
      return <div>
        <p>Estas seguro? <i class="material-icons" onClick={() => toast.dismiss(t.id)}>cancel</i></p>
        <button>Delete</button>
      </div>
    })
  }

  //Show the Loading
  if (currentDishes.length === 0 || Object.keys(dishesStatus).length === 0) return <Loader />

  return <>
    {!!franch &&
      <div className='menuList__header'>
        <h1 className='menuList__header__title'>{branch.name}</h1>
        <button className='menuList__header__button'>Settings</button>
      </div>}
    <Card title='Menu'>
      <div className="menuList">
        {currentDishes.map(dish =>
          <details key={dish.id} className='menuList__dish'>
            <summary className='menuList__dish__info'>
              <span className='menuList__dish__name'>{dish.name}</span>
              <div className="menuList__dish__options">
                <Switch
                  onChange={() => handleSwitchDishStatus(dish.id)}
                  checked={dishesStatus[dish.id]}
                  onColor="#ff3229"
                  onHandleColor="#ff3229"
                  handleDiameter={20}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 4px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={15}
                  width={32}
                  className="react-switch"
                  id={dish.id}
                />
                <ModalView action={'Edit'} dish={dish} branch={branch} />
                <i className="menuList__dish__close material-icons" onClick={handleDeleteDish}>close</i>
              </div>

            </summary>
            <div className='menuList__dish__desc'>
              <img className='menuList__dish__desc__img' src={dish.image} alt='img' />
              <div className='menuList__dish__desc__section'>
                <p className='menuList__dish__desc__text'><span>Price:</span> ${dish.price}</p>
                <p className='menuList__dish__desc__text'><span> Category:</span> {dish.category}</p>
                <p className='menuList__dish__desc__text'><span>Calories: </span>{dish.calories.min} - {dish.calories.max}</p>
                <h4 className='menuList__dish__desc__subtitle'><span>Ingredients</span>s</h4>
                <p className="menuList__dish__desc__ingredients">{dish.ingredients}</p>
              </div>
            </div>
          </details>)}

        <ModalView action={"Add Dish"} branch={branch} />
      </div>
    </Card>
  </>
}

export default Menu
