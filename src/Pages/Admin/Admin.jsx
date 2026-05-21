import React, { useEffect, useState } from 'react'
import './Admin.css'
import { toast } from 'react-toastify';

function Admin() {

    const [editid, seteditid] = useState(null);
    const [form, setform] = useState({
        name: "",
        price: "",
        image: "",
        description: "",
        stock:0
    });
    const [product, setproduct] = useState([]);

    const fetchproducts = async () => {
        try {
            const res = await fetch(
                "https://realtime-ecommerce-dashboard-1.onrender.com/products"
            );
            const data = await res.json();
            setproduct(data);
            console.log(data);
        }
        catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchproducts();
    }, []);
 
    const handlechange = (e) => {
        setform({
            ...form,
            [e.target.name]:
            e.target.name === "price" || e.target.name  === "stock" ? Number(e.target.value):e.target.value
        })
    }

    const handledelete = async (id) => {
        try {
            await fetch(
                `https://realtime-ecommerce-dashboard-1.onrender.com/${id}`,
                {
                    method: "DELETE"
                }
            )
            toast.success("Product Deleted");
            fetchproducts();
        }
        catch (error) {
            console.log(error.message)
        }
    }


    const handleedit = (product) => {
        setform({
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
            stock:product.stock
        });
        seteditid(product._id)
    }



    const handleAddProduct = async () => {

        if(form.stock<0)
        {
            console.log("Invalid Stock")
            return;
        }

        try {
            if (editid) {
                await fetch(
                    `https://realtime-ecommerce-dashboard-1.onrender.com/${editid}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(form)
                    }
                )
                toast.success("Product Updated");
            }

            else {

                await fetch(
                    "https://realtime-ecommerce-dashboard-1.onrender.com/products",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(form)
                    }
                )
                toast.success("Product Added");
            }

            setform({
                name: "",
                price: "",
                image: "",
                description: "",
                stock:0
            })
            seteditid(null);
            fetchproducts();
        }
        catch (error) {
            console.log(error);

        }

    }
 return (

    <div className="admin-page">
        <div className="admin-header">
            <div>
                <h1 className="admin-title">Admin Products</h1>
                <p className="admin-subtitle">  Manage your ecommerce products  </p>
            </div>
        </div>

        <div className="admin-top-section">
            <div className="admin-form-container">
                <div className="admin-form">
                    <h2 className="form-title"> {editid ? "Update Product" : "Add Product"} </h2>
                    <input type="text"  name="name" value={form.name} onChange={handlechange}  placeholder="Product Name" />
                    <input type="number"  name="price" value={form.price}  onChange={handlechange} placeholder="Price" />
                    <input type="text"   name="image" value={form.image} onChange={handlechange} placeholder="Image URL"/>
                    <textarea  name="description" value={form.description}  onChange={handlechange}  placeholder="Description" min="0"   ></textarea>
                    <input type="number" name='stock' value={form.stock} placeholder="Stock"onChange={handlechange}/>
                    <button onClick={handleAddProduct}> {editid ? "Update Product" : "Add Product"}  </button>
             </div>
            </div>

            <div className="admin-side-panel">
                <div className="admin-mini-card">
                    <h1>{product.length}</h1>
                    <p>Total Products</p>
                </div>
                <div className="admin-mini-card">
                    <h1>₹25K</h1>
                    <p>Total Revenue</p>
                </div>
                <div className="search-box">
                    <input  type="text"  placeholder="Search products..."/>
                </div>
            </div>
        </div>
        <div>
        </div>



        <div className="admin-grid">
            {product.map((p) => (
                <div className="admin-card" key={p._id}>
                    <div className="admin-image-box">
                        <img
                            src={
                                p.image ||
                                "https://via.placeholder.com/300"
                            }
                            alt={p.name}
                        />
                    </div>
                    <div className="admin-content">
                        <div className="admin-category">Premium Food</div>
                        <h3>{p.name}</h3>
                        <p className="admin-price">₹{p.price}</p>
                        <p className="admin-desc">{p.description} </p>
                        <p className="admin-stock" style={{color:p.stock === 0? "red": p.stock < 5? "orange": "green"}}> {p.stock===0 ? "Out Of Stock": `Stock:${p.stock}`}</p>
                    </div>
                    <div className="admin-actions">
                        <button  className="delete-btn" onClick={() => handledelete(p._id)} >Delete</button>
                        <button  className="edit-btn"  onClick={() => handleedit(p)} > Edit</button>
                    </div>
                </div>

            ))}

        </div>

    </div>

)
}

export default Admin