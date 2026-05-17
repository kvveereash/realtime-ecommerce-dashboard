import React from 'react'
import './Cart.css'
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cart({cart,setcart,email}) {
    let navigate = useNavigate();

    if (!cart) return <p>Loading...</p>;
    console.log(cart)

    const increaseQty=(id)=>(
        setcart((prev)=>(
            prev.map((p)=>p._id===id ? p.qty >= p.stock ? (toast.error("Maximum stock reached"), p) :{...p,qty:p.qty+1}:p)
        ))
    )

    const decreaseQty=(id)=>(
        setcart((prev)=>(
            prev.map((item)=>item._id===id ?{...item,qty:item.qty-1}:item)
        ))
    )

    const removeitem=(id)=>{
          setcart((prev)=>(
            prev.filter((item)=>item._id!==id)
            ))
    }

    const totalprice = cart.reduce((sum,item)=>{
        return  sum+item.price*item.qty
    },0)

    const token = localStorage.getItem("token")
    let handleCheckout=async()=>{
      try {
              const res = await fetch("http://localhost:5000/orders", {
              method: "POST",
              headers:{
                       "Content-Type": "application/json",
                       "Authorization": token
                      },
              body: JSON.stringify({
                          email:email,
                          userid: "guest123",
                          items: cart,
                          total: totalprice
                       })
             });
              if(!res.ok)
                {
                  throw new Error("Something went wrong");
                }
              const data = await res.json();
              toast.success(data.message);
              localStorage.removeItem("cartitem");

          }catch (error) 
             {
                console.log(error);
              }
    }

 return (
  <div className="shop-page">

    <h1 className="shop-title">Shop</h1>

    {cart.map((c) => (
      <div key={c._id } className="shop-product">
        <div className="shop-img">
          <img src={c.image} alt={c.name} />
        </div>
        <div className="shop-info">
          <h2>{c.name}</h2>
          <p className="price">₹{c.price}</p>
          <div className="qty-box">
            <button onClick={() => decreaseQty(c._id)}>-</button>
            <span>{c.qty}</span>
            <button onClick={() => increaseQty(c._id)}>+</button>
          </div>
          <div className="btn-group">
            <button className="remove-btn" onClick={()=>removeitem(c._id)}>Remove</button>
          </div>
        </div>
      </div>
      
    ))}

    <div className="total">
      Total: ₹{totalprice}
    </div>
    <div>
        <button className="add-btn" onClick={()=>{handleCheckout();navigate("/checkout")}}>Add to bag</button>
    </div>

  </div>
);
}

export default Cart