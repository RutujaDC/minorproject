import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import getAuth and createUserWithEmailAndPassword
import { app } from '../firebase'; // Import app from your firebase.js file

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth(app); // Get the auth instance from the Firebase app
      await createUserWithEmailAndPassword(auth, email, password); // Use createUserWithEmailAndPassword method
      console.log('User registered successfully');
      setError('');
    } catch (error) {
      setError(error.message); // Use error.message instead of error.meAssage
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
