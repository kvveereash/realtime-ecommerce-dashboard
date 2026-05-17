import "./Home.css";

function Home() {
  return (
    <div className="home">

  <section className="hero">
  <h1>
    My culinary journey <br /> from A to Z
  </h1>

  <p>
    Join me for daily reflections and delicious recipes
  </p>
</section>

      <section className="blog-grid">

        <div className="blog-card">
          <img src="assets/Homenew1.avif" alt="" />
          <h3>Hot-cross buns and Easter fun</h3>
          <p>If you thought Easter was all about chocolate, you're badly mistaken.</p>
          <span>6/10/2021 · 1 min read</span>
        </div>

        <div className="blog-card">
          <img src="assets/homenew3.avif" alt="" />
          <h3>Tasty and healthy snacks for the road</h3>
          <p>Finding snacks that keep well and taste good is sometimes tricky.</p>
          <span>6/10/2021 · 1 min read</span>
        </div>

       

        <div className="blog-card">
          <img src="assets/homenew4.avif" alt="" />
          <h3>Sourdough baking 101</h3>
          <p>I actually jumped on the sourdough bandwagon way back.</p>
          <span>6/10/2021 · 1 min read</span>
        </div>
      </section>

      <div className="more-btn">
        <button>More articles</button>
      </div>
        <section className="promo">
                <div className="promo-text">
                <h2>It’s official: The best of Thos</h2>
                <p>
                    You asked, we delivered. Thos’ best 100 recipes are now
                    available as a hardback and we deliver worldwide!
                </p>
                <button>Go to shop</button>
            </div>
            <div className="promo-img">
                <img src="assets/Home5.avif" alt="" />
            </div>

        </section>
        <section className="insta">
        <h2>Follow on Instagram @Thos</h2>
        <div className="insta-grid">
            <img src="assets/Home6.avif" alt="" />
            <img src="assets/Home7.avif" alt="" />
            <img src="assets/Home8.avif" alt="" />
            <img src="assets/Home9.avif" alt="" />
        </div>
        </section>

    </div>
  );
}

export default Home;