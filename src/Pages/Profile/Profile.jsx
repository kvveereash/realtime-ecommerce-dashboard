import React from 'react';
import "./Profile.css";

function Profile({ password, email, cart ,name}) {

  const user = JSON.parse(localStorage.getItem("user"))

  return (
  <div className="profile-page">
    <div className="profile-hero">
      <div className="profile-card">
        <div className="profile-left">
          <img src="/assets/profile2.jpg" alt="" className="profile-banner-image" />
          <div className="profile-overlay"></div>
        </div>
        <div className="profile-right">
          <div className="profile-top">
            <img src="/assets/profile.jpg" alt="" className="profile-main-image" />
            <div className="profile-badge">  Premium Member</div>
          </div>
          <div className="profile-text">
            <p className="profile-mini-title"> PERSONAL PROFILE </p>
            <h1 className="profile-title"> Welcome Back</h1>
            <h2 className="profile-name">{user?.name}</h2>
            <p className="profile-email">{user?.email}</p>
          </div>
          <div className="profile-stats">
            <div className="stat-box">
              <h3>{cart.length}</h3>
              <p>Cart Items</p>
            </div>

            <div className="stat-box">
              <h3>12</h3>
              <p>Orders</p>
            </div>

            <div className="stat-box">
              <h3>4.9</h3>
              <p>Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="products-section">
      <div className="section-header">
        <div>
          <p className="section-mini-title">CURATED COLLECTION</p>
          <h1 className="section-title">Your Cart Products</h1>
        </div>
      </div>
      <div className="products-grid">
        {cart.map((c) => (
          <div className="product-card" key={c._id}>
            <div className="product-image-wrapper">
              <img src={c.image} alt="" className="product-image" />
            </div>
            <div className="product-content">
              <h2>{c.name}</h2>
              <h3>₹{c.price}</h3>
              <p>{c.description}</p>
              <button className="buy-btn">Buy Again</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default Profile;