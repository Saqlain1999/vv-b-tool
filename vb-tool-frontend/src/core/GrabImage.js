import React from 'react'
import { API } from '../config'

const GrabImage = ({ item, url }) => (
    <div className="product-img">
        <img
            src={`${API}/${url}/image/${item._id}`}
            alt={item.name}
            style={{ maxHeight: '100%', maxWidth: '100%' }}
        />
    </div>
)

export default GrabImage
