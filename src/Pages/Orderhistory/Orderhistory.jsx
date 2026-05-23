import React, { useEffect,useState} from 'react'
import "./Orderhistory.css";
import socket from '../../Socket';

function Orderhistory() {

    let [order, setorder] = useState([]);

    useEffect(() => {

        const fetchdata = async () => {

            try {

                const token = localStorage.getItem("token");

                const res = await fetch("https://realtime-ecommerce-dashboard-1.onrender.com/orders", {
                    headers: {
                            Authorization: `Bearer ${token}`                    
                        }
                });

                const data = await res.json();

                console.log(data);

                setorder(data);

            }
            catch (error) {

                console.log(error);

            }

        }

        fetchdata()

    }, [])

    useEffect(()=>{
        socket.on("orderstatusupdated",(data)=>{
            console.log(data);
            setorder((prev)=>
                prev.map((p)=>
                    p._id===data.orderId ? {...p,status:data.status}: p
                )
            )
        })

        return ()=>{
            socket.off("orderstatusupdated")
        }

    },[])

   return(
            <div className="orders-page">

            <div className="orders-top">
                <h1>Order History 📜</h1>
                <p>Your curated culinary purchases</p>
            </div>

                <div className="orders-container">
                 {order.map((o,index)=>(
                    <div className="order-card" key={o._id}>
                <div className="order-header">
                    <div className="order-left">
                        <span className="order-label">Order Total</span>
                        <h2>₹{o.total}</h2>
                        <p>{o.items.length ||0} Items</p>
                    </div>
                    <div className="order-right">
                        <span className={`order-status ${o.status.toLowerCase()}`}>{o.status}</span>                        
                        <p>{new Date(o.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>

            <div className="products-wrapper">
                {o.items?.map((product,index)=>(
            <div className="product-card" key={index}>
                <img src={product.image} alt={product.name} className="product-image"/>
                <div className="product-details">
                    <h3>{product.name}</h3>
                    <p className="price">₹{product.price}</p>
                    <p className="qty">Qty : {product.qty}</p>
                </div>
            </div>
                ))}
            </div>
            </div>
            ))}
            </div>
            </div>

)
}

export default Orderhistory