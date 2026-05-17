import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "./Productdetails.css"

function Productdetails() {

    let[product,setproduct]=useState("");
    const{id}=useParams();
        
    
    useEffect(() => {
    const fetchProduct = async () => {
      try{
            const res = await fetch(`http://localhost:5000/products/${id}`);
            const data = await res.json();
            setproduct(data);
        } catch (err) {
        console.log(err.message);
      }
    };
    fetchProduct();
  }, [id]);


   if (!product) {
    return <h1>Loading...</h1>;
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