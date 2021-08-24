import { createContext, useContext, useEffect, useReducer } from "react"
import toast from "react-hot-toast"
import { toArray } from "../../helpers/helpers"
import TYPES from "../types"
import UserContext from "../UserContext/UserContext"
import { initialState, MenuReducer } from "./MenuReducer"

const MenuContext = createContext()

export const MenuContextProvider = ({ children }) => {

  const API_URL = process.env.REACT_APP_MOCKAPI
  const { user, branches } = useContext(UserContext)

  const [state, dispatch] = useReducer(MenuReducer, initialState)

  //Create initial states
  useEffect(() => {
    if (branches) {
      let dishesList = {}
      let initialStatuses = {}

      branches.forEach(branch => {
        let dishesInfo = {}
        branch.dishes.forEach(dish => dishesInfo = { ...dishesInfo, [dish.id]: dish })
        dishesList = { ...dishesList, [branch.id]: dishesInfo }
      })

      branches.forEach(branch => {
        let dishesStatus = {}
        branch.dishes.forEach(dish => dishesStatus = { ...dishesStatus, [dish.id]: dish.status })
        initialStatuses = { ...initialStatuses, [branch.id]: { ...dishesStatus } }
      })

      dispatch({ type: TYPES.MENU.CREATE.DISHESCOPY, payload: { ...dishesList } })
      dispatch({ type: TYPES.MENU.CREATE.DISHSTATUSLIST, payload: { ...initialStatuses } })
    }

  }, [branches])

  //PUT Methods
  const PUTDishStatus = (userId, branchId, dishId, currentStatus) => {
    return new Promise((res, rej) => {
      fetch(`${API_URL}/user/${userId}/branches/${branchId}/dishes/${dishId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: currentStatus
        })
      })
        .then(async response => {
          if (response.ok) {
            const dishStatus = await response.json()
            res(dishStatus)
          } else rej('Fail to switch this dish')
        })
    })
  }
  const PUTDishInfo = (userId, branchId, dishId, data) => {
    return new Promise((res, rej) => {
      fetch(`${API_URL}/user/${userId}/branches/${branchId}/dishes/${dishId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          image: data.image,
          price: data.price,
          category: data.category,
          protein: data.protein,
          fats: data.fats,
          sugars: data.sugars,
          calories: {
            min: data.calories.min,
            max: data.calories.max
          },
          ingredients: data.ingredients
        })
      })
        .then(async response => {
          if (response.ok) {
            const updatedDish = await response.json()
            res(updatedDish)
          } else rej('Failed to update the dish')
        })
    })
  }

  //Misc
  const noFranchise = () => branches[0]

  //Handlers for actions with dishes
  const switchDishStatus = async (dish, branch) => {

    const status = !(!!state.dishesStatus[branch][dish])

    try {
      await PUTDishStatus(user.id, branch, dish, status)

    } catch (err) {
      toast.error(`Sorry, ${err}`,
        { duration: 1500, iconTheme: { primary: '#ff3229' } }
      )
      return false
    }

    dispatch({ type: TYPES.MENU.UPDATE.DISHSTATUS, payload: { branch, dish, status } })
    return true
  }
  const updateDishInfo = async (dish, branch, crudeData) => {
    //Convert the ingredients in array to save
    const data = {
      ...crudeData,
      ingredients: toArray(crudeData.ingredients)
    }
    const current = state.dishes[branch][dish]

    try {
      await PUTDishInfo(user.id, branch, dish, data)
    } catch (err) {
      toast.error(`Sorry, ${err}`,
        { duration: 1500, iconTheme: { primary: '#ff3229' } }
      )
      return false
    }
    toast('Updated!', { icon: '👍', duration: 500 })
    dispatch({ type: TYPES.MENU.UPDATE.DISHINFO, payload: { branch, dish, current, data } })
    return true
  }
  const deleteDish = (branch, dish) => {
    dispatch({ type: TYPES.MENU.DELETE.DISH, payload: { branch, dish } })

    toast(t => {
      return <div>
        <p>Estas seguro? <i class="material-icons" onClick={() => toast.dismiss(t.id)}>cancel</i></p>
        <button>Delete</button>
      </div>
    })
  }

  return <MenuContext.Provider value={{
    dishes: { ...state.dishes },
    dishesStatus: { ...state.dishesStatus },
    switchDishStatus,
    updateDishInfo,
    deleteDish,
    noFranchise
  }}>
    {children}
  </MenuContext.Provider>
}

export default MenuContext
