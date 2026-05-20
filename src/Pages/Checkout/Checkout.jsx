import React from 'react'
import './Checkout.css'
import { useState } from 'react';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from 'react-toastify';

function Checkout({ cart,setcart}) {

    const stripe=useStripe();
    const elements=useElements()  
    const[coupon,setcoupon]=useState("");
    const[discount,setdiscount]=useState(0);


    const [mode, setMode] = useState("delivery");
    const[form,setform]=useState({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        phone: ""
    })

    const handleChange=(e)=>{
        setform({ ...form, [e.target.name]: e.target.value });    
    }

    const totalprice = cart.reduce((sum,item)=>{
        return  sum+(item.price+item.qty)
    },0)
  
    const[finaltotal,setfinaltotal]=useState(totalprice);


    const handleOrder= async ()=>{
        try{
              const paymentRes = await fetch("http://localhost:5000/payment/create-payment-intent",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify
                      ({
                          amount: totalprice,
                        }),
                }
              );

              const paymentData=await paymentRes.json();
              const result=await stripe.confirmCardPayment(
                paymentData.clientSecret,
                {
                  payment_method:{
                    card:elements.getElement(CardElement),
                  },
                }
              )
              if(result.error)
                {
                  toast.error(result.error.message);
                  return;
                }
              if (result.paymentIntent.status === "succeeded")
            {
                const res = await fetch("http://localhost:5000/checkout", {
                method: "POST",
                headers:{
                        "Content-Type": "application/json",
                    },
                body:JSON.stringify({
                    ...form,
                    item:cart,
                    total:totalprice
                })
                })
                const data= await res.json();
                if(!res.ok)
                {
                    toast.error(data.message || "Order failed");
                    return;
                }
                toast.success("Payment Successful & Order Saved");
                setcart([]);
            }
          }
        catch(err)
        {
          console.log(err.message)  
        }
    }

    const handlecoupon = async()=>{
        try{
            const res =await  fetch("http://localhost:5000/coupon/validate",{
              method:"POST",
              headers:{
                        "Content-Type":"application/json"
              },
              body:JSON.stringify({
                  code:coupon,
                  total:totalprice
              })
            })
            const data = await res.json();
            console.log(data);
            setdiscount(data.discountamount);
            setfinaltotal(data.finaltotal);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    
return ( 
  <div className="checkout-page">

  <h2 className="checkout-title">Checkout</h2>

  <div className="checkout-container">

    <div className="checkout-left">

      <h3>Delivery Options</h3>
        <div className="delivery-toggle">
        <button className={mode === "delivery" ? "active" : ""} onClick={() => setMode("delivery")}> Delivery </button>
        <button  className={mode === "pickup" ? "active" : ""}  onClick={() => setMode("pickup")} > Pick-Up </button>
        </div>

      <div className="name-row">
        <input type="text" placeholder="First Name" name="firstName" onChange={handleChange} />
        <input type="text" placeholder="Last Name" name="lastName" onChange={handleChange} />
      </div>

      <textarea placeholder="Start typing address"  name="address" onChange={handleChange}></textarea>

      <p className="manual">Enter address manually</p>

      <div className="contact-row">
        <input type="email" placeholder="Email" name="email" onChange={handleChange} />
        <input type="number" placeholder="Phone Number"  name="phone" onChange={handleChange}/>
      </div>
      <div  className="card-box">
        <CardElement/>
      </div>
      <button className="order-btn"  onClick={handleOrder}>Order</button>

    </div>

    <div className="checkout-right">

      <h3>In Your Bag</h3>

      {cart.map((m) => (
        <div className="cart-item" key={m.id}>
            <img src={m.image} alt={m.name} />
            <div className="cart-info">
                <h4>{m.name}</h4>
                <p>₹{m.price}</p>
            </div>
            </div>
      ))}

<div className="total">

    <div className="coupon-box">
        <input
            type="text"
            placeholder="Enter Coupon"
            value={coupon}
            onChange={(e)=>setcoupon(e.target.value)}
        />

        <button onClick={handlecoupon}>
            Apply Coupon
        </button>
    </div>

    <div className="price-box">

    <div className="price-row">
        <span>Discount</span>
        <span>₹{discount}</span>
    </div>

    <div className="price-row">
        <span>Total</span>
        <span>₹{totalprice}</span>
    </div>

    <div className="final-row">
        <span>Final Total</span>
        <span>₹{finaltotal}</span>
    </div>

</div>

</div>
    </div>
  </div>
</div>
  )
}

export default Checkout