import React from 'react'
import "./Wishlist.css"

function Wishlist({ wishlist, setwishlist }) {

return(

          <div className="wishlist-page">
          {
            wishlist.length===0 ? (
                    <h1 className="empty-text">Wishlist is Empty</h1>
                     ) : (
          <>
            <div className="wishlist-hero">
              <h1 className="wishlist-title"> ❤️ Saved Favorites</h1>
              <p className="wishlist-subtitle">Your curated collection of culinary delights</p>
            </div>
            <div className="wishlist-grid">
              {
                wishlist.map((w)=>(
                  <div className="wishlist-card" key={w._id}>
                      <img src={w.image} alt={w.name} />
                      <div className="wishlist-content">
                        <h2>{w.name}</h2>
                        <p className="wishlist-price">₹{w.price}</p>
                        <p className="wishlist-desc">{w.description}</p>
                        <button className="cart-btn">Add to Cart</button>
                      </div>
                </div>
                        ))
              }
            </div>
          </>
        )
        }
        </div>
)
}

export default Wishlist