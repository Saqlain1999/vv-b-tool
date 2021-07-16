import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Layout from '../core/Layout'
import { login, authenticate, isAuthenticated } from '../auth'

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    load: false,
    redirect: false
  })
  const { email, password, error, load, redirect } = values
  const { user } = isAuthenticated()

  const handleChange = value => event => {
    setValues({ ...values, error: false, [value]: event.target.value })
  }
  const loginUser = (event) => {
    event.preventDefault()
    setValues({ ...values, error: false, load: true })
    login({ email, password })
      .then(data => {
        console.log(data)
        if (data.err) {
          setValues({ ...values, error: data.err, load: false })
        } else {
          authenticate(data, () => {
            setValues({ ...values, redirect: true })
          })
        }
      })
  }
  const showFaliure = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
  )
  const showLoad = () => {
    if (load) {
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
    }
  }

  const redirection = () => {
    if (redirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard"/>
      } else {
        return <Redirect to="/user/dashboard"/>
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/"/>
    }
  }

  const signInForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password}></input>
            </div>
            <button onClick={loginUser} className="btn btn-primary">Submit</button>
        </form>
  )

  return (
        <Layout title="Signin" description="Signin Page" className="container col-md-8 offset-md-2">
            {showFaliure()}
            {showLoad()}
            {signInForm()}
            {redirection()}
        </Layout>
  )
}

export default Signin
