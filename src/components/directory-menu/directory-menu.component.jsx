import React from 'react'
import DirectoryItem from '../directory-item/directory-item.component'
import "./directory-menu.styles.scss"

function DirectoryMenu({ categories }) {
  return (
    <div className="directory-menu">
      {
        categories.map((category) => (
          <DirectoryItem key={category.id} category={category} />
        ))
      }
    </div>
  )
}

export default DirectoryMenu