import { useEffect ,useState} from "react"
import React from 'react'
import './AdminOrders.css'
import { toast } from "react-toastify"
import socket from "../../../Socket.js";


function AdminOrders() {

    const[orders,setorders]=useState([])

    const fetchorders = async()=>{
        try{
            const res=  await fetch("https://realtime-ecommerce-dashboard-1.onrender.com/orders/all");
            const data= await res.json();
            console.log(data);
            
            setorders(data);
        }
        catch(error)
        {
            console.log(error.message);
        }
    }

  useEffect(()=>{
        fetchorders()
    },[])

  useEffect(()=>{
    socket.on("neworder",(data)=>{
        console.log("New Order :",data);
        setorders((prev)=>[data,...prev])
        toast.success("New Order Recieved");
    })
    return ()=>{
      socket.off("neworder")
    }
  })



    const updatestatus=(id,status)=>{
        try{
            fetch(`https://realtime-ecommerce-dashboard-1.onrender.com/orders/${id}`,
                {
                    method:"PUT",
                    headers:{
                                "Content-Type":"application/json"
                            },
                    body:JSON.stringify({
                                            status:status
                                        })
                }
            )
            fetchorders();
            toast.success(`Order ${status}`);
        }
        catch(error)
        {
            console.log(error.message)
        }
    }



  return (
  <div className="admin-orders-page">

    <div className="orders-header">

      <div>
        <h1 className="orders-title">Admin Orders</h1>
        <p className="orders-subtitle">Manage and track all customer purchases</p>
      </div>

      <div className="orders-count">
        Total Orders : <span>{orders.length}</span>
      </div>

    </div>

    <div className="orders-grid">

      {orders.map((o, index) => (

        <div className="order-card" key={o._id}>

          <div className="order-top">

            <div>
              <h2 className="order-id">Order #{index + 1}</h2>
              <p className="order-date">{new Date(o.createdAt).toLocaleDateString()}</p>
            </div>
            <span className={o.status === "Delivered" ? "status delivered" : "status pending"}>{o.status}</span>
          </div>

          <div className="order-user-box">

            <div>
              <p className="order-user">Customer ID</p>
              <h3>{o.userid}</h3>
            </div>

            <div className="item-count">{o.items?.length||0} Items</div>

          </div>

          <div className="order-total-box">
            <p>Total Amount</p>
            <h1>₹{o.total}</h1>
          </div>

          <div className="order-items">

            {o.items?.filter(Boolean).map((i, index) => (

              <div className="order-item" key={index}>

                <img className="order-item-image" src={i.image} alt={i.name} />

                <div className="order-item-content">
                  <h4>{i.name}</h4>
                  <p>Quantity : {i.qty}</p>
                  <span>₹{i.price}</span>
                </div>

              </div>

            ))}

          </div>

          <div className="order-bottom">
            <select className="status-select"  value={o.status}  onChange={(e)=>updatestatus(o._id,e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

      ))}

    </div>

  </div>
)
}

export default AdminOrders