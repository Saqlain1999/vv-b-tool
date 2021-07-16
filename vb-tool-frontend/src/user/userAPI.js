import { API } from '../config'

export const readUser = async (userId, token) => {
  try {
    const res = await fetch(`${API}/user/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export const updateUser = async (userId, token, userData) => {
  try {
    const res = await fetch(`${API}/user/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    })
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export const updateUserToken = (user, next) => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('token')) {
      const auth = JSON.parse(localStorage.getItem('token'))
      auth.user = user
      localStorage.setItem('token', JSON.stringify(auth))
      next()
    }
  }
}
