import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Add useNavigate hook

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth(app);
            await createUserWithEmailAndPassword(auth, email, password);
            
            // Log successful registration to console
            console.log('User registered successfully');
            
            // Navigate to the login page upon successful registration
            navigate('/login');
            
            // Clear any previous errors
            setError('');
        } catch (error) {
            // Handle errors and log the message
            setError(error.message);
            console.error('Registration failed:', error.message);
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-header">Register</h2>
            {error && <p>{error}</p>}
            <form className="register-form" onSubmit={handleRegister}>
                <input
                    type="email"
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
