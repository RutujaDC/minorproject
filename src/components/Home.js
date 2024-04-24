import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <div>
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
