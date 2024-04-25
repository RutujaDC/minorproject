import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
function Home() {
    return (
        <div className="home-container">
            <h1 className="home-header">Welcome to Home Page</h1>
            <div className="home-buttons">
                <h2>Register or Login</h2>
                <div>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
                <div>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
