import React, { useState,useEffect } from 'react'
import {  useNavigate } from 'react-router-dom';
import './Login.css'
import { toast } from 'react-toastify';

function Login({setlogin}) {

    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");
    const [index, setIndex] = useState(0);
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


    const handlelogin=async(e)=>{
            e.preventDefault();
            const res = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers:{
                    "Content-Type": "application/json"
                    },
            body: JSON.stringify({
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
        localStorage.setItem("userId", JSON.stringify(data.userId));
        localStorage.setItem("user", JSON.stringify(data.user))
        toast.success("Login Sucessfull")
        navigate("/");
        setlogin(true);
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

          <form onSubmit={handlelogin}>
            <input
              type="email"
              placeholder="User Name or Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />

            <div className="forgot">Forgot Password</div>

            <button type="submit">SIGN IN</button>
          </form>

          <div className="divider">OR</div>

          <div className="google-btn">Sign in with Google</div>

          <p className="signup">
            New User? <span onClick={()=>navigate("/signup")}>Create Account</span>
          </p>

        </div>
      </div>

    </div>
  </div>
);
}

export default Login