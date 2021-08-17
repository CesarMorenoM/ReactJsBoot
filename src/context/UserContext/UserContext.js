import { createContext, useReducer } from 'react'
import toast from 'react-hot-toast'
import TYPES from '../types'
import { compose, prevMonth } from '../../helpers/helpers'
import { UserReducer, initialState } from './UserReducer'

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(UserReducer, initialState)

  const getUser = id => {
    return new Promise((result, rej) => {
      fetch('https://610d6bcd48beae001747b83c.mockapi.io/user/' + id)
        .then(res => res.json())
        .then(user => {
          //Here we save the token (random for the moment)
          localStorage.setItem('session', Date.now())

          //Create the information of the user
          let userNew = {
            name: user.name,
            id: user.id,
            avatar: user.avatar,
          }
          //Create the response
          result({
            user: userNew,
            branches: user.branches
          })
        })
    })
  }

  const logIn = async id => {
    try {
      const { user, branches } = await getUser(id)
      dispatch({ type: TYPES.LOGIN, payload: user })
      dispatch({ type: TYPES.BRANCHES, payload: compose(createGeneralBranch, createBranchesInfo)(branches) })

    } catch (err) {
      toast.error("Sorry, user not found", { duration: 1500, iconTheme: { primary: '#ff3229' } })
      dispatch({ type: TYPES.LOGOUT })

    }
  }

  const logOut = () => {
    toast('Good Bye!', { icon: '👏', duration: 1000 })
    localStorage.clear()
    dispatch({ type: TYPES.LOGOUT })
  }

  const isAuth = () => (state.user && localStorage.getItem('session'))


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
    auth: state.auth,
    logIn,
    logOut,
    isAuth
  }}>
    {children}
  </UserContext.Provider>
}

export default UserContext
