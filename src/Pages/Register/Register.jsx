import React, { useState,useEffect } from 'react'
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Register({password,setpassword,email,setemail,name,setname}) {
  
    const [index, setIndex] = useState(0);
    const[newpassword,setnewpassword]=useState("");

    let navigate = useNavigate();

    const images = [
        "assets/login.jpg",
        "assets/login2.jpg",
        "assets/login3.jpg",
    ];

    useEffect(() => 
    {
        const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);


    const handlesignin=async(e)=>{
            e.preventDefault();
            if(password!==newpassword)
            {
                toast.error("Invalid Password");
            }
            else
            {
                const res = await fetch("https://realtime-ecommerce-dashboard-1.onrender.com/auth/register", {
                method: "POST",
                headers:{
                        "Content-Type": "application/json"
                        },
                body: JSON.stringify({
                          name,
                          email,
                          password
                        })
            });
            const data=await res.json();
            if (!res.ok)
            {
                toast.error(data.message || "Login failed");
                return;
            }
            console.log(data);
            localStorage.setItem("token",data.token);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("user", JSON.stringify(data.user))
            toast.success("Signup Sucessfull")
            navigate("/login");

        }
        
    }

  return (
  <div className="login-page">
    <div className="login-page-inner">

      <div className="login-left">
        <div className="left-content"> 

          <div className="slider">
            <img src={images[index]} alt="slide" />
          </div>
          <div className="dots">
            {images.map((_, i) => (
              <span
                key={i}
                className={i === index ? "active" : ""}
              ></span>
            ))}
          </div>

        </div>
      </div>
      <div className="login-right">
        <div className="login-box">

          <h2 className="logo">Thos</h2>
          <p className="welcome">Welcome To Thos</p>

          <form onSubmit={handlesignin}>
            <input   placeholder="User Name "  value={name}  onChange={(e) => setname(e.target.value)} required />
            <input   placeholder="User Name or Email"  value={email}  onChange={(e) => setemail(e.target.value)} required />
            <input   placeholder="Create new Password" value={password} onChange={(e) => setpassword(e.target.value)} required/>
            <input   placeholder="Confirm new Password" value={newpassword} onChange={(e) => setnewpassword(e.target.value)} required/>
            <div className="forgot">Forgot Password</div>
            <button type="submit">Sign Up</button>
          </form>         
        </div>
      </div>

    </div>
  </div>
);
}

export default Register