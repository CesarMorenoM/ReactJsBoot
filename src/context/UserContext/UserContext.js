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

  // Update the info of one branch
  const updateBranchInfo = (branch, data) => {
    let newBranches = state.branches.map(obj =>
      obj.id === branch
        ? { ...obj, ...data }
        : obj)
    newBranches = newBranches.filter(br => br.id !== 9999)

    dispatch({ type: TYPES.USER.BRANCHES, payload: pipe(createGeneralBranch, createBranchesInfo)(newBranches) })
  }

  // Get all the Menu functionality
  const { dishes, switchDishStatus, updateDishInfo, deleteDish, addDish, noFranchise }
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
