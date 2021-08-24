import { createContext, useReducer } from 'react'
import toast from 'react-hot-toast'
import TYPES from '../types'
import { pipe, prevMonth } from '../../helpers/helpers'
import { UserReducer, initialState } from './UserReducer'


const UserContext = createContext()

export const UserContextProvider = ({ children }) => {

  const API_URL = process.env.REACT_APP_MOCKAPI
  const [state, dispatch] = useReducer(UserReducer, initialState)

  // GET methods
  const getUser = id => {
    return new Promise((result, rej) => {
      fetch(`${API_URL}/user/${id}`)
        .then(async res => {
          if (res.ok) {
            const user = await res.json()

            //Save the token (Random for test porpuses)
            localStorage.setItem('session', Date.now())

            result(user)
          } else rej('User not found')
        })
    })
  }
  const getBranches = id => {
    return new Promise((result, rej) => {
      fetch(`${API_URL}/user/${id}/branches`)
        .then(async res => {
          const branches = await res.json()

          if (branches.length !== 0) {
            //Delete the branches without dishes (Bug from mockApi)
            let utilBranches = branches.filter(branch => branch.dishes.length > 0)

            result(utilBranches)
          } else rej('Fail to load branches')

        })
    })
  }

  // Account functions
  const logIn = async id => {

    let user
    let branches

    try {
      user = await getUser(id)
      branches = await getBranches(id)
    }
    catch (err) {
      toast.error(`Sorry, ${err}`,
        { duration: 1500, iconTheme: { primary: '#ff3229' } }
      )
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

  //Functions for the branches creation
  const createGeneralBranch = branches => {
    if (branches.length > 1) {
      let generalBranch = { name: 'General' }
      generalBranch.lastsells =
        branches
          .map(a => a.lastsells)
          .reduce((a, b) =>
            a.map((num, idx) => b[idx] ? num + b[idx] : num))
      generalBranch.dishes =
        branches
          .map(a => a.dishes)
          .reduce((a, b) => a.concat(b))
          .filter((elem, index, arr) => {
            let names = arr.map(a => a.name)
            if (!names.includes(elem.name, index + 1)) return elem
            else {
              let indexPos = names.indexOf(elem.name, index + 1)
              arr[indexPos].sold = elem.sold + arr[indexPos].sold
              return null
            }
          })
      generalBranch.id = 9999
      branches.unshift(generalBranch)
      return branches
    } else return branches
  }
  const createBranchesInfo = branchesMap => {
    let branches = [...branchesMap]
    branches.map(branch => {
      const today = new Date()
      today.setDate(1)

      branch.bestDishes = branch.dishes.sort((a, b) => b.sold - a.sold).slice(0, 4)

      branch.bestMonth = { 'sells': [...branch.lastsells.slice(0, today.getMonth() + 1)].sort((a, b) => b - a)[0] }
      branch.bestMonth.index = branch.lastsells.indexOf(branch.bestMonth.sells)
      branch.bestMonth.month = prevMonth(0, today.setMonth(today.getMonth() - branch.bestMonth.index)).toString()

      branch.allSells = branch.lastsells.slice(0, new Date().getMonth() + 1).reduce((a, b) => a + b)
      return branch
    })
    return branches
  }

  return <UserContext.Provider value={{
    user: { ...state.user },
    branches: state.branches,
    logIn,
    logOut,
    isAuth,
    isFranchise: state.franchise
  }}>
    {children}
  </UserContext.Provider>
}

export default UserContext
