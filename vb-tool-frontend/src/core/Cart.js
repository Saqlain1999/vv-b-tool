import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { Link } from 'react-router-dom'
import { getCartItems } from './cartFunctions'
import Template from './Template'
import { Checkout } from './Checkout'

export const Cart = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(getCartItems())
  }, [products])
  const showProducts = prods => (
      <div>
        <h2>
          Your cart contains {`${products.length}`} products
        </h2>
        <hr />
        {prods.map((p, i) => (
          <Template
            key={i}
            product={p}
            addToCartButton={false}
            updateCart={true}
            showRemoveProductButton={true}
          />
        ))}
      </div>
  )

  const emptyCart = () => (
    <h2>Empty Cart!<br/><Link to='/shop'>Shop Page</Link></h2>
  )

  return (
    <Layout title="Cart" description="Shopping Cart, You can manage your cart here" className="container-fluid">
      <div className="row">
        <div className="col-6">
          {products.length > 0 ? showProducts(products) : emptyCart()}
        </div>
        <div className="col-6">
          <h2 className="mb-4">
            Your cart summary
          </h2>
          <hr />
          <Checkout products={products} />
        </div>
      </div>
    </Layout>

  )
}
