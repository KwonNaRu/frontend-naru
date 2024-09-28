import React from "react"
import "../styles/LandingPage.scss" // 스타일시트 임포트

const LandingPage: React.FC = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Welcome to Our Platform</h1>
        <p>Your one-stop solution for everything you need.</p>
        <a href="/signup" className="btn-primary">
          Get Started
        </a>
      </header>
      <section className="landing-features">
        <div className="feature">
          <h2>Feature 1</h2>
          <p>Discover amazing features that will enhance your experience.</p>
        </div>
        <div className="feature">
          <h2>Feature 2</h2>
          <p>Seamless integration with your favorite tools and services.</p>
        </div>
        <div className="feature">
          <h2>Feature 3</h2>
          <p>High performance and reliability with top-notch security.</p>
        </div>
      </section>
      <footer className="landing-footer">
        <p>&copy; 2024 Our Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default LandingPage
