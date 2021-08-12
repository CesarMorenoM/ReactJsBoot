import { createContext, useState, useEffect } from 'react'
import prevMonth from '../../helpers/prevMonth'

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [branches, setBranches] = useState()

  //! Fetch the data from API
  useEffect(() => {
    if (localStorage.getItem('user') && localStorage.getItem('branches')) {
      setUser(JSON.parse(localStorage.getItem('user')))
      setBranches([...JSON.parse(localStorage.getItem('branches'))])
    } else {
      fetch('https://610d6bcd48beae001747b83c.mockapi.io/user/1')
        .then(res => {
          //localStorage.setItem('f', parseInt(localStorage.getItem('f')) + 1)
          debugger
          return res.json()
        })
        .then(user => {
          let totalBranches = user.branches
          // Create the General view of all branches
          if (totalBranches.length > 1) {
            let generalBranch = { name: 'General' }
            generalBranch.lastsells =
              user.branches
                .map(a => a.lastsells)
                .reduce((a, b) =>
                  a.map((num, idx) => b[idx] ? num + b[idx] : num))
            generalBranch.dishes =
              user.branches
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
            totalBranches.unshift(generalBranch)
          }
          let userT = {
            name: user.name,
            id: user.id,
            avatar: user.avatar
          }
          // Set initial values
          setUser(userT)
          localStorage.setItem('user', JSON.stringify(userT))
          setBranches(totalBranches)
          localStorage.setItem('branches', JSON.stringify(totalBranches))
        })
    }
  }, [])

  //! Edit the branches with selected info
  useEffect(() => {
    if (!branches) return
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
  }, [branches])

  return <UserContext.Provider value={{ user: { ...user }, branches }}>
    {children}
  </UserContext.Provider>
}

export default UserContext
