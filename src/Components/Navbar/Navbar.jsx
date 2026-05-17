import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar({login,setlogin}) {
  let navigate = useNavigate();

  const handlelogout=(e)=>{
    e.preventDefault();
    navigate("/login");
    localStorage.removeItem("token")
    setlogin(false);
  }

  return (
    <nav className="navbar">

      <div className="nav-container">

        <div >
          <Link  className="logo" to="/">Thos</Link>
          </div>
        <div className="nav-links">
          <Link to="/blog">Blog</Link>
          <Link to="/aboutus">About</Link>
          <Link to="/product">Shop</Link>
          <Link to="/orderhistory">Order</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/admin"></Link>
          {login?(
                <div className="nav-profile">
                  <span className="nav-link logout-text" onClick={handlelogout}>Logout </span>
                  <img onClick={() => navigate("/profile")}  src="/assets/profile.jpg" alt="profile" className="profile-icon" />
               </div>
          ):<Link to="/login">Login</Link>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;