import React from 'react'
import { useNavigate } from 'react-router-dom'

import "./directory-item.styles.scss"

function DirectoryItem({ category }) {
    const navigate = useNavigate()

    const { imageUrl, title } = category

    const toProducts = () => {
        navigate(`/shop/${title}`)
    }

    return (
        <div className="directory-item-container" onClick={toProducts}>
            <div
                className="background-image"
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <div className="directory-item-body">
                <h2>{title.toUpperCase()}</h2>
                <p>SHOP NOW</p>
            </div>
        </div>
    )
}

export default DirectoryItem