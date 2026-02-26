import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import HeroCarousel from "../components/HeroCarousel";

/* ─── Inline styles (no extra CSS file needed) ───────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --cream: #f8f5f0;
    --charcoal: #1a1a1a;
    --gold: #c9a96e;
    --gold-light: #e8d5b0;
    --muted: #7a7570;
    --border: #e2ddd8;
  }

  .home-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--charcoal);
  }

  /* ── Trust Bar ── */
  .trust-bar {
    background: var(--charcoal);
    color: var(--gold-light);
    text-align: center;
    font-size: 0.78rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 10px 0;
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
  }

  /* ── Hero ── */
  .hero-section {
    position: relative;
    background: var(--cream);
    padding: 80px 24px 96px;
    text-align: center;
    overflow: hidden;
  }

  .hero-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 50% at 50% 60%, #e8d5b020 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-eyebrow {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 20px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .hero-eyebrow::before,
  .hero-eyebrow::after {
    content: '';
    display: inline-block;
    width: 28px;
    height: 1px;
    background: var(--gold);
  }

  .hero-headline {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(3rem, 8vw, 6.5rem);
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--charcoal);
    margin: 0 0 12px;
  }

  .hero-headline em {
    font-style: italic;
    color: var(--gold);
  }

  .hero-subtext {
    font-size: 1rem;
    color: var(--muted);
    max-width: 440px;
    margin: 0 auto 36px;
    line-height: 1.7;
    font-weight: 300;
  }

  .hero-cta-group {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-primary {
    background: var(--charcoal);
    color: #fff;
    padding: 14px 36px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    text-decoration: none;
    border: 1px solid var(--charcoal);
    transition: background 0.25s, color 0.25s;
    display: inline-block;
  }

  .btn-primary:hover {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--charcoal);
  }

  .btn-outline {
    background: transparent;
    color: var(--charcoal);
    padding: 14px 36px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    text-decoration: none;
    border: 1px solid var(--charcoal);
    transition: background 0.25s, color 0.25s;
    display: inline-block;
  }

  .btn-outline:hover {
    background: var(--charcoal);
    color: #fff;
  }

  /* ── Section Wrapper ── */
  .section-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 72px 24px;
  }

  .section-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 40px;
    border-bottom: 1px solid var(--border);
    padding-bottom: 16px;
  }

  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 400;
    letter-spacing: 0.02em;
    color: var(--charcoal);
  }

  .section-link {
    font-size: 0.78rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gold);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: gap 0.2s;
  }

  .section-link:hover { gap: 12px; }

  /* ── Category Grid ── */
  .category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
  }

  /* ── Products Grid ── */
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 28px;
  }

  /* ── New Arrivals Banner ── */
  .banner-section {
    background: var(--charcoal);
    padding: 72px 24px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .banner-section::before {
    content: 'NEW';
    position: absolute;
    font-family: 'Cormorant Garamond', serif;
    font-size: 18vw;
    font-weight: 600;
    color: rgba(255,255,255,0.03);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
  }

  .banner-eyebrow {
    font-size: 0.72rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 16px;
  }

  .banner-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 300;
    color: #fff;
    margin: 0 0 12px;
    line-height: 1.15;
  }

  .banner-headline em {
    font-style: italic;
    color: var(--gold);
  }

  .banner-sub {
    color: #a09890;
    font-size: 0.95rem;
    max-width: 400px;
    margin: 0 auto 32px;
    font-weight: 300;
    line-height: 1.7;
  }

  /* ── Features Bar ── */
  .features-bar {
    background: #fff;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .features-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 24px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 32px;
    text-align: center;
  }

  .feature-item {}

  .feature-icon {
    font-size: 1.6rem;
    margin-bottom: 10px;
  }

  .feature-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.05rem;
    font-weight: 600;
    margin: 0 0 4px;
    color: var(--charcoal);
  }

  .feature-desc {
    font-size: 0.82rem;
    color: var(--muted);
    font-weight: 300;
    line-height: 1.5;
  }

  /* ── Testimonials ── */
  .testimonials-section {
    background: var(--cream);
  }

  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  }

  .testimonial-card {
    background: #fff;
    border: 1px solid var(--border);
    padding: 32px;
    position: relative;
  }

  .testimonial-quote {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3rem;
    color: var(--gold-light);
    line-height: 0.6;
    margin-bottom: 16px;
    display: block;
    font-weight: 300;
  }

  .testimonial-text {
    font-size: 0.92rem;
    color: var(--charcoal);
    line-height: 1.7;
    font-style: italic;
    margin: 0 0 20px;
    font-family: 'Cormorant Garamond', serif;
    font-weight: 400;
  }

  .testimonial-author {
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    font-weight: 400;
  }

  .testimonial-stars {
    color: var(--gold);
    font-size: 0.8rem;
    margin-bottom: 12px;
  }

  /* ── Newsletter ── */
  .newsletter-section {
    background: #f0ebe4;
    padding: 80px 24px;
    text-align: center;
  }

  .newsletter-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.4rem;
    font-weight: 300;
    margin: 0 0 10px;
  }

  .newsletter-sub {
    font-size: 0.9rem;
    color: var(--muted);
    margin: 0 0 32px;
    font-weight: 300;
  }

  .newsletter-form {
    display: flex;
    max-width: 480px;
    margin: 0 auto;
    border: 1px solid var(--charcoal);
  }

  .newsletter-input {
    flex: 1;
    padding: 14px 20px;
    border: none;
    background: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    outline: none;
    color: var(--charcoal);
  }

  .newsletter-input::placeholder { color: #b0a89e; }

  .newsletter-btn {
    background: var(--charcoal);
    color: #fff;
    padding: 14px 28px;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
    white-space: nowrap;
  }

  .newsletter-btn:hover { background: var(--gold); color: var(--charcoal); }

  /* ── Footer Strip ── */
  .footer-strip {
    background: var(--charcoal);
    color: #a09890;
    padding: 24px;
    text-align: center;
    font-size: 0.78rem;
    letter-spacing: 0.1em;
  }

  /* ── Loading shimmer ── */
  .loading-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 28px;
  }

  .shimmer-card {
    height: 320px;
    background: linear-gradient(90deg, #e8e0d8 25%, #f0e8e0 50%, #e8e0d8 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
    border-radius: 2px;
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

/* ─── Newsletter sub-component ─────────────────────────────────────── */
const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="newsletter-section">
      <p className="hero-eyebrow" style={{ justifyContent: "center" }}>
        Exclusive Access
      </p>
      <h2 className="newsletter-title">Stay Ahead of Every Drop</h2>
      <p className="newsletter-sub">
        Join our inner circle for early access, style edits, and members-only
        offers.
      </p>
      {submitted ? (
        <p
          style={{
            color: "var(--gold)",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.2rem",
            fontStyle: "italic",
          }}
        >
          Welcome to the circle. ✦
        </p>
      ) : (
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            className="newsletter-input"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="newsletter-btn" type="submit">
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
};

/* ─── Main Component ────────────────────────────────────────────────── */
const Home = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const trending = items.slice(0, 6);

  return (
    <>
      <style>{styles}</style>
      <div className="home-root">

        {/* ── Announcement Bar ── */}
        <div className="trust-bar">
          ✦ Free shipping on orders over $75 &nbsp;·&nbsp; New season arrivals
          now live &nbsp;·&nbsp; Easy 30-day returns ✦
        </div>

        {/* ── Hero Carousel ── */}
        <HeroCarousel />

        {/* ── Hero Copy ── */}
        <section className="hero-section">
          <p className="hero-eyebrow">New Season Collection</p>
          <h1 className="hero-headline">
            Dress with
            <br />
            <em>Intention.</em>
          </h1>
          <p className="hero-subtext">
            Curated pieces that blend timeless craft with contemporary edge.
            Built to last, designed to turn heads.
          </p>
          <div className="hero-cta-group">
            <Link to="/products" className="btn-primary">
              Shop the Collection
            </Link>
            <Link to="/products?search=new" className="btn-outline">
              New Arrivals
            </Link>
          </div>
        </section>

        {/* ── Features Bar ── */}
        <div className="features-bar">
          <div className="features-inner">
            {[
              {
                icon: "🚚",
                title: "Free Shipping",
                desc: "On all orders above $75",
              },
              {
                icon: "↩️",
                title: "Easy Returns",
                desc: "Hassle-free 30-day policy",
              },
              {
                icon: "🔒",
                title: "Secure Checkout",
                desc: "256-bit SSL encryption",
              },
              {
                icon: "✦",
                title: "Premium Quality",
                desc: "Ethically sourced materials",
              },
            ].map((f) => (
              <div className="feature-item" key={f.title}>
                <div className="feature-icon">{f.icon}</div>
                <p className="feature-title">{f.title}</p>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Featured Categories ── */}
        <section className="section-wrapper">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <Link to="/products" className="section-link">
              All Categories →
            </Link>
          </div>
          <div className="category-grid">
            <CategoryCard
              title="Shoes"
              img="https://images.unsplash.com/photo-1606813902911-9b52b6d99035"
              link="/products?category=shoes"
            />
            <CategoryCard
              title="Clothing"
              img="https://images.unsplash.com/photo-1523381294911-8d3cead13475"
              link="/products?category=Clothing"
            />
            <CategoryCard
              title="Accessories"
              img="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
              link="/products?category=Accessories"
            />
          </div>
        </section>

        {/* ── New Arrivals Banner ── */}
        <div className="banner-section">
          <p className="banner-eyebrow">Just Dropped</p>
          <h2 className="banner-headline">
            The <em>New Arrivals</em>
            <br />
            Are Here
          </h2>
          <p className="banner-sub">
            Fresh styles added weekly. Be the first to wear what's next.
          </p>
          <Link to="/products?search=new" className="btn-primary">
            Explore New Arrivals
          </Link>
        </div>

        {/* ── Trending Products ── */}
        <section className="section-wrapper">
          <div className="section-header">
            <h2 className="section-title">Trending Now</h2>
            <Link to="/products" className="section-link">
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="loading-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div className="shimmer-card" key={i} />
              ))}
            </div>
          ) : (
            <div className="products-grid">
              {trending.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* ── Testimonials ── */}
        <section
          className="section-wrapper testimonials-section"
          style={{ background: "#f0ebe4" }}
        >
          <div className="section-header">
            <h2 className="section-title">What Our Customers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              {
                text: "Absolutely obsessed with the quality. Every piece feels like it was made just for me. Will never shop anywhere else.",
                author: "Sofia M. — Verified Buyer",
                stars: 5,
              },
              {
                text: "The packaging alone made it feel like a luxury experience. The jacket I ordered is stunning — got compliments all week.",
                author: "James R. — Verified Buyer",
                stars: 5,
              },
              {
                text: "Fast shipping, perfect fit, and the customer service team went above and beyond. 10/10 recommend.",
                author: "Priya K. — Verified Buyer",
                stars: 5,
              },
            ].map((t) => (
              <div className="testimonial-card" key={t.author}>
                <div className="testimonial-stars">{"★".repeat(t.stars)}</div>
                <span className="testimonial-quote">"</span>
                <p className="testimonial-text">{t.text}</p>
                <p className="testimonial-author">{t.author}</p>
              </div>
            ))}
          </div>
        </section>

       {/* / ── Newsletter ──
        <NewsletterForm > */}

        {/* ── Footer Strip ── */}
       
      </div>
    </>
  );
};

export default Home;