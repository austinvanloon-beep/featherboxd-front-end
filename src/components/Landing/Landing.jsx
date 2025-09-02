import './Landing.css';

const Landing = () => {
  return (
    <div className="image-border-wrapper"> 
      <div className="landing-page">
        
        {/* Hero Section */}
        <main className="hero-section">
          <div className="greeting-box">
            <h1>Welcome to FeatherBOXD</h1>
            <p>Register now or sign in to access national and local bird sightings!</p>
            <div className="cta-buttons">
              <a href="/sign-up" className="btn primary">Register</a>
              <a href="/sign-in" className="btn secondary">Sign In</a>
            </div>
          </div>
        </main>

        {/* Footer with social/contact info */}
        <footer className="footer">
          <p>© 2025 | Follow us:
            <a href="#"> X</a> •
            <a href="#"> Facebook</a>
            <a href="#"> Instagram</a>
            <a href="#"> YouTube</a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;


