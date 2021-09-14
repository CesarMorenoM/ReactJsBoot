//libraries
import { createContext, useReducer } from 'react'
import toast from 'react-hot-toast'
//personal
import TYPES from '../types'
import { UserReducer, initialState } from './UserReducer'
import useMenu from './useMenu'
//utility
import { notifyError } from '../../helpers/helpers'
import { GETBestDishes, GETBranches, GETCategories, GETDishes, GETRestaurant, GETRestaurantCategories, GETUser } from './fetchMethods'


const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState)

  // Account functions
  /**
   * Get the user and the branches
   * @param {Number} id Id of the user
   * @returns {void}
   */
  const logIn = async ({ email, password }) => {
    let branches = []
    let user
    let categories
    let resCategories

    let id
    let token

    try {
      //Get the info of the user
      const userInfo = await GETUser(email, password)
      const { restaurant } = userInfo
      token = userInfo.token
      id = restaurant.id

      //Save token in local storage
      localStorage.setItem('session', token)
    } catch (err) {
      notifyError(err)
      dispatch({ type: TYPES.USER.LOGOUT })
      return false
    }

    try {
      //Get all the categories
      categories = await GETCategories()
      resCategories = await GETRestaurantCategories()
    }
    catch (err) {
      notifyError(err)
      dispatch({ type: TYPES.USER.LOGOUT })
      return false
    }

    try {
      //Get all the info of the restaurant
      const restaurantInfo = await GETRestaurant(id, token)
      restaurantInfo.dishes = await GETDishes(id, token)
      restaurantInfo.bestDishes = await GETBestDishes(id, token)
      restaurantInfo.id = id
      restaurantInfo.isMain = true
      user = restaurantInfo.user

      //Get all the info of the branches 
      const subBranches = await GETBranches(id, token)
      subBranches.forEach(async branch => {
        branch.dishes = await GETDishes(branch.id, token)
        branch.bestDishes = await GETBestDishes(id, token)
        branch.isMain = false
      })

      //Unify the restaurants and the branches 
      branches = [restaurantInfo].concat(subBranches)
    } catch (err) {
      notifyError(err)
      dispatch({ type: TYPES.USER.LOGOUT })
      return false
    }

    dispatch({ type: TYPES.USER.LOGIN, payload: user })
    dispatch({ type: TYPES.USER.BRANCHES, payload: branches })
    dispatch({ type: TYPES.USER.FRANCHISE, payload: branches.length > 1 })
    dispatch({ type: TYPES.USER.CATEGORIES.DISH_C, payload: categories })
    dispatch({ type: TYPES.USER.CATEGORIES.RESTAURANT_C, payload: resCategories })


    toast('Welcome again!', { icon: '👋', duration: 1000 })
    return true
  }
  const logOut = () => {
    toast('Good Bye!', { icon: '👏', duration: 1000 })
    localStorage.clear()
    dispatch({ type: TYPES.USER.LOGOUT })
  }
  const isAuth = () => {
    return (state.user && localStorage.getItem('session'))
  }

  /**
   * A function to determine what are the branches when it is not a franchise
   * @returns {object} The only branch
   */
  const noFranchise = () => state.branches[0]

  /**
   * Update the info of one branch, update all branches
   * @param {Number} branch Id of the branch
   * @param {Object} data Object with the data to edit
   */
  const updateBranchInfo = (branch, data) => {
    let newBranches = state.branches.map(obj =>
      obj.id === branch
        ? { ...obj, ...data }
        : obj)

    dispatch({ type: TYPES.USER.BRANCHES, payload: newBranches })
  }

  // Get all the Menu functionality
  const { dishes, switchDishStatus, updateDishInfo, deleteDish, addDish }
    = useMenu(state.branches, updateBranchInfo, state.user)

  return <UserContext.Provider value={{
    user: state.user,
    branches: state.branches,
    categories: state.categories,
    resCategories: state.resCategories,
    logIn,
    logOut,
    isAuth,
    isFranchise: state.franchise,
    dishes, switchDishStatus, updateDishInfo, deleteDish, addDish, noFranchise
  }}>
    {children}
  </UserContext.Provider>
}

export default UserContext
