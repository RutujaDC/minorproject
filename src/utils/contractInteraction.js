import Web3 from 'web3';

// Replace 'YourContractABI' with your actual ABI
const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"name": "HashStored",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			}
		],
		"name": "storeHash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getHash",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "ipfsHashes",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
// Replace 'YourContractAddress' with your actual contract address
const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';

// Initialize Web3 with your local Ethereum node URL
const web3 = new Web3('http://localhost:8545');

// Get the contract instance
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

// Example function to call a contract method
async function getHash(userAddress) {
    try {
        // Call the 'getHash' function of your contract
        const hash = await contractInstance.methods.getHash(userAddress).call();

        console.log('IPFS hash:', hash);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Example function to call a contract method that requires sending a transaction
async function storeHash(hash) {
    try {
        // Replace with an Ethereum account address that has funds
        const senderAddress = '0xa06ef5A49b1631F130Fb3963A6b545025dBEE6B7';

        // Replace with a private key corresponding to the sender address
        const privateKey = 'YourPrivateKey';

        // Create a transaction object
        const txObject = {
            from: senderAddress,
            to: contractAddress,
            gas: 2000000,
            data: contractInstance.methods.storeHash(hash).encodeABI(),
        };

        // Sign the transaction
        const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);

        // Send the signed transaction
        const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        console.log('Transaction receipt:', txReceipt);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Example usage
getHash('0xUserAddress');
storeHash('YourIPFSHash');
