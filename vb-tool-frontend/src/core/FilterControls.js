import React, { useState, useEffect } from 'react'

export const CheckBox = ({ categories, handleFiltering }) => {
  const [checked, setChecked] = useState([])

  const handleChange = e => () => {
    const exists = checked.indexOf(e)
    const newCatId = [...checked]
    if (exists === -1) {
      newCatId.push(e)
    } else {
      newCatId.splice(exists, 1)
    }
    console.log(newCatId)
    setChecked(newCatId)
    handleFiltering(newCatId)
  }

  return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <input
                onChange={handleChange(c._id)}
                type="checkbox"
                value={checked.indexOf(c._id === -1)}
                className="form-check-input"
            />
            <label className="form-check-label">{c.name}</label>
        </li>
  ))
}

export const RadioBox = ({ prices, handleFiltering }) => {
  const [value, setValue] = useState(0)

  const handleChange = (event) => {
    handleFiltering(event.target.value)
    setValue(event.target.value)
  }

  return prices.map((p, i) => (
    <div key={i}>
        <input
            onChange={handleChange}
            type="radio"
            name={p}
            value={`${p._id}`}
            className="form-check-input"
        />
        <label className="form-check-label">{p.name}</label>
    </div>
  ))
}
