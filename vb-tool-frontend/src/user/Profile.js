import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link, Redirect } from 'react-router-dom'
import { readUser, updateUser, updateUserToken } from './userAPI'

export const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: false,
    success: false
  })
  const token = isAuthenticated()
  const { name, email, password, error, success, redirect } = values
  useEffect(() => {
    init(match.params.userId)
  }, [])
  const init = (userId) => {
    readUser(userId, token.token).then(data => {
      if (data.err) {
        setValues({ ...values, error: true })
      } else {
        setValues({ ...values, name: data.name, email: data.email })
      }
    })
  }
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const clickSubmit = (event) => {
    event.preventDefault()
    updateUser(match.params.userId, token.token, { name, email, password }).then(data => {
      if (data.err) {
        console.log(data.err)
      } else {
        updateUserToken(data, () => {
          setValues({ ...values, name: data.name, email: data.email, success: true })
        })
      }
    })
  }
  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/cart" />
    }
  }

  const profileUpdate = (name, email, password) => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input type="email" onChange={handleChange('email')} className="form-control" value={email} />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input type="password" onChange={handleChange('password')} className="form-control" value={password} />
        </div>
        <button onClick={clickSubmit} className="btn btn-outline-primary">Submit</button>
      </form>
    )
  }
  return (
    <Layout
      title="Profile"
      description="You can make changes to your profile from here!"
      className="container-fluid"
    >
        <h2 className="mb-4">Profile Update</h2>
        {profileUpdate(name, email, password)}
        {redirectUser(success)}
    </Layout>
  )
}
