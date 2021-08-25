import { createContext, useContext, useEffect, useReducer } from "react"
import toast from "react-hot-toast"
import { notifyError, toArray } from "../../helpers/helpers"
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

      branches.forEach(branch => {
        let dishesInfo = {}
        branch.dishes.forEach(dish => dishesInfo = { ...dishesInfo, [dish.id]: dish })
        dishesList = { ...dishesList, [branch.id]: dishesInfo }
      })

      dispatch({ type: TYPES.MENU.CREATE.DISHESCOPY, payload: { ...dishesList } })
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
  const POSTDish = (userId, branchId, data) => {
    return new Promise((res, rej) => {
      fetch(`${API_URL}/user/${userId}/branches/${branchId}/dishes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          image: data.image || '',
          price: data.price,
          category: data.category,
          protein: data.protein || '',
          fats: data.fats || '',
          sugars: data.sugars || '',
          calories: {
            min: data.calories.min || '',
            max: data.calories.max || ''
          },
          ingredients: data.ingredients || '',
          status: true
        })
      })
        .then(async response => {
          if (response.ok) {
            const dish = await response.json()
            res(dish)
          } else rej(`Can't add this dish`)
        })
    })
  }
  const DELETEDish = (userId, branchId, dishId) => {
    return new Promise((res, rej) => {
      fetch(`${API_URL}/user/${userId}/branches/${branchId}/dishes/${dishId}`, {
        method: 'DELETE'
      })
        .then(async response => {
          if (response.ok) {
            const dish = await response.json()
            res(dish)
          } else rej(`Can't delete this dish`)
        })
    })
  }

  //Misc
  const noFranchise = () => branches[0]

  //Handlers for actions with dishes
  const switchDishStatus = async (dish, branch) => {

    const status = !(!!state.dishes[branch][dish].status)

    try {
      await PUTDishStatus(user.id, branch, dish, status)
    } catch (err) {
      notifyError(err)
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
      notifyError(err)
      return false
    }
    toast('Updated!', { icon: '👍', duration: 500 })
    dispatch({ type: TYPES.MENU.UPDATE.DISHINFO, payload: { branch, dish, current, data } })
    return true
  }
  const deleteDish = (branch, dishId) => {
    const data = state.dishes[branch]
    const deleted = data[dishId]
    delete data[dishId]


    const deleteItem = async (t) => {
      try {
        await DELETEDish(user.id, branch, dishId)
      } catch (err) {
        notifyError(err)
      }
      dispatch({ type: TYPES.MENU.DELETE.DISH, payload: { branch, data } })
      toast.dismiss(t.id)
    }
    //Delete confirmation
    toast(t => {
      return <div>
        <p>Delete {deleted.name}?</p>
        <button onClick={() => toast.dismiss(t.id)}>Cancel</button>
        <button onClick={() => deleteItem(t)}>Delete</button>
      </div>
    }, { icon: '⚠️' })
  }
  const addDish = async (branch, crudeData) => {
    let data = {
      ...crudeData,
      ingredients: toArray(crudeData.ingredients)
    }
    let newData

    try {
      newData = await POSTDish(user.id, branch, data)
      data = {
        ...data,
        id: newData.id
      }

    } catch (err) {
      notifyError(err)
      return false
    }

    dispatch({ type: TYPES.MENU.CREATE.DISH, payload: { branch, dish: newData.id, data } })
    console.log(newData.id)
    toast('Dish Added!', { icon: '👍', duration: 500 })
    return true
  }

  return <MenuContext.Provider value={{
    dishes: { ...state.dishes },
    dishesStatus: { ...state.dishesStatus },
    switchDishStatus,
    updateDishInfo,
    deleteDish,
    addDish,
    noFranchise
  }}>
    {children}
  </MenuContext.Provider>
}

export default MenuContext
