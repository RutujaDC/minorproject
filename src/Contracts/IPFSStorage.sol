// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IPFSStorage {
    mapping(address => string) public ipfsHashes;

    event HashStored(address indexed user, string ipfsHash);

    function storeHash(string memory hash) public {
        ipfsHashes[msg.sender] = hash;
        emit HashStored(msg.sender, hash);
    }

    function getHash(address user) public view returns (string memory) {
        return ipfsHashes[user];
    }
}
