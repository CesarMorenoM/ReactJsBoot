import { createContext, useState } from 'react'

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({ name: 'Santiago', branches: [{ name: 1 }] })
  const userInfo = user.name
  const branches = user.branches

  return <UserContext.Provider value={{ user: userInfo, branches }}>
    {children}
  </UserContext.Provider>
}

export default UserContext
