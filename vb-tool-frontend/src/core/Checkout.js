import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getProducts } from './CoreAPI'
import Template from './Template'
import { Search } from './Search'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'

export const Checkout = ({ products }) => {
  const getTotalAmount = () => {
    return products.reduce((c, n) => {
      return c + n.count * n.price
    }, 0)
  }
  const checkoutOptions = () => (
    isAuthenticated()
      ? (
      <button className="btn btn-success">Checkout</button>
        )
      : (
      <Link to='/signin'>
        <button className="btn btn-primary">Sign in to checkout</button>
      </Link>
        )
  )

  return (
    <div>
      <h2>Total: ${getTotalAmount()}</h2>
      {checkoutOptions()}
    </div>
  )
}
