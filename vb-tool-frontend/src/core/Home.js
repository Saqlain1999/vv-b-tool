import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getProducts } from './CoreAPI'
import Template from './Template'
import { Search } from './Search'

export const Home = () => {
  const [bySell, setBySell] = useState([])
  const [byArrival, setByArrival] = useState([])
  const [error, setError] = useState(false)

  const loadBySell = () => {
    getProducts('sold')
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          setBySell(data)
        }
      })
  }
  const loadByArrival = () => {
    getProducts('createdAt')
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          setByArrival(data)
        }
      })
  }
  useEffect(() => {
    loadByArrival()
    loadBySell()
  }, [])

  return (
    <Layout title="Home" description="VV&B Tool" className="container-fluid">
      <Search/>
        <h2 className="mb-4">New Arrivals</h2>
        <div className="row">
        {byArrival.map((p, i) => (
          <div key={i} className="col-4 mb-3">
            <Template product={p}/>
          </div>
        ))}
        </div>
        <h2 className="mb-4">Best Sellers</h2>
        <div className="row">
        {bySell.map((p, i) => (
          <div key={i} className="col-4 mb-3">
            <Template product={p}/>
          </div>
        ))}
        </div>
    </Layout>
  )
}
