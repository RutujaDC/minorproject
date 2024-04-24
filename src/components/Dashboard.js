import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate=useNavigate();

  const handleUploadClick = () => {
   navigate('/Upload');
  };
  const handleDownloadClick=()=>
  {
    navigate('/DownloadFile');
  };
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard!</p>
      <button onClick={handleUploadClick}>Upload File</button>
      <button onClick={handleDownloadClick}>Download File</button>
    </div>
  );
}

export default Dashboard;
