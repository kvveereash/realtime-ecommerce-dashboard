import React, { useEffect, useState } from 'react'
import './AdminHome.css'
import { Link, Outlet } from 'react-router-dom'
import { BarChart,Bar, XAxis,YAxis,Tooltip,ResponsiveContainer,CartesianGrid} from "recharts";
import socket from "../../../Socket.js";


function AdminHome() {

  const[analytics,setanalytics]=useState({})
  const[notification,setnotification]=useState([]);

  const fetchanalytics=async ()=>{
      try{
          const res=await fetch( "https://realtime-ecommerce-dashboard-1.onrender.com/analytics");
          const data =await res.json();
          console.log(data);
          setanalytics(data)
      }
      catch(error)
      {
        console.log(error.message)
      }
    }

  useEffect(()=>{
      fetchanalytics();
    },[])

    useEffect(()=>{
      socket.on("neworder",(data)=>{
        setnotification((prev)=>[
          {
            message:`New Order ${data.total}`,
            time: new Date().toLocaleString()
          },
          ...prev
        ])
      })
      return ()=>{
        socket.off("neworder")
      }
    },[])

const salesdata = [

    {
        month:"Jan",
        revenue:4000
    },

    {
        month:"Feb",
        revenue:7000
    },

    {
        month:"Mar",
        revenue:5000
    },

    {
        month:"Apr",
        revenue:9000
    },

    {
        month:"May",
        revenue:12000
    }

]

  return (

    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h1>Admin Panel</h1>
          <p>Manage your store</p>
        </div>

        <div className="admin-nav">
          <Link to="/admin" className="admin-link">Products </Link>
          <Link to="/adminorder" className="admin-link">Orders</Link>
          <Link to="/userdetails" className="admin-link"> Users</Link>
        </div>

        <div className="admin-footer">
          <p>Full Stack Ecommerce Dashboard</p>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-topbar">
          <h2>Dashboard</h2>
          <button className="admin-profile-btn"> Admin</button>
          <span>
            <div className="notification-box">
              <button className="bell-btn">🔔</button>
              <span className="notification-count"> {notification.length}</span>
            </div>
          </span>
        </div>
        <div className="notification-panel">
        {
            notification.map((n,index)=>(
            <div className="notification-item" key={index}>
                <h4>{n.message}</h4>
                <p>{n.time}</p>
            </div>
            ))
        }
        </div>

        <div className="admin-page-content">
          <Outlet />
        </div>
  
  <div className="analytics-page">
        <h1 className="analytics-title">Analytics Dashboard </h1>
        <div className="analytics-stats">
            <div className="analytics-card">
                <h2>{analytics.revenue}</h2>
                <p>Total Revenue</p>
            </div>
            <div className="analytics-card">
                <h2>{analytics.totalOrders}</h2>
                <p>Total Orders</p>
            </div>

            <div className="analytics-card">
                <h2>{analytics.totalUsers}</h2>
                <p>Total Users</p>
            </div>

            <div className="analytics-card">
                <h2>{analytics.totalProduct}</h2>
                <p>Products</p>
            </div>
        </div>



        <div className="chart-container">
            <h2>Monthly Revenue</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={salesdata}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue"  radius={[10,10,0,0]}/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
      </div>

    </div>

  )
}

export default AdminHome