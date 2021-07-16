import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import GrabImage from './GrabImage'
import moment from 'moment'
import { addItemToCart, updateProductCount, removeProduct } from './cartFunctions'

const Template = ({
  product,
  viewProductButton = true,
  addToCartButton = true,
  updateCart = false,
  showRemoveProductButton = false
}) => {
  const [redirect, setRedirect] = useState(false)
  const [productCount, setProductCount] = useState(product.count)

  const showViewButton = viewProductButton => {
    return (
      viewProductButton && (
        <Link to={`/product/${product._id}`}>
            <button className="btn btn-outline-primary m-1">
                View Product
            </button>
        </Link>
      )
    )
  }
  const addCartPressed = () => {
    addItemToCart(product, () => {
      setRedirect(true)
    })
  }
  const Redirection = redirect => {
    if (redirect) {
      return <Redirect to="/cart"/>
    }
  }
  const showAddToCartButton = (addToCartButton) => {
    return (
      addToCartButton &&
        <button onClick={addCartPressed} className="btn btn-outline-warning m-1">
            Add to Cart
        </button>
    )
  }
  const RemoveProductFromCartButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton &&
        <button onClick={() => removeProduct(product._id)} className="btn btn-outline-danger m-1">
            Remove Product
        </button>
    )
  }

  const handleChange = productId => event => {
    setProductCount(event.target.value < 1 ? 1 : event.target.value)
    if (event.target.value >= 1) {
      updateProductCount(productId, event.target.value)
    }
  }

  const cartUpdatingOptions = updateCart => {
    return updateCart &&
    <div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Adjust Quantity</span>
        </div>
        <input type="number" className="form-control" value={productCount} onChange={() => handleChange(product._id)}/>
      </div>
    </div>
  }

  const showStock = (quantity) => {
    return quantity > 0
      ? (
            <span className="badge rounded-pill bg-success">In Stock</span>
        )
      : (
            <span className="badge rounded-pill bg-danger">Out of Stock</span>
        )
  }

  return (
<div className="card">
        <div className="card-header name">
            {product.name}
        </div>
        <div className="card-body">
          {Redirection(redirect)}
            <GrabImage item={product} url="products" />
            <p className="card-text">
                {product.description}
            </p>
            <p className="black-10">
                ${product.price}
            </p>
            <p className="black-9">Category: {product.category && product.category.name}</p>
            <p className="black-8">Added On: {moment(product.createdAt).fromNow()}</p>
            {showStock(product.quantity)}
            <br/>
        </div>
        <div className="card-footer footButtons">
                {showViewButton(viewProductButton)}
                {showAddToCartButton(addToCartButton)}
                {RemoveProductFromCartButton(showRemoveProductButton)}
                {cartUpdatingOptions(updateCart)}
        </div>
    </div>
  )
}

export default Template
