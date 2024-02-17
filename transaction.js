const ethers = require('ethers');
const fetch = require('node-fetch');

async function main() {

  let privatekey = 'Put here Your metamask wallet Private key';
  let wallet = new ethers.Wallet(privatekey);

  console.log('Using wallet address ' + wallet.address);

  let transaction = {
    to: 'Your metamask wallet addresss',
    value: ethers.utils.parseEther('1'),
    gasLimit: '21000',
    maxPriorityFeePerGas: ethers.utils.parseUnits('5', 'gwei'),
    maxFeePerGas: ethers.utils.parseUnits('20', 'gwei'),
    nonce: 1,
    type: 2,
    chainId: 11155111
  };

  let rawTransaction = await wallet.signTransaction(transaction).then(ethers.utils.serializeTransaction(transaction));
  console.log('Raw txhash string ' + rawTransaction);

  // pass the raw transaction hash to the "eth_sendRawTransaction" endpoint
  let gethProxy = await fetch(`https://api-sepolia.etherscan.io/api?module=proxy&action=eth_sendRawTransaction&hex=${rawTransaction}&apikey= Your Etherescan API key`);    
  let response = await gethProxy.json();    
     
  // print the API response
  console.log(response);
  
}

main();
