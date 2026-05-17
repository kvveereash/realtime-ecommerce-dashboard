import React from 'react'
import './Blog.css'

function Blog() {
 const posts = [
    {
      title: "Hot-cross buns and Easter fun",
      desc: "If you thought Easter was all about chocolate, you're badly mistaken.",
      img: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec"
    },
    {
      title: "Tasty and healthy snacks for the road",
      desc: "Finding snacks that keep well and taste good is sometimes tricky.",
      img: "https://images.unsplash.com/photo-1543353071-873f17a7a088"
    },
    {
      title: "My first attempt at making pear desserts",
      desc: "Growing up, I always associated pears with fruit salad and nothing else.",
      img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3"
    },
    {
      title: "Sourdough baking 101",
      desc: "I actually jumped on the sourdough bandwagon way back in middle school.",
      img: "https://images.unsplash.com/photo-1509440159596-0249088772ff"
    },
    {
      title: "Oat cookies 5 ways",
      desc: "My granny used to throw oats in literally everything, and I take after her.",
      img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35"
    },
    {
      title: "Cold-brew ice tea with garden herbs",
      desc: "This summer has been pampering our herb garden, so I decided to experiment.",
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
    }
  ];

  return (
    <div className="blog">
      <h1 className="blog-title">Blog</h1>

      <div className="blog-grid">
        {posts.map((post, i) => (
          <div key={i} className="blog-card">
            <img src={post.img} alt={post.title} />

            <h3>{post.title}</h3>
            <p className="desc">{post.desc}</p>

            <span className="meta">6/10/2021 · 1 min read</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blog