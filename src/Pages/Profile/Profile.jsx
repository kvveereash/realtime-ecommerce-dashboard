import React, { useState,useEffect } from 'react';
import "./Profile.css";

function Profile({ password, email, cart ,name}) {
    
    let[order,setorder]=useState([]);
    let user = null;
        try{
            const userdata = localStorage.getItem("user");
            if(userdata){
                user = JSON.parse(userdata);
            }
        }
        catch(error){
            console.log(error.message);
        }


    useEffect(() => {
    const fetchOrders = async () => {
        try{
            const token = localStorage.getItem("token");
            const res = await fetch(
                "https://realtime-ecommerce-dashboard-1.onrender.com/orders",
                {
                    method:"GET",
                    headers:{
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            const data = await res.json();
            console.log(data);
            setorder(data);
        }
        catch(error){
            console.log(error.message);
        }
    }
    fetchOrders();
}, []);


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
              <h3>{order?.length || 0}</h3>
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