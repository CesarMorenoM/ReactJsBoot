//libaries
import { useEffect, useReducer } from "react"
import toast from "react-hot-toast"
//utility
import { DELETEDish, POSTDish, PUTDishInfo, PUTDishStatus } from "./fetchMethods"
import { notifyError } from "../../helpers/helpers"
import TYPES from "../types"

/**
 * Get all the functinality of the menu
 * @param {Array} branches The current branches 
 * @param {Function} updateBranchInfo The function to update the branches
 * @param {Object} user The current user
 * @returns 
 */
const useMenu = (branches, updateBranchInfo, user) => {
  // Dishes copy 
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
              isActive: payload.status
            }
          }
        }
      }
      default: return state
    }
  }

  // Generate the initial state
  const [state, dispatch] = useReducer(MenuReducer, { dishes: undefined })

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

  // Handlers for actions with dishes
  /**
   * Add a new dish, update the branches and the database
   * @param {Number} branch Id of the branch
   * @param {Object} crudeData Object with the data of the dish
   * @returns Boolean
   */
  const addDish = async (branch, data) => {
    let id

    try {
      id = await POSTDish(data, branch)

    } catch (err) {
      notifyError(err)
      return false
    }
    const newDishes = { ...state.dishes, [branch]: { ...state.dishes[branch], [id]: { ...data, id: id, isActive: true } } }
    const newInfo = { dishes: Object.values(newDishes[branch]) }

    updateBranchInfo(branch, newInfo)

    toast('Dish Added!', { icon: '👍', duration: 500 })
    return true
  }

  /**
   * Delete an specific dish, delete it from branches and from the database
   * @param {Number} branch Id of the branch
   * @param {Number} dishId Id of the dish
   */
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
      //Create the new info to update the branches
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

  /**
   * Update the info of a dish, in branhces and in the database
   * @param {Number} dish Id of the dish
   * @param {Number} branch Id of the branch
   * @param {Object} crudeData Object with the new dish info
   * @returns 
   */
  const updateDishInfo = async (dish, branch, data) => {
    //Convert the ingredients in array to save

    try {
      await PUTDishInfo(dish, data, branch)
    } catch (err) {
      notifyError(err)
      return false
    }

    //Create the new info to update the branches
    const newDishes = { ...state.dishes, [branch]: { ...state.dishes[branch], [dish]: { ...state.dishes[branch][dish], ...data } } }
    const newInfo = { dishes: Object.values(newDishes[branch]) }

    updateBranchInfo(branch, newInfo)

    //Confirm the update
    toast('Updated!', { icon: '👍', duration: 500 })
    return true
  }

  /**
   * Change the state of a dish, in database and in the copy of dishes
   * @param {Number} dish Id of the dish
   * @param {Number} branch Id of the branch
   *///Manage the switch apart to not being updating all dishes and branches just because a switch
  const switchDishStatus = async (dish, branch) => {

    const status = !(!!state.dishes[branch][dish].isActive)
    try {
      await PUTDishStatus(dish, branch)
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
    addDish
  }
}

export default useMenu
