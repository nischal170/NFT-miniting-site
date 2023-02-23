import logo from './logo.svg';
import {useEffect, useState} from "react";
import detectEthereumProvider from '@metamask/detect-provider';
import './App.css';
import { ethers } from "ethers";
import smartContract from "./contract/nftContract.json";
import { Button } from 'react-bootstrap';



function App() {
  const[address,setAddress]=useState("Address of the Wallet is shown here after it connects to the Wallet")
  const[result,setResult]=useState("This shows result")
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
 

  const contractAddress = "0x23026Ba3Fa8B7C9735589F3b2a2a5D094Ac82d14";
  useEffect(() => {
    if (provider && !contract) initContract();
    else init();
    console.log("init called");
  }, [provider]);

  
  const init =async () =>{
    const provider = await detectEthereumProvider();
    if (provider) {
      provider.enable();
      //setProvider(provider)
    } else {
      console.log('Please install MetaMask!');
    }
    
    function startApp(provider) {
      if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');
      }
    }
    provider.request({ method: 'eth_accounts' }).then(handleAccountsChanged).catch((err) => {
    console.error(err);
  });
 provider.on('accountsChanged', handleAccountsChanged);
 function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {

    console.log('Please connect to MetaMask.');
  } 
  else if (accounts[0] !== address) {
    setAddress(accounts[0]);

  }
} 
}
const callRandomNumber =async () =>{
  const result = await contract.randomNumber();
  console.log(`Random number: ${result}`);
  setResult(result)
}

const initContract = async () => {
  if (provider) {
    console.log("provider", provider);

    // Get the provider and signer from the browser window
    const metamaskProvider = new ethers.providers.Web3Provider(provider);
    const signer = metamaskProvider.getSigner();

    const smartCont = new ethers.Contract(
      contractAddress,
      smartContract,
      signer
    );

    setContract(smartCont);
    console.log("Contract Obj", smartCont);
  }
};
  

  return (
    <div>
      
      <p>{address}</p>
      <button onClick={init}>Connect wallet</button>
      <button onClick={initContract}>Connect wallet</button>
      <button onClick={callRandomNumber}>Generate NFT</button>
      <h1>{result}</h1>
    </div>
  );
}

export default App;