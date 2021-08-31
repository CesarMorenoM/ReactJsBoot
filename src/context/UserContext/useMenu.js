import { useEffect } from "react"
import { useReducer } from "react"
import toast from "react-hot-toast"
import { notifyError, toText } from "../../helpers/helpers"
import TYPES from "../types"
import { DELETEDish, POSTDish, PUTDishInfo, PUTDishStatus } from "./fetchMethods"

const useMenu = (branches, updateBranchInfo, user) => {
  // Dishes copy and reducer utilities
  const initialState = {
    dishes: undefined
  }
  const MenuReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
      case (TYPES.MENU.CREATE.DISHESCOPY): return {
        ...state,
        dishes: payload
      }
      case (TYPES.MENU.UPDATE.DISHSTATUS): return {
        ...state,
        dishes: {
          ...state.dishes,
          [payload.branch]: {
            ...state.dishes[payload.branch],
            [payload.dish]: {
              ...state.dishes[payload.branch][payload.dish],
              status: payload.status
            }
          }
        }
      }
      default: return state
    }
  }

  // Generate the initial state
  const [state, dispatch] = useReducer(MenuReducer, initialState)

  // Update the dish copy everytime the branches/dishes change
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

  // Misc
  const noFranchise = () => branches[0]

  // Handlers for actions with dishes
  const addDish = async (branch, crudeData) => {
    let data = {
      ...crudeData,
      ingredients: toText(crudeData.ingredients)
    }
    let newData

    try {
      newData = await POSTDish(user.id, branch, data)

    } catch (err) {
      notifyError(err)
      return false
    }
    const newDishes = { ...state.dishes, [branch]: { ...state.dishes[branch], [newData.id]: newData } }
    const newInfo = { dishes: Object.values(newDishes[branch]) }

    updateBranchInfo(branch, newInfo)

    toast('Dish Added!', { icon: '👍', duration: 500 })
    return true
  }

  const deleteDish = (branch, dishId) => {
    let data = { ...state.dishes[branch] }
    let deleted = data[dishId]
    delete data[dishId]

    const deleteItem = async (t) => {
      try {
        await DELETEDish(user.id, branch, dishId)
      } catch (err) {
        notifyError(err)
      }
      const newDishes = { ...state.dishes, [branch]: { ...data } }
      const newInfo = { dishes: Object.values(newDishes[branch]) }

      updateBranchInfo(branch, newInfo)
      toast.dismiss(t.id)
    }

    //Delete confirmation
    toast(t => {
      return <div>
        <p>Delete {deleted.name}?</p>
        <button className='notification__button invert' onClick={() => toast.dismiss(t.id)}>Cancel</button>
        <button className='notification__button' onClick={() => deleteItem(t)}>Delete</button>
      </div>
    }, { icon: '⚠️' })
  }

  const updateDishInfo = async (dish, branch, crudeData) => {
    //Convert the ingredients in array to save
    const data = {
      ...crudeData,
      ingredients: toText(crudeData.ingredients)
    }
    let newData

    try {
      newData = await PUTDishInfo(user.id, branch, dish, data)
    } catch (err) {
      notifyError(err)
      return false
    }

    //Create the new info to update the branches
    const newDishes = { ...state.dishes, [branch]: { ...state.dishes[branch], [dish]: newData } }
    const newInfo = { dishes: Object.values(newDishes[branch]) }

    updateBranchInfo(branch, newInfo)

    //Confirm the update
    toast('Updated!', { icon: '👍', duration: 500 })
    return true
  }

  //Manage the switch apart to not being updating all dishes and branches just because a switch
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


  return {
    dishes: { ...state.dishes },
    switchDishStatus,
    updateDishInfo,
    deleteDish,
    addDish,
    noFranchise
  }
}

export default useMenu
