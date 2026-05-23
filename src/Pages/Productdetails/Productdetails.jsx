import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "./Productdetails.css"

function Productdetails() {

    let[product,setproduct]=useState("");
    const{id}=useParams();
        
    
    useEffect(() => {
    const fetchProduct = async () => {
      try{
            const res  = await fetch(`https://realtime-ecommerce-dashboard-1.onrender.com/products/${id}`);
            const data = await res.json();
            setproduct(data);
        } catch (err) {
        console.log(err.message);
      }
    };
    fetchProduct();
  }, [id]);


  if (!product) {
  return (
    <div className="product-loading">
      
      <div className="loading-image shimmer"></div>

      <div className="loading-content">
        <div className="loading-title shimmer"></div>
        <div className="loading-text shimmer"></div>
        <div className="loading-text short shimmer"></div>

        <div className="loading-price shimmer"></div>

        <div className="loading-buttons">
          <div className="loading-btn shimmer"></div>
          <div className="loading-btn shimmer"></div>
        </div>
      </div>

    </div>
  );
}


return (
  <div className="details-page">

    <div className="details-card">

      <div className="details-left">
        <img
          src={product.image}
          alt={product.name}
          className="details-image"
        />
      </div>

      <div className="details-content">

        <span className="details-tag">
          Premium Dish
        </span>

        <h1 className="details-title">
          {product.name}
        </h1>

        <p className="details-desc">
          {product.description}
        </p>

        <h2 className="details-price">
          ₹{product.price}
        </h2>

        <div className="details-buttons">

          <button className="cart-btn">
            Add To Cart
          </button>

          <button className="buy-btn">
            Buy Now
          </button>

        </div>

      </div>

    </div>

  </div>
);
}

export default Productdetails