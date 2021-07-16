import { API } from '../config'

export const register = user => {
  return fetch(`${API}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json;',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(success => {
      console.log(success)
      return success.json()
    })
    .catch(err => {
      console.log(err)
    })
}
export const login = user => {
  return fetch(`${API}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json;',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(success => {
      return success.json()
    })
    .catch(err => {
      console.log(err)
      return err.json()
    })
}

export const signOut = (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token')
    next()
    return fetch(`${API}/signout`, {
      method: 'GET'
    })
      .then(response => {
        console.log('signout', response)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', JSON.stringify(data))
    next()
  }
}
export const isAuthenticated = values => {
  if (typeof window === 'undefined') {
    return false
  }
  if (localStorage.getItem('token')) {
    return JSON.parse(localStorage.getItem('token'))
  } else {
    return false
  }
}
