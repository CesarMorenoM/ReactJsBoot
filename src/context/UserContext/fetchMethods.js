const API_URL = process.env.REACT_APP_API

/**
 * A function to create basic fetch petitions
 * @param {String} url The url where whe wanna do the petition
 * @param {String} name The name of the petition (to the error)
 * @param {object} [config] Custom configuration to our petition
 * @returns A promise (The json of the response | custom error msj)
 */
const fetchPetition = (url, name, config,id) => {
  const token = localStorage.getItem('session')
  const auth = { 'Authorization': `bearer ${token}` }

  if (config) config = {
    ...config,
    headers: { ...auth, ...config.headers }
  }
  else if (config === null) config = {}
  else config = { headers: auth }

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

/**
 * POST petition to register a restaurant
 */
 export const POSTUser = userData => {
  var formdata = new FormData();
  formdata.append("Name",userData.name);
  formdata.append("Address", userData.address);
  formdata.append("LocationLatitude", "0");
  formdata.append("LocationLongitude", "0");
  formdata.append("image", "");
  formdata.append("User.FirstName", userData.firstName);
  formdata.append("User.LastName", userData.lastName);
  formdata.append("User.Email", userData.email);
  formdata.append("User.Password", userData.password);
  return new Promise((res, rej) => {
    fetch(`${API_URL}/restaurants/register`, {
      method: 'POST',
      headers: { 
      },
      body: formdata
    })
      .then(async response => {
        if (response.ok) {
          const restaurant = await response.json()
          res(restaurant)
        } else rej(`Can't add this restaurant`)
      })
  })
}

// Dishes methods
/**
 * PUT petition to change the status of an specific dish
 * @param {Number} userId Id of the user
 * @param {Number} branchId Id of the branch
 * @param {Number} dishId Id of the dish
 * @param {Boolean} currentStatus The new status of the dish
 * @returns Promise ( Updated dish | Error msj )
 */
// export const PUTDishStatus = (userId, branchId, dishId, currentStatus) => {
//   return new Promise((res, rej) => {
//     fetch(`${API_URL}/user/${userId}/branches/${branchId}/dishes/${dishId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         status: currentStatus
//       })
//     })
//     fetch(`${API_URL}${url}`, config)
//       .then(async response => {
//         if (response.ok) {
//           const res = await response.json()
//           result(res)
//         } else rej(`Fail the petition of the ${name}`)
//       })
//   })
// }

// User methods
/**
 * GET petition for an user
 * @param {Number} id Id of the user we're looking for
 * @returns A promise ( User | Error msj )
 */
export const GETUser = (email, password) => {
  return new Promise((result, rej) => {
    fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(async res => {
        if (res.ok) {
          const userInfo = await res.json()
          result(userInfo)
        } else rej('User not found')
      })
  })
}
// Categories
export const GETCategories = () => fetchPetition('/dish-categories', 'categories', null)

export const GETRestaurantCategories = () => fetchPetition('/restaurant-categories', 'restaurant categories', null)

// Restaurant info
export const GETRestaurant = (id) => fetchPetition(`/restaurants/id?id=${id}`, 'restaurant')

export const GETBranches = (id) => fetchPetition(`/branches/restaurants/id?id=${id}`, 'branches')

// Dishes info
export const GETDishes = (id) => fetchPetition(`/dishes/restaurants/${id}`, 'dishes')

export const GETBestDishes = (id) => fetchPetition(`/dashboard/bestselling-dishes/restaurants/${id}`, 'best dishes')


// Dishes methods
export const PUTDishStatus = (dishId, branchId) => {
  const bodyInfo = JSON.stringify({
    restaurantId: branchId
  })
  const config = {
    method: 'PUT',
    body: bodyInfo,
    headers: { 'Content-Type': 'application/json' }
  }

  return fetchPetition(`/dishes/${dishId}/change-status`, 'statuses of the dishes', config)
}

export const DELETEDish = (dishId, branchId) => {
  const config = {
    method: 'DELETE'
  }

  return fetchPetition('deletedishurl', 'delete of the dish', config)
}

export const PUTDishInfo = (dishId, data, branchId) => {
  const formData = new FormData()

  for (let name in data) {
    if (data[name]) {
      formData.append(name, data[name])
    }
  }
  formData.append('restaurantId', branchId)

  const config = {
    method: 'PUT',
    body: formData,
  }

  return fetchPetition(`/dishes/${dishId}`, 'dish info', config)
}

export const POSTDish = (data, branchId) => {
  const formData = new FormData()

  for (let name in data) {
    if (data[name]) {
      formData.append(name, data[name])
    }
  }

  formData.append('restaurantId', branchId)

  const config = {
    method: 'POST',
    body: formData
  }

  return fetchPetition('/dishes', 'dish', config)
}