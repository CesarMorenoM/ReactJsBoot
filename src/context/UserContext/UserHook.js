import { useReducer } from "react"
import types from "../types"

const UserHook = () => {

  const initialState = {
    user: null,
    branches: []
  }

  const UserReducer = ({ state, action }) => {
    switch (state) {
      case (types.GETUSER): {
        return
      }

      default: return state
    }
  }

  const [state, dispatch] = useReducer(UserReducer, initialState)

  const getUser = (id) => {
    fetch('https://610d6bcd48beae001747b83c.mockapi.io/user/1')
      .then(res => res.json())
      .then(data => {
        return {
          name: data.name,
          id: data.id,
          avatar: data.avatar,
          token: data.token
        }
      })
  }
  return { getUser }
}

export default UserHook
