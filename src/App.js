// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute component from the components folder
import Register from './components/Register'; // Import Register component from the components folder
import Login from './components/Login'; // Import Login component from the components folder
import Dashboard from './components/Dashboard'; // Import Dashboard component from the components folder
import Home from './components/Home'; // Import Home component from the components folder
import firebase from './firebase'; // Import firebase.js from the src folder
import Upload from './components/Upload';
import DownloadFile from './components/DownloadFile';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Dashboard"element={<Dashboard/>} />
        <Route path="/Upload" element={<Upload/>} /> 
        <Route path="/DownloadFile" element={<DownloadFile/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
