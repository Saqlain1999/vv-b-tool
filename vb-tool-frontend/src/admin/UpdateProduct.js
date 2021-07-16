import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Redirect } from 'react-router-dom'
import { getSingleProduct, getCategories, updateProduct } from './AdminAPI'

export const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated()
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: 0,
    categories: [],
    category: '',
    quantity: 0,
    image: '',
    load: false,
    error: '',
    success: '',
    redirect: false,
    formData: ''
  })

  const {
    name,
    description,
    price,
    categories,
    category,
    quantity,
    load,
    error,
    success,
    redirect,
    formData
  } = values

  useEffect(() => {
    init(match.params.productId)
  }, [])

  const init = (pId) => {
    getSingleProduct(pId).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          quantity: data.quantity,
          formData: new FormData()
        })
        initCategories()
      }
    })
  }
  const initCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ categories: data, formData: new FormData() })
      }
    })
  }

  const handleChange = name => event => {
    const value = name === 'image' ? event.target.files[0] : event.target.value
    formData.set(name, value)
    setValues({ ...values, [name]: value })
  }

  const clickSubmit = event => {
    event.preventDefault()
    setValues({ ...values, error: '', load: true })
    updateProduct(match.params.productId, user._id, token, formData)
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error })
        } else {
          setValues({
            ...values,
            name: '',
            description: '',
            image: '',
            price: '',
            quantity: '',
            load: false,
            redirect: true,
            success: data.name
          })
        }
      })
  }

  const newForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Image</h4>
      <div className="form-group">
        <label className="btn btn-outline-secondary">
          <input
            onChange={handleChange('image')}
            type="file"
            name="image"
            accept="image/*"
        />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
            onChange={handleChange('name')}
            type="text"
            className="form-control"
            value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
            onChange={handleChange('description')}
            className="form-control"
            value={description}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
            onChange={handleChange('price')}
            text="number"
            className="form-control"
            value={price}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Category</label>
        <select
            onChange={handleChange('category')}
            className="form-control"
        >
            <option>Select</option>
            {categories &&
              categories.map((c, i) => (
                <option key={i} value={c._id}>{c.name}</option>
              ))}
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Quentity</label>
        <input
            onChange={handleChange('quantity')}
            type="number"
            className="form-control"
            value={quantity}
        />
      </div>
      <button className="btn btn-outline-primary">Update Product</button>
    </form>
  )

  const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
  )
  const showSuccess = () => (
    <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
      <h2>{`${success}`} has been updated</h2>
    </div>
  )

  const Loading = () => (
    load && (<div className="alert alert-success"><h2>Loading...</h2></div>)
  )

  const redirection = () => {
    if (redirect) {
      if (!error) {
        return <Redirect to="/"/>
      }
    }
  }
  return (
    <Layout
      title="Update Product"
      description={'Welcome To Update Product Panel, You may update this product using the form below'}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {Loading()}
          {showSuccess()}
          {showError()}
          {newForm()}
          {redirection()}
        </div>
      </div>
    </Layout>
  )
}
