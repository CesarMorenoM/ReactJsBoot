import TYPES from "../types";

export const initialState = {
  dishes: undefined
}

export const MenuReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case (TYPES.MENU.CREATE.DISHESCOPY): return {
      ...state,
      dishes: payload
    }
    case (TYPES.MENU.CREATE.DISH): return {
      ...state,
      dishes: {
        ...state.dishes,
        [payload.branch]: {
          ...state.dishes[payload.branch],
          [payload.dish]: {
            ...payload.data,
            status: true
          }
        }
      }
    }
    case (TYPES.MENU.UPDATE.DISHSTATUS): return {
      ...state,
      dishes: {
        ...state.dishes,
        [payload.branch]: {
          ...state.dishes[payload.branch],
          [payload.dish]: {
            ...state.dishes[payload.branch][payload.dish],
            status: payload.status
          }
        }
      }
    }
    case (TYPES.MENU.UPDATE.DISHINFO): return {
      ...state,
      dishes: {
        ...state.dishes,
        [payload.branch]: {
          ...state.dishes[payload.branch],
          [payload.dish]: {
            ...payload.current, ...payload.data
          }
        }
      }
    }
    case (TYPES.MENU.DELETE.DISH): return {
      ...state,
      dishes: {
        ...state.dishes,
        [payload.branch]: {
          ...payload.data
        }
      }
    }
    default: return state
  }
}