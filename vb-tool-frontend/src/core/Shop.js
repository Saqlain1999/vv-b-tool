import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import Template from './Template'
import { getCategories, getFilteredResults } from './CoreAPI'
import { CheckBox, RadioBox } from './FilterControls'
import { prices } from './Prices'

export const Shop = () => {
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(false)
  const [limitBy, setLimitBy] = useState(6)
  const [skipBy, setSkipBy] = useState(0)
  const [noOfProducts, setNoOfProducts] = useState(0)
  const [filteredResults, setFilteredResults] = useState([])
  const [selectedFilters, setSelectedFilters] = useState({
    filters: { category: [], price: [] }
  })
  const init = () => {
    getCategories()
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          setCategories(data)
        }
      })
  }
  const FinalResults = finalFilters => {
    getFilteredResults(skipBy, limitBy, finalFilters)
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          setFilteredResults(data.product_data)
          setNoOfProducts(data.product_amount)
          setSkipBy(0)
        }
      })
  }
  const LoadMoreProducts = () => {
    const toSkipBy = skipBy + limitBy
    getFilteredResults(toSkipBy, limitBy, selectedFilters.filters)
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          setFilteredResults([...filteredResults, ...data.product_data])
          setNoOfProducts(data.product_amount)
          setSkipBy(toSkipBy)
        }
      })
  }
  const LoadMoreButton = () => {
    return (
      noOfProducts > 0 && noOfProducts >= limitBy && (
              <button onClick={LoadMoreProducts} className="btn btn-warning mb-5">Load More</button>
      )
    )
  }
  useEffect(() => {
    init()
    FinalResults(skipBy, limitBy, selectedFilters.filters)
  }, [])

  const handleFiltering = (filters, filterBy) => {
    const newFilters = { ...selectedFilters }
    newFilters.filters[filterBy] = filters
    if (filterBy === 'price') {
      const priceValues = handlePrice(filters)
      newFilters.filters[filterBy] = priceValues
    }
    FinalResults(newFilters.filters)
    setSelectedFilters(newFilters)
  }
  const handlePrice = value => {
    const data = prices
    let array = []

    for (const key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array
      }
    }
    return array
  }

  return (
    <Layout title="Shop" description="Find the products you require here!" className="container-fluid">
        <div className="row">
            <div className="col-4">
                <h4>Filter by categories</h4>
                <div className="form-check">
                <ul>
                    <CheckBox categories={categories}
                    handleFiltering={filters => handleFiltering(filters, 'category')}/>
                </ul>
                </div>
                <h4>Filter by price range</h4>
                <div className="form-check">
                <ul>
                    <RadioBox
                    prices={prices}
                    handleFiltering={filters => handleFiltering(filters, 'price')}/>
                </ul>
                  </div>
            </div>
            <div className="col-8">
                <h2 className="mb-4">Products</h2>
                <div className="row">
                    {filteredResults.map((r, i) => (
                      <div key={i} className="col-4 mb-3">
                        <Template product={r}></Template>
                      </div>
                    ))}
                </div>
                <hr/>
                {LoadMoreButton()}
            </div>
        </div>
    </Layout>
  )
}
