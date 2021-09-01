//libraries
import { createContext, useReducer } from 'react'
import toast from 'react-hot-toast'
//personal
import TYPES from '../types'
import { UserReducer, initialState } from './UserReducer'
import useMenu from './useMenu'
//utility
import { notifyError, pipe } from '../../helpers/helpers'
import { GETBranches, GETUser } from './fetchMethods'
import { createBranchesInfo, createGeneralBranch } from './branchFunctions'


const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState)

  // Account functions
  /**
   * Get the user and the branches
   * @param {Number} id Id of the user
   * @returns {void}
   */
  const logIn = async id => {

    let user
    let branches

    try {
      user = await GETUser(id)
      branches = await GETBranches(id)
    }
    catch (err) {
      notifyError(err)
      dispatch({ type: TYPES.USER.LOGOUT })
      return false
    }

    dispatch({ type: TYPES.USER.LOGIN, payload: user })
    dispatch({ type: TYPES.USER.BRANCHES, payload: pipe(createGeneralBranch, createBranchesInfo)(branches) })
    dispatch({ type: TYPES.USER.FRANCHISE, payload: branches.length > 1 })

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
    newBranches = newBranches.filter(br => br.id !== 9999)

    dispatch({ type: TYPES.USER.BRANCHES, payload: pipe(createGeneralBranch, createBranchesInfo)(newBranches) })
  }

  // Get all the Menu functionality
  const { dishes, switchDishStatus, updateDishInfo, deleteDish, addDish }
    = useMenu(state.branches, updateBranchInfo, state.user)

  return <UserContext.Provider value={{
    user: state.user,
    branches: state.branches,
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
