import { API } from '../config'
import queryString from 'query-string'

export const getProducts = async (sortBy) => {
  try {
    const res = await fetch(`${API}/products?sortBy=${sortBy}&orderBy=desc&limitBy=6`, {
      method: 'GET'
    })
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export const getCategories = async () => {
  try {
    const res = await fetch(`${API}/categories`, {
      method: 'GET'
    })
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export const getRelatedProducts = async (productId) => {
  try {
    const res = await fetch(`${API}/products/related/${productId}`, {
      method: 'GET'
    })
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export const getFilteredResults = async (skipBy, limitBy, filters = {}) => {
  const data = {
    skipBy, limitBy, filters
  }
  try {
    const success = await fetch(`${API}/products/by/search`, {
      method: 'POST',
      headers: {
        Accept: 'application/json;',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return await success.json()
  } catch (error) {
    console.log(error)
    return error.json()
  }
}

export const list = async params => {
  const query = queryString.stringify(params)
  console.log('query', query)
  try {
    const res = await fetch(`${API}/products/search?${query}`, {
      method: 'GET'
    })
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export const getOneProduct = async (productId) => {
  try {
    const res = await fetch(`${API}/product/${productId}`, {
      method: 'GET'
    })
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}
