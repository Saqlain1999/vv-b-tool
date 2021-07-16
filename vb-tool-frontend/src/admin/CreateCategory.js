import React, { useState } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { createCategoryCall } from './AdminAPI'

const CreateCategory = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false
  })
  const { name, error, success } = values

  const { user, token } = isAuthenticated()

  const handleChange = (e) => {
    setValues({ ...values, name: e.target.value, error: '' })
  }
  const clickSubmit = (e) => {
    e.preventDefault()
    setValues({ ...values, error: '', success: false })
    createCategoryCall(user._id, token, { name })
      .then(reply => {
        if (reply.error) {
          setValues({ ...values, error: true, success: false })
        } else {
          setValues({ ...values, error: '', success: true })
        }
      })
  }
  const ShowResults = () => {
    if (success) {
      return <h3 className="text-success">Category `{name}` Succesfully Created!</h3>
    } else if (error) {
      return <h3 className="text-danger">Category `{name}` already exists!</h3>
    }
  }
  const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text">Admin Dashboard</Link>
        </div>
  )
  const createCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required/>
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
  )
  return (
        <Layout
            title="Create Category"
            description={'Welcome To Category Panel, You may create an category using the form below'}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {ShowResults()}
                    {createCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
  )
}

export default CreateCategory
