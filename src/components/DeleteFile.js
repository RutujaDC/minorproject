import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeleteFile({ email }) {
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [deletedFileName, setDeletedFileName] = useState('');
    const [error, setError] = useState(null);
    const [ipfsHash, setIpfsHash] = useState('');

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const username = 'root';
            const password = '1234';

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

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response.data, 'text/xml');
            const fileNodes = xmlDoc.getElementsByTagName('d:response');

            const fileList = Array.from(fileNodes).map(node => {
                const href = node.getElementsByTagName('d:href')[0].textContent;
                const fileName = href.substring(href.lastIndexOf('/') + 1);
                return fileName;
            });

            setFiles(fileList);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleToggleSelect = (fileName) => {
        const index = selectedFiles.indexOf(fileName);
        if (index === -1) {
            setSelectedFiles([...selectedFiles, fileName]);
        } else {
            const updatedSelectedFiles = [...selectedFiles];
            updatedSelectedFiles.splice(index, 1);
            setSelectedFiles(updatedSelectedFiles);
        }
    };

    const handleDeleteSelected = async () => {
        try {
            const username = 'root';
            const password = '1234';

            for (const fileName of selectedFiles) {
                await axios.delete(`http://localhost/remote.php/dav/files/root/${fileName}`, {
                    auth: {
                        username,
                        password
                    }
                });

                setDeletedFileName(fileName);

                // Create metadata
                const metadata = {
                    username: email,
                    filename: fileName,
                    timestamp: new Date().toISOString(),
                    action: 'delete'
                };
                const jsonData = JSON.stringify(metadata);
                const blob = new Blob([jsonData], { type: 'application/json' });

                // Upload metadata to IPFS
                const formData = new FormData();
                formData.append('file', blob);

                const ipfsUrl = 'http://127.0.0.1:5001/api/v0/add';
                const ipfsResponse = await axios.post(ipfsUrl, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                // Set IPFS hash
                setIpfsHash(ipfsResponse.data.Hash);
            }

            fetchFiles();
            setSelectedFiles([]);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <div className="file-list-container">
                <h2>Files in ownCloud</h2>
                <ul>
                    {files.map((fileName, index) => (
                        <li key={index} className="file-item">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedFiles.includes(fileName)}
                                    onChange={() => handleToggleSelect(fileName)}
                                />
                                {fileName}
                            </label>
                        </li>
                    ))}
                </ul>
                <button className="delete-button" onClick={handleDeleteSelected}>Delete Selected Files</button>
                {ipfsHash && <p>IPFS Hash: {ipfsHash}</p>}
                {error && <p>Error: {error}</p>}
            </div>
            {deletedFileName && (
                <div className="notification">
                    <p>{`${deletedFileName} has been deleted from ownCloud.`}</p>
                    {ipfsHash && <p>IPFS Hash: {ipfsHash}</p>}
                </div>
            )}
        </div>
    );
}

export default DeleteFile;
