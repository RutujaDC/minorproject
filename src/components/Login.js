import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import getAuth and signInWithEmailAndPassword
import { app } from '../firebase'; // Import app from your firebase.js file
import {Link,useNavigate} from "react-router-dom";
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate =useNavigate();
  //const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth(app); // Get the auth instance from the Firebase app
      await signInWithEmailAndPassword(auth, email, password); // Use signInWithEmailAndPassword method
      console.log('User logged in successfully');
      setError('');
      navigate('/Dashboard');
    } catch (error) {
      setError(error.message);
      console.error('Login failed:', error.message);
      // If user is not registered, redirect to Register.js
      if (error.code === 'auth/user-not-found') {
        navigate('/Register');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
