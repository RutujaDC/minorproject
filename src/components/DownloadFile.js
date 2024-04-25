import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DownloadFile = () => {
    const [fileList, setFileList] = useState([]);
    const [selectedFile, setSelectedFile] = useState('');

    useEffect(() => {
        // Fetch file list when component mounts
        fetchFileList();
    }, []);

    const fetchFileList = async () => {
        try {
            // Make a request to fetch the file list from ownCloud
            const response = await axios.get('http://localhost/remote.php/dav/files/username/');
            // Extract file names from the response
            const files = response.data.match(/<d:displayname>(.*?)<\/d:displayname>/g)
                .map(match => match.replace(/<\/?d:displayname>/g, ''));
            setFileList(files);
        } catch (error) {
            console.error('Error fetching file list:', error);
        }
    };

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.value);
    };

    const handleDownload = async () => {
        try {
            // Download the selected file
            const response = await axios.get(`http://localhost/remote.php/dav/files/username/${selectedFile}`, {
                responseType: 'blob', // Set responseType to 'blob' to receive binary data
            });
            // Create a URL for the blob data
            const url = window.URL.createObjectURL(new Blob([response.data]));
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', selectedFile);
            // Simulate a click on the link to trigger the download
            document.body.appendChild(link);
            link.click();
            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <div className="download-file-container">
            <h2 className="download-file-header">Download File</h2>
            <select className="download-file-select" onChange={handleFileSelect}>
                <option value="">Select a file</option>
                {fileList.map(fileName => (
                    <option key={fileName} value={fileName}>
                        {fileName}
                    </option>
                ))}
            </select>
            <button className="download-file-button" onClick={handleDownload} disabled={!selectedFile}>
                Download
            </button>
            {selectedFile && (
                <p className="selected-file-text">Selected file: {selectedFile}</p>
            )}
        </div>
    );
};

export default DownloadFile;
