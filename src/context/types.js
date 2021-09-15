const TYPES = {
  USER: {
    LOGIN: 'Log in and save the user',
    LOGOUT: 'Log out',
    BRANCHES: 'Save the branches info',
    FRANCHISE: 'Is the user a franchise?',
    UPDATE_BRANCHES: 'Update all the branches with specific information',
    CATEGORIES: {
      DISH_C: 'Update the categories of the dishes',
      RESTAURANT_C: 'Update the categories of the restaurants'
    }
  },
  MENU: {
    CREATE: {
      DISHESCOPY: 'Create a copy of all dishes in memory',
      DISHSTATUSLIST: 'Create a copy of the statuses of the dishes',
      DISH: 'Create a dish an add it to the database'
    },
    UPDATE: {
      DISHSTATUS: 'Update the status of a dish',
      DISHINFO: 'Update the info of a dish'
    },
    DELETE: {
      DISH: 'Delete a dish from the database'
    }
  }
}

export default TYPES
