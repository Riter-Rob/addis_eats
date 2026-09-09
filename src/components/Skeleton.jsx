import React from 'react'

function Skeleton() {
  return (
    <div className="skeleton-container" aria-busy="true" aria-label="Loading content">
      <div className="skeleton-box skeleton-header"></div>
      <div className="skeleton-grid">
        <div className="skeleton-box skeleton-card"></div>
        <div className="skeleton-box skeleton-card"></div>
      </div>
    </div>
  )
}

export default Skeleton