import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';

import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Upload from './components/Upload';
import DownloadFile from './components/DownloadFile';
import { AuthProvider } from './components/AuthContext';
import './styles.css'
function App() {
   
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
            <Route path="/Dashboard" element={<ProtectedRoute element={Dashboard} />} />
        

                    <Route path="/Upload" element={<Upload />} />
                    <Route path="/DownloadFile" element={<DownloadFile />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
