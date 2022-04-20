import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
    DirectoryItemContainer,
    BackgroundImage,
    DirectoryItemBody,
} from "./directory-item.styles.jsx"

function DirectoryItem({ category }) {
    const navigate = useNavigate()

    const { imageUrl, title } = category

    const handleNavigation = () => navigate(`/shop/${title}`)


    return (
        <DirectoryItemContainer onClick={handleNavigation}>
            <BackgroundImage imageUrl={imageUrl} />
            <DirectoryItemBody>
                <h2>{title.toUpperCase()}</h2>
                <p>SHOP NOW</p>
            </DirectoryItemBody>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem