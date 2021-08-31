const API_URL = process.env.REACT_APP_MOCKAPI

// User methods
export const GETUser = id => {
  return new Promise((result, rej) => {
    fetch(`${API_URL}/user/${id}`)
      .then(async res => {
        if (res.ok) {
          const user = await res.json()

          //Save the token (Random for test porpuses)
          localStorage.setItem('session', Date.now())

          result(user)
        } else rej('User not found')
      })
  })
}
export const GETBranches = id => {
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

// Dishes methods
export const PUTDishStatus = (userId, branchId, dishId, currentStatus) => {
  return new Promise((res, rej) => {
    fetch(`${API_URL}/user/${userId}/branches/${branchId}/dishes/${dishId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: currentStatus
      })
    })
      .then(async response => {
        if (response.ok) {
          const dishStatus = await response.json()
          res(dishStatus)
        } else rej('Fail to switch this dish')
      })
  })
}
export const PUTDishInfo = (userId, branchId, dishId, data) => {
  return new Promise((res, rej) => {
    fetch(`${API_URL}/user/${userId}/branches/${branchId}/dishes/${dishId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        image: data.image,
        price: data.price,
        category: data.category,
        protein: data.protein,
        fats: data.fats,
        sugars: data.sugars,
        calories: {
          min: data.calories.min,
          max: data.calories.max
        },
        ingredients: data.ingredients
      })
    })
      .then(async response => {
        if (response.ok) {
          const updatedDish = await response.json()
          res(updatedDish)
        } else rej('Failed to update the dish')
      })
  })
}
export const POSTDish = (userId, branchId, data) => {
  return new Promise((res, rej) => {
    fetch(`${API_URL}/user/${userId}/branches/${branchId}/dishes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        image: data.image || '',
        price: data.price,
        category: data.category,
        protein: data.protein || '',
        fats: data.fats || '',
        sugars: data.sugars || '',
        calories: {
          min: data.calories.min || '',
          max: data.calories.max || ''
        },
        ingredients: data.ingredients || '',
        status: true
      })
    })
      .then(async response => {
        if (response.ok) {
          const dish = await response.json()
          res(dish)
        } else rej(`Can't add this dish`)
      })
  })
}
export const DELETEDish = (userId, branchId, dishId) => {
  return new Promise((res, rej) => {
    fetch(`${API_URL}/user/${userId}/branches/${branchId}/dishes/${dishId}`, {
      method: 'DELETE'
    })
      .then(async response => {
        if (response.ok) {
          const dish = await response.json()
          res(dish)
        } else rej(`Can't delete this dish`)
      })
  })
}