import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getOneProduct, getRelatedProducts } from './CoreAPI'
import Template from './Template'
import { Search } from './Search'

export const Product = (props) => {
  const [product, setProduct] = useState({})
  const [relatedProducts, setRelatedProducts] = useState([])
  const [error, setError] = useState(false)

  const loadOneProduct = productId => {
    getOneProduct(productId).then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        setProduct(data)
        getRelatedProducts(data._id).then(data => {
          if (data.error) {
            setError(data.error)
          } else {
            setRelatedProducts(data)
          }
        })
      }
    })
  }

  useEffect(() => {
    loadOneProduct(props.match.params.productId)
  }, [props])

  const showProductCard = () => {
    return (
      product &&
      product.description &&
      <Template
          product={product}
          viewProductButton={false}
      />
    )
  }
  const showRelatedProductsCard = () => {
    return (
      relatedProducts.map((p, i) => (
        <div key={i} className="mb-3">
            <Template product={p} />
        </div>
      ))
    )
  }

  return (
        <Layout title={product && product.name} description={product && product.description} className="container-fluid">
            <div className="row">
                <div className="col-8">
                  {showProductCard()}
                </div>
                <div className="col-4">
                  <h4>
                    Related Products
                  </h4>
                  {showRelatedProductsCard()}
                </div>
            </div>
        </Layout>
  )
}
