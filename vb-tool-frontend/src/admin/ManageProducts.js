import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { getProducts, getSingleProduct, removeProduct, updateProduct } from './AdminAPI'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'

export const ManageProducts = () => {
  const [products, setProducts] = useState([])
  const { user, token } = isAuthenticated()

  const loadProducts = () => {
    getProducts().then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        setProducts(data)
      }
    })
  }
  const deletion = productId => {
    console.log(user, token)
    removeProduct(productId, user._id, token)
      .then(data => {
        if (data.error) {
          console.log(data.error)
        } else {
          loadProducts()
        }
      })
  }
  useEffect(() => {
    loadProducts()
  }, [])
  return (
    <Layout
      title="Manage Products"
      description={'Manage the products in the database'}
      className="container-fluid"
    >
      <h2 className="mb-4">Manage Products</h2>
      <div className="row">
        <div className="col-12">
          <h2 class="text-center">Total Products: {products.length}</h2>
          <hr/>
        <ul className="list-group">
          {products.map((p, i) => (
            <li
              key={i}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <strong>{p.name}</strong>
              <Link to={`/admin/product/update/${p._id}`}>
                <span className="badge rounded-pill bg-success">
                  Update
                </span>
              </Link>
              <span
                className="badge rounded-pill bg-danger"
                onClick={() => deletion(p._id)}
              >
                Delete
              </span>
            </li>
          ))}
        </ul>
        </div>

      </div>
      </Layout>
  )
}
