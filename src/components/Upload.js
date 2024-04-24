import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        throw new Error('Please select a file');
      }

      const username = 'root';
      const password = '1234';
      const webDAVEndpoint = 'http://localhost/remote.php/dav/files/' + username + '/' + selectedFile.name;
      const authString = btoa(username + ':' + password);
      const headers = {
        Authorization: 'Basic ' + authString,
        'Content-Type': 'application/octet-stream', // Set the Content-Type header
      };

      const response = await axios.put(webDAVEndpoint, selectedFile, { headers });

      console.log('File uploaded successfully:', response.data);
      setUploadStatus('File uploaded successfully');
    } catch (error) {
      if (error.response) {
        console.error('File upload failed:', error.response.data);
        setUploadStatus('File upload failed: ' + error.response.data);
      } else if (error.message) {
        console.error('File upload failed:', error.message);
        setUploadStatus('File upload failed: ' + error.message);
      } else {
        console.error('File upload failed:', error);
        setUploadStatus('File upload failed');
      }
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}

export default Upload;
