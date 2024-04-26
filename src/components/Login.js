import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase';
import '../styles.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate('/Register');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully');
      setError('');
      navigate('/Dashboard');
    } catch (error) {
      setError(error.message);
      console.error('Login failed:', error.message);
      if (error.code === 'auth/user-not-found') {
        navigate('/Register');
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <div>
          <p>if not registered?</p>
          <button
            onClick={handleRegisterClick}
            className="button-blue"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
