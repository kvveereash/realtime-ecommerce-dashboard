import React, { useEffect, useState } from 'react'
import "./UserDetails.css"

function UserDetails() {

    const[adminusers , setadminusers]=useState([]);

    const fetchadminuser=async()=>{
        try{
                const res = await fetch("https://realtime-ecommerce-dashboard-1.onrender.com/adminuser")
                const data= await res.json();
                console.log(data);
                setadminusers(data);
        }
        catch(error)
        {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        fetchadminuser();
    },[])

    const handledelete=(id)=>{
        setadminusers((prev)=>(
            prev.filter((p)=>(
                p._id!==id
            ))
        ))
    }

return (

<div className="user-page">

    <div className="user-header">
        <h1 className="user-main-title"> User Details</h1>
        <p className="user-subtitle">Manage all registered users</p>
    </div>


    <div className="user-grid">
        {
            adminusers.map((u,index)=>(
                <div className="user-card" key={u._id}>
                    <div className="user-top">
                        <div className="user-avatar">{u.name?.charAt(0).toUpperCase()} </div>
                        <div>
                            <h2 className="user-name">{u.name}</h2>
                            <p className="user-id">User #{index + 1}</p>
                        </div>
                    </div>

                    <div className="user-info">
                        <p>Email</p>
                        <h3> {u.email} </h3>
                    </div>

                    <div className="user-role-box">
                        <span>Customer Account</span>
                    </div>

                    <div className="user-actions">
                        <button className="view-btn">View</button>
                        <button className="delete-btn" onClick={()=>handledelete(u._id)}>Delete</button>
                    </div>

                </div>

            ))
        }

    </div>

</div>

)
}

export default UserDetails