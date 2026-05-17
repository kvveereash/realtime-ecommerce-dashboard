import React, { useEffect, useState } from 'react'
import './Product.css'
import {  useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import socket from "../../Socket.js";
import { toast } from 'react-toastify';



function Product({cart,setcart,wishlist,setwishlist}) {

  let[product,setproduct]=useState([]);
  const[search,setsearch]=useState("");
  const navigate=useNavigate();


    useEffect(()=>{
        const fetchurl= async()=>{
          try{
              const req =  await fetch('http://localhost:5000/products');
              const data = await req.json();
              console.log(data); 
              setproduct(data);    
              }
          catch(err)
              {
                console.log(err.message);
              }
        }
        fetchurl();
    },[])

 

    useEffect(() => {
      socket.on("connect", () => {
            console.log("SOCKET CONNECTED");
        });

      socket.on("Stockupdated", (data) => {
         console.log("SOCKET WORKING", data);
          setproduct((prev) =>
            prev.map((p) => p._id === data.productId ? { ...p, stock: data.stock } : p ));});
        }, [])


    useEffect(()=>{
      socket.on("Lowstock",(data)=>{
         toast.warning(  `${data.name} stock is low (${data.stock})`)
      })
    },[])




  const handlecart=(product)=>{
      setcart((prev)=>{
          const element =prev.find((p)=>p._id===product._id);
          if(element)
          {
            return(
              prev.map((P)=>P._id === product._id?{...P,qty:P.qty+1}:P)
            );
          }
          else{
            return[...prev,{...product,qty:1}]
          }
      })
  }

  const filtersearch = product.filter((p)=>{
    return p.name.toLowerCase().includes(search.toLowerCase())
  })

  const handlewishlist=(product)=>{
      const exsist = wishlist.find((w)=>(
        w._id===product._id
      )) 
      if(exsist)
        {
          const filterwishlist=wishlist.filter((w)=>(
            w._id!==product._id
          ))
          setwishlist(filterwishlist);
        }
      else{
        setwishlist([...wishlist,product])
      }

  }


return (
  <div className="product-page">

    <div className="shop-hero">

      <div className="shop-hero-content">
        <p className="shop-subtitle">Curated culinary selections</p>
        <h1 className="shop-title">Discover flavors crafted <br /> with passion</h1>
        <p className="shop-description">Explore handcrafted dishes, premium ingredients, and elegant dining experiences inspired by modern culinary artistry.</p>
      </div>

      <div className="product-header">
        <div className="search-wrapper">
          <input type="text" className="search-input" placeholder="Search foods..." value={search} onChange={(e)=>setsearch(e.target.value)} />
        </div>

        <div className="product-cart">
          <span className="cart-icon"><Link to="/cart" className="cart">🛒</Link></span>
          <span className="cart-count">{cart?.length || 0}</span>
        </div>

      </div>

    </div>

    <div className="editorial-banner-grid">
      {["poster.png","poster2.png","poster3.png","poster4.png"].map((img, i) => (
        <div className="editorial-banner-card" key={i}>
          <img src={`assets/${img}`} alt="" />
          <div className="editorial-banner-overlay"><span>Explore Collection</span></div>
        </div>
      ))}

    </div>

    <div className="products-section">

      <div className="products-heading">
        <p className="products-mini-title">Signature dishes</p>
        <h2>Thoughtfully prepared culinary experiences</h2>
      </div>

      <div className="products-grid">

        {filtersearch.map((p) => (
          <div className="product-card" key={p._id}>
            <div className="product-image-wrapper">
              <img onClick={()=>navigate(`/productdetail/${p._id}`)} src={p.image} alt={p.name} />
              <button className={wishlist.find((i)=>i._id===p._id) ? "wishlist-btn active" : "wishlist-btn"} onClick={()=>handlewishlist(p)}>❤</button>
            </div>

            <div className="product-card-content">
              <h3>{p.name}</h3>
              <p className="product-price">₹{p.price}</p>
              <p className="product-description">{p.description}</p>
              <button className="product-button" onClick={() => handlecart(p)}>{p.stock===0 ? "Out Of Stock": "Add to Cart"}</button>
            </div>

          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default Product