import React from 'react';
import { ethers } from 'ethers';
import ContractAbi from './ContractAbi.json';

const Transfer = () => {
  let contractAddress = '0xf34b643b1b16e6fdd1b3a4e46dac238430a371dc';

  const startTransfer = () => {
    //connect to metamask
    if(window.ethereum){
        window.ethereum.request({method: 'eth_requestAccounts'})
        .then(result => {
            console.log("Wallet connected");
            //define provider
            let provider = new ethers.providers.Web3Provider(window.ethereum);
            //define contract
            let contract = new ethers.Contract(contractAddress, ContractAbi, provider);
            //start transaction
            console.log(result[0]); //address of client
            const signer = provider.getSigner();        //get signer
            const DIASigner = contract.connect(signer);     //connect contract to signer
            let tx = DIASigner.transfer("0x15433DA387451F9dE4565280C85506CB71aF9376", ethers.utils.parseUnits("10.0", 18));
            console.log("Transaction Hash: " + tx);
        })
    }else{
        console.log("You need to install MetaMask");
    }
  }

  return (
      <div>
        <h2>Make Transaction</h2>
        <button onClick={startTransfer}>Start Transaction</button>
      </div>
  )
}

export default Transfer;
