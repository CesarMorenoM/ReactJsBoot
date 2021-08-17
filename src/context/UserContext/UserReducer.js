import TYPES from '../types'


export const initialState = {
  user: null,
  branches: null
}

export const UserReducer = (state, action) => {
  const { payload, type } = action
  switch (type) {
    case (TYPES.LOGIN): return {
      ...state,
      user: { ...payload },
    }
    case (TYPES.LOGOUT): return {
      ...initialState
    }
    case (TYPES.BRANCHES): return {
      ...state,
      branches: [...payload]
    }
    default: return state
  }
}
