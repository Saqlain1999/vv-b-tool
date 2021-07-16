import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../core/Layout'
import { register } from '../auth'

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  })
  const { name, email, password, error, success } = values
  const handleChange = value => event => {
    setValues({ ...values, error: false, [value]: event.target.value })
  }
  const registerUser = (event) => {
    event.preventDefault()
    setValues({ ...values, error: false })
    register({ name, email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false })
        } else {
          setValues({ ...values, name: '', email: '', password: '', error: '', success: true })
        }
      })
  }
  const showFaliure = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
  )
  const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New user created, Please continue to <Link to="/signin">Signin</Link>
        </div>
  )

  const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password}></input>
            </div>
            <button onClick={registerUser} className="btn btn-primary">Submit</button>
        </form>
  )

  return (
        <Layout title="Signup" description="Signup Page" className="container col-md-8 offset-md-2">
            {showFaliure()}
            {showSuccess()}
            {signUpForm()}
        </Layout>
  )
}

export default Signup
