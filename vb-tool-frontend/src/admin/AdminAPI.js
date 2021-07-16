import { API } from '../config'

export const createCategoryCall = async (userId, token, category) => {
  try {
    const success = await fetch(`${API}/category/create/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json;',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(category)
    })
    console.log(success)
    return await success.json()
  } catch (err) {
    console.log(err)
    return err.json()
  }
}

export const createProductCall = async (userId, token, product) => {
  try {
    const success = await fetch(`${API}/product/create/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json;',
        Authorization: `Bearer ${token}`
      },
      body: product
    })
    console.log(success)
    return await success.json()
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
export const getProducts = async () => {
  try {
    const res = await fetch(`${API}/products?limit=undefined `, {
      method: 'GET'
    })
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export const getSingleProduct = async (productId) => {
  try {
    const res = await fetch(`${API}/product/${productId}`, {
      method: 'GET'
    })
    return await res.json()
  } catch (err) {
    return err.json()
  }
}

export const removeProduct = async (productId, userId, token) => {
  try {
    const success = await fetch(`${API}/product/${productId}/${userId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json;',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return await success.json()
  } catch (err) {
    return err.json()
  }
}
export const updateProduct = async (productId, userId, token, product) => {
  try {
    const success = await fetch(`${API}/product/${productId}/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json;',
        Authorization: `Bearer ${token}`
      },
      body: product
    })
    return await success.json()
  } catch (err) {
    return err.json()
  }
}