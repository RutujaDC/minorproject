import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = () => {
        // Perform logout logic here, such as clearing authentication data
        // For example, you could clear user tokens, reset state, etc.
        
        // Navigate to the login page
        navigate('/login');
    };

    const handleUploadClick = () => {
        navigate('/upload');
    };

    const handleDownloadClick = () => {
        navigate('/downloadfile');
    };
    
    const handleDeleteClick = () => {
        navigate('/DeleteFile');
    };

    // Optional: Automatically log out the user after a certain period of inactivity
    useEffect(() => {
        const timer = setTimeout(() => {
            handleLogout();
        }, 60000); // Log out the user after 60 seconds of inactivity

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-header">Dashboard</h2>
            <p>Welcome to your dashboard!</p>
            <div className="dashboard-buttons">
                <button onClick={handleUploadClick}>Upload File</button>
                <button onClick={handleDownloadClick}>Download File</button>
                <button onClick={handleDeleteClick}>Delete File</button>
                {/* Logout button */}
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Dashboard;
