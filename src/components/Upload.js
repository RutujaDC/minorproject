import React, { useState } from 'react';
import axios from 'axios';
let n;
function Upload({ email }) {
    n={email};
    console.log(n);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [ipfsHash, setIpfsHash] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const uploadToOwnCloud = async () => {
        try {
            if (!selectedFile) {
                throw new Error('Please select a file');
            }

            const username = 'root'; // Replace with your ownCloud username
            const password = '1234'; // Replace with your ownCloud password
            const webDAVEndpoint = 'http://localhost/remote.php/dav/files/' + username + '/' + selectedFile.name;
            const authString = btoa(username + ':' + password);
            const headers = {
                Authorization: 'Basic ' + authString,
                'Content-Type': 'application/octet-stream', // Set the Content-Type header
            };

            const response = await axios.put(webDAVEndpoint, selectedFile, { headers });

            console.log('File uploaded successfully to OwnCloud:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error uploading file to OwnCloud:', error);
            throw error;
        }
    };

    const createMetadataFile = async (email, filename) => { // Corrected function signature
        try {
            const metadata = {
                username: email, // Assign email directly to the username field
                filename: filename,
                timestamp: new Date().toISOString(),
                action: 'upload'
            };
    
            const jsonData = JSON.stringify(metadata);
            const blob = new Blob([jsonData], { type: 'application/json' });
            return new File([blob], 'metadata.json', { type: 'application/json' });
        } catch (error) {
            console.error('Error creating metadata file:', error);
            throw error;
        }
    };
    
    const uploadToIPFS = async (fileContent) => {
        try {
            const formData = new FormData();
            formData.append('file', fileContent);

            const ipfsUrl = 'http://127.0.0.1:5001/api/v0/add';
            const response = await axios.post(ipfsUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('File uploaded to IPFS:', response.data);
            return response.data.Hash;
        } catch (error) {
            console.error('Error uploading file to IPFS:', error);
            throw error;
        }
    };

    
const handleUpload = async () => {
    try {
        const ownCloudResponse = await uploadToOwnCloud();
        const metadataFile = await createMetadataFile(email, selectedFile.name); // Pass email directly
        const ipfsHash = await uploadToIPFS(metadataFile);
        setIpfsHash(ipfsHash);
        setUploadStatus('File uploaded to OwnCloud, and metadata uploaded successfully to IPFS.');
    } catch (error) {
        console.error('Error handling upload:', error);
        setUploadStatus('Error uploading file.');
    }
};
    return (
        <div className="upload-container">
            <h2 className="upload-header">Upload File</h2>
            <div className="upload-form">
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>
            {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
            {ipfsHash && <p className="ipfs-hash">IPFS Hash: {ipfsHash}</p>}
        </div>
    );
}

export default Upload;
