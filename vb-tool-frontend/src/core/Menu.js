import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signOut, isAuthenticated } from '../auth'
import { totalItems } from './cartFunctions'

const highlightActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#fff' }
  }
  return { color: '#a2a2a2' }
}

const Menu = ({ history }) => (
    <div>
    <ul className="nav navbar-dark bg-dark">
        <li className="nav-item">
            <Link className="nav-link" style={highlightActive(history, '/')} to="/">Home</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" style={highlightActive(history, '/shop')} to="/shop">Shop</Link>
        </li>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="nav-item">
            <Link className="nav-link" style={highlightActive(history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link>
            </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item">
            <Link className="nav-link" style={highlightActive(history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
            </li>
        )}
        {!isAuthenticated() && (
            <Fragment>
                <li className="nav-item">
                    <Link className="nav-link" style={highlightActive(history, '/signin')} to="/signin">Signin</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={highlightActive(history, '/signup')} to="/signup">Singup</Link>
                </li>
            </Fragment>
        )}
        {isAuthenticated() && (
            <Fragment>
                <li className="nav-item">
                    <span className="nav-link" style={{ cursor: 'pointer', color: '#fff' }} onClick={() => signOut(() => {
                      history.push('/')
                    })}>Signout</span>
                </li>
            </Fragment>
        )}
        <li className="nav-item" style={{ float: 'right' }}>
            <Link
                className="nav-link"
                style={highlightActive(history, '/cart')}
                to="/cart"
            >
                Cart {' '}
                <sup>
                    <small className="cart-badge">{totalItems()}</small>
                </sup>
            </Link>
        </li>
    </ul>
</div>
)

export default withRouter(Menu)
