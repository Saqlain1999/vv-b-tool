import React, { useState, useEffect } from 'react'
import { getCategories, list } from './CoreAPI'
import Template from './Template'

export const Search = () => {
  const [values, setValues] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false
  })

  const { categories, category, search, results, searched } = values

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        setValues({ ...data, categories: data })
      }
    })
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const searchProducts = () => {
    if (search) {
      list({ search: search || undefined, category: category })
        .then(data => {
          if (data.error) {
            console.log(data.error)
          } else {
            setValues({ ...values, results: data, searched: true })
          }
        })
    }
  }

  const handleSearching = (e) => {
    e.preventDefault()
    searchProducts()
  }
  const handleChange = (name) => event => {
    setValues({ ...values, [name]: event.target.value, searched: false })
  }

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Products Found: ${results.length}`
    }
    if (searched && results.length < 1) {
      return 'No products found'
    }
  }

  const searchedProducts = (results = []) => {
    return (
      <div>
          <h3 classNam="mt-4 mb-4">
              {searchMessage(searched, results)}
          </h3>
          <div className="row">
          {results.map((product, i) => (
              <Template key={i} product={product} />
          ))}
        </div>
      </div>
    )
  }

  const searchForm = () => (
    <form onSubmit={handleSearching}>
        <span className="input-group-text">
            <div className="input-group">
                <div className="input-group-prepend">
                    <select
                        className="form-select"
                        onChange={handleChange('category')}
                    >
                        <option value="All">All</option>
                        {categories.map((c, i) => (
                        <option
                            className="dropdown-item"
                            key={i}
                            value={c._id}
                        >
                            {c.name}
                        </option>))}
                    </select>
                </div>
                <input
                    type="search"
                    className="form-control"
                    onChange={handleChange('search')}
                    placeholder="Search by name"
                />
            </div>
            <div className="input-group-text" style={{ border: 'none' }}>
                <button className="btn btn-primary">Search</button>
            </div>
        </span>
    </form>
  )

  return (
        <div>
            <div className="container mb-3">
                {searchForm()}
            </div>
            <div className="container-fluid mb-3">
                {searchedProducts(results)}
            </div>
        </div>
  )
}
