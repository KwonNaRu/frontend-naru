import React from "react";
import "../styles/LandingPage.scss"; // 스타일시트 임포트
import Logo from "../components/Logo";
import { NavLink } from "react-router-dom";

const LandingPage: React.FC = () => {
    return (
        <div className="landing-container">
            <header className="landing-header">
                <Logo />
                <h1>Welcome to Naru's blog</h1>
                <div className="landing-header-btn-wrapper">
                    <NavLink to="/signup" className="btn-primary">
                        Sign Up
                    </NavLink>
                    <NavLink to="/signin" className="btn-secondary">
                        Sign In
                    </NavLink>
                </div>
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
    );
};

export default LandingPage;
