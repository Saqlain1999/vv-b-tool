import { API } from '../config'
import queryString from 'query-string'


export const getProducts = (sortBy) => {
  return fetch(`${API}/products?sortBy=${sortBy}&orderBy=desc&limitBy=6`, {
    method: 'GET'
  })
    .then(res => {
      return res.json()
    })
    .catch(err => {
      console.log(err)
    })
}

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: 'GET'
  })
    .then(res => {
      return res.json()
    })
    .catch(err => {
      console.log(err)
    })
}

export const getFilteredResults = (skipBy, limitBy, filters = {}) => {
  const data = {
    skipBy, limitBy, filters
  }
  return fetch(`${API}/products/by/search`, {
    method: 'POST',
    headers: {
      Accept: 'application/json;',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(success => {
      return success.json()
    })
    .catch(error => {
      console.log(error)
      return error.json()
    })
}

export const list = params => {
  const query = queryString.stringify(params)
  console.log('query', query)
  return fetch(`${API}/products/search?${query}`, {
    method: 'GET'
  })
    .then(res => {
      return res.json()
    })
    .catch(err => {
      console.log(err)
    })
}

export const getOneProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: 'GET'
  })
    .then(res => {
      return res.json()
    })
    .catch(err => {
      console.log(err)
    })
}