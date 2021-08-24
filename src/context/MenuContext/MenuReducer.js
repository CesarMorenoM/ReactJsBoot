import TYPES from "../types";

export const initialState = {
  dishes: undefined,
  dishesStatus: undefined
}

export const MenuReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case (TYPES.MENU.CREATE.DISHESCOPY): return {
      ...state,
      dishes: payload
    }
    case (TYPES.MENU.CREATE.DISHSTATUSLIST): return {
      ...state,
      dishesStatus: payload
    }
    case (TYPES.MENU.UPDATE.DISHSTATUS): return {
      ...state,
      dishesStatus: {
        ...state.dishesStatus,
        [payload.branch]: {
          ...state.dishesStatus[payload.branch],
          [payload.dish]: payload.status
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
    default: return state
  }
}