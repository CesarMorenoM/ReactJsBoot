const API_URL = process.env.REACT_APP_API

/**
 * A function to create basic fetch petitions
 * @param {String} url The url where whe wanna do the petition
 * @param {String} name The name of the petition (to the error)
 * @param {object} [config] Custom configuration to our petition
 * @returns A promise (The json of the response | custom error msj)
 */
const fetchPetition = (url, name, config) => {
  const token = localStorage.getItem('session')
  const auth = { 'Authorization': `bearer ${token}` }

  if (config) config = {
    ...config,
    headers: { ...auth, ...config.headers }
  }
  else if (config === null) config = {}
  else config = { headers: auth }

  return new Promise((result, rej) => {
    fetch(`${API_URL}${url}`, config)
      .then(async response => {
        if (response.ok) {
          const res = await response.json()
          result(res)
        } else rej(`Fail the petition of the ${name}`)
      })
  })
}

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