import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import { Home } from './core/Home'
import { Shop } from './core/Shop'
import { Product } from './core/Product'
import { Cart } from './core/Cart'
import PrivateRoute from './auth/PrivateRoute'
import UserDashboard from './user/UserDashboard'
import { Profile } from './user/Profile'
import AdminRoute from './auth/AdminRoute'
import AdminDashboard from './user/AdminDashboard'
import CreateCategory from './admin/CreateCategory'
import CreateProduct from './admin/CreateProduct'
import { ManageProducts } from './admin/ManageProducts'
import { UpdateProduct } from './admin/UpdateProduct'

const Routes = () => {
  return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/shop" exact component={Shop}/>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/cart" exact component={Cart}/>
                <PrivateRoute
                    path="/user/dashboard"
                    exact
                    component={UserDashboard}
                />
                <PrivateRoute
                    path="/profile/:userId"
                    exact
                    component={Profile}
                />
                <AdminRoute
                    path="/admin/dashboard"
                    exact
                    component={AdminDashboard}
                />
                <AdminRoute
                    path="/admin/products"
                    exact
                    component={ManageProducts}
                />
                <AdminRoute
                    path="/admin/product/update/:productId"
                    exact
                    component={UpdateProduct}
                />
                <AdminRoute
                    path="/create/category"
                    exact
                    component={CreateCategory}
                />
                <AdminRoute
                    path="/create/product"
                    exact
                    component={CreateProduct}
                />
                <Route path="/product/:productId" component={Product}/>
            </Switch>
        </BrowserRouter>
  )
}

export default Routes
