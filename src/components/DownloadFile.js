import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';

function DownloadFile({ email }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [ipfsHash, setIpfsHash] = useState('');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        // Replace 'your-username' and 'your-password' with your ownCloud credentials
        const username = 'root';
        const password = '1234'; // Provide your ownCloud password here
        
        // Use axios to make a PROPFIND request to the WebDAV endpoint
        const response = await axios.request({
          method: 'PROPFIND',
          url: 'http://localhost/remote.php/dav/files/root/',
          auth: {
            username,
            password
          },
          headers: {
            'Content-Type': 'application/xml'
          }
        });

        // Extract file information from the response XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');
        const fileNodes = xmlDoc.getElementsByTagName('d:response');

        // Extract file names and hrefs from fileNodes and update state
        const fileList = Array.from(fileNodes).map(node => {
          const href = node.getElementsByTagName('d:href')[0].textContent;
          const fileName = href.substring(href.lastIndexOf('/') + 1); // Extract file name from full path
          const fullURL = 'http://localhost' + href; // Concatenate with base URL
          return {
            name: fileName,
            href: fullURL
          };
        });
        
        setFiles(fileList);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchFiles();
  }, []);

  const handleSelectFile = (fileName) => {
    const index = selectedFiles.indexOf(fileName);
    if (index === -1) {
      setSelectedFiles([...selectedFiles, fileName]);
    } else {
      const updatedSelectedFiles = [...selectedFiles];
      updatedSelectedFiles.splice(index, 1);
      setSelectedFiles(updatedSelectedFiles);
    }
  };

  const handleDownloadSelected = async () => {
    try {
      // Replace 'your-username' and 'your-password' with your ownCloud credentials
      const username = 'root';
      const password = '1234'; // Provide your ownCloud password here

      // Create an array to store promises for each file download
      const downloadPromises = selectedFiles.map(async (fileName) => {
        const file = files.find(file => file.name === fileName);
        if (file) {
          // Use axios to make a GET request to download the file using its href
          const response = await axios.get(file.href, {
            auth: {
              username,
              password
            },
            responseType: 'blob', // Set the response type to blob for binary data
          });

          // Create a download link and trigger download
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Create metadata
          const metadata = {
            username: email,
            filename: fileName,
            timestamp: new Date().toISOString(),
            action: 'download'
          };
          const jsonData = JSON.stringify(metadata);
          const blob = new Blob([jsonData], { type: 'application/json' });
          const metadataFile = new File([blob], 'metadata.json', { type: 'application/json' });

          // Upload metadata to IPFS
          const formData = new FormData();
          formData.append('file', metadataFile);

          const ipfsUrl = 'http://127.0.0.1:5001/api/v0/add';
          const ipfsResponse = await axios.post(ipfsUrl, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          // Set IPFS hash
          setIpfsHash(ipfsResponse.data.Hash);
        }
      });

      // Wait for all download promises to complete
      await Promise.all(downloadPromises);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="file-list-container">
      <h2>Files in ownCloud</h2>
      <ul className="file-list">
        {files.map((file, index) => (
          <li key={index} className="file-item">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedFiles.includes(file.name)}
                onChange={() => handleSelectFile(file.name)}
              />
              {file.name}
            </label>
          </li>
        ))}
      </ul>
      <button className="download-button" onClick={handleDownloadSelected}>Download Selected</button>
      {ipfsHash && <p>IPFS Hash: {ipfsHash}</p>}
      {error && <p className="error-message">Error: {error}</p>}
    </div>
  );
}

export default DownloadFile;
