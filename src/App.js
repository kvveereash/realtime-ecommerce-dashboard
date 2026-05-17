import Product from "./Pages/Productpage/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, {  useEffect, useState } from 'react'
import Cart from "./Pages/Cart/Cart";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import Contact from "./Pages/Contacts/Contact";
import About from "./Pages/AboutUs/Aboutus";
import Blog from "./Pages/Blog/Blog";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Checkout from "./Pages/Checkout/Checkout";
import Productdetails from "./Pages/Productdetails/Productdetails";
import Profile from "./Pages/Profile/Profile";
import Orderhistory from "./Pages/Orderhistory/Orderhistory";
import Wishlist from "./Pages/Wishlist/Wishlist";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Admin from "./Pages/Admin/Admin";
import UserDetails from "./Pages/Admin/UserDeatails/UserDetails";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminOrders from './Pages/Admin/AdminOrders/AdminOrders.jsx'
import AdminHome from "./Pages/Admin/AdminHome/AdminHome.jsx";

function App() {

const stripePromise = loadStripe("pk_test_51Ss0hjA9lbYhaCz4IHE29vKp7SHd1WrezBGqdN73t3QZq21GoUfYZ9oCvTNp6gxqj3THG1D4erHRlHjBBcarCWtR00kIYDhgZd");


    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");
    const[name,setname]=useState("")
    const[wishlist,setwishlist]=useState(()=>{
      const item = localStorage.getItem("wishlist")
      return item ? JSON.parse(item):[];
    });
    let[login,setlogin]=useState(!!localStorage.getItem("token"));
    let[cart,setcart]=useState(()=>
      {
              const item=localStorage.getItem("cartitem")
              return item?JSON.parse(item):[]
        })

    useEffect(()=>{
      localStorage.setItem("cartitem",JSON.stringify(cart))
    },[cart])

    useEffect(()=>{
      localStorage.setItem("wishlist",JSON.stringify(wishlist))
    },[wishlist])
      
  return (
    <BrowserRouter>
      <Navbar  login={login} setlogin={setlogin}/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/product" element={<ProtectedRoutes><Product cart ={cart} setcart={setcart} wishlist={wishlist} setwishlist={setwishlist}/></ProtectedRoutes>}></Route>
        <Route path="/cart" element={<ProtectedRoutes><Cart cart ={cart} setcart={setcart} email={email}/></ProtectedRoutes>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/aboutus" element={<About/>}></Route>
        <Route path="/blog" element={<Blog/>}></Route>
        <Route path="/login" element={<Login login={login} setlogin={setlogin}/>}></Route>
        <Route path="/signup" element={<Register email={email} setemail={setemail} password={password} setpassword={setpassword} name={name} setname={setname} />}></Route>
        <Route path="/checkout" element={ <ProtectedRoutes><Elements stripe={stripePromise}><Checkout cart={cart} setcart={setcart} /></Elements></ProtectedRoutes>}/>
        <Route path="/productdetail/:id" element={<Productdetails/>}></Route>
        <Route path="/profile" element={<Profile name={name} email={email}  password={password}  cart ={cart} />}></Route>
        <Route path="/orderhistory" element={<ProtectedRoutes><Orderhistory /></ProtectedRoutes>}></Route>
        <Route path="/wishlist" element={<ProtectedRoutes><Wishlist wishlist={wishlist} setwishlist={setwishlist}/></ProtectedRoutes>}></Route>
        <Route path="/admin" element={<ProtectedRoutes><Admin /></ProtectedRoutes>}></Route>
        <Route path="/userdetails" element={<UserDetails name={name} password={password} emai={email} cart ={cart} />}></Route>
        <Route path="/adminorder" element={<AdminOrders/>}></Route>
        <Route path="/adminhome" element={<AdminHome/>}></Route>
      </Routes>
      <Footer/>
      <ToastContainer position="top-right" autoClose={2000} />

    </BrowserRouter>
    
  );
}

export default App;
