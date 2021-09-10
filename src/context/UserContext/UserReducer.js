import TYPES from '../types'


export const initialState = {
  user: null,
  branches: null,
  franchise: false,
  categories: null
}

export const UserReducer = (state, action) => {
  const { payload, type } = action
  switch (type) {
    case (TYPES.USER.LOGIN): return {
      ...state,
      user: { ...payload }
    }
    case (TYPES.USER.LOGOUT): return {
      ...initialState
    }
    case (TYPES.USER.BRANCHES): return {
      ...state,
      branches: [...payload]
    }
    case (TYPES.USER.FRANCHISE): return {
      ...state,
      franchise: payload
    }
    case (TYPES.MENU.CREATE.CATEGORIES): return {
      ...state,
      categories: [...payload]
    }
    default: return state
  }
}
