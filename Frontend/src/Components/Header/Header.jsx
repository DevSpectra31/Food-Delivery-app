import React from 'react'
import "./Header.css"
function Header() {
  return (
    <div className='header'>
        <div className='header-contents'>
            <h2>Order your favourite food here</h2>
            <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise.</p>
            <a href="#explore-menu">
              <button>View Menu</button>
            </a>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-icon">🍳</span>
            <div className="stat-info">
              <h3>50+</h3>
              <p>Unique Cuisines</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">⭐</span>
            <div className="stat-info">
              <h3>15k+</h3>
              <p>Happy Reviews</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🚀</span>
            <div className="stat-info">
              <h3>25m</h3>
              <p>Avg Delivery</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Header