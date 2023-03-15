/* eslint-disable */

// Import React package
import React from "react";

// Import component CSS style
import "./App.css";

// Import helper functions
import getWeb3 from "../helpers/getWeb3";

//////////////////////////////////////////////////////////////////////////////////|
//        CONTRACT ADDRESS           &          CONTRACT ABI                      |
//////////////////////////////////////////////////////////////////////////////////|                                                             |
const CONTRACT_ADDRESS = require("../contracts/SimpleStorage.json").networks[1337].address
const CONTRACT_ABI = require("../contracts/SimpleStorage.json").abi;
const CONTRACT_NAME = require("../contracts/SimpleStorage.json").contractName

export default class App extends React.Component {
  state = { web3Provider: null, accounts: null, networkId: null, contract: null, storageValue: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the network ID
      const networkId = await web3.eth.net.getId();

      // Create the Smart Contract instance
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3Provider: web3, accounts: accounts, networkId: networkId, contract: contract });

      // Get the value from the contract to prove it worked and update storageValue state
      this.getMethod()
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };


  //TODO: set method to interact with Storage Smart Contract
  setMethod = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    const transaction = await contract.methods.set(5).send({ from: accounts[0] })
    console.log(transaction)

    // Get the updated value from the contract and updates storageValue state
    this.getMethod()
  }

  //TODO: get function to interact with Storage Smart Contract
  getMethod = async () => {
    const { contract } = this.state;

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();
    this.setState({ storageValue: response })
  }

  render() {
    if (!this.state.web3Provider) {
      return <div className="App-no-web3">
        <h3>No Web3 connection... 🧐</h3>
        <p>Jump to the next chapter to configure the Web3 Provider.</p>
        <h3>Let's go! ⏭️</h3>
      </div>;
    }
    return (
      <div className="App">

        {/* ------------------- Simple Storage example ------------------- */}
        <div className="App-simplestorage-example">

          {/* DApp Header */}
          <h1>Ready to go! 🚀</h1>
          <p> Your Truffle Box has been succesfully installed ⚙️ </p>
          <p> The default Smart Contract has been compiled and deployed on testnet 🧪 </p>
          <br />

          {/* DApp Information */}
          <h2>Smart Contract: SimpleStorage.sol 🧮</h2>
          <p>Contract address: {CONTRACT_ADDRESS}</p>
          <p>
            If your contracts compiled and migrated successfully, below will show
            a stored value of 1 (by default).
          </p>
          <h3>Contract stored value: {this.state.storageValue} </h3>
          <br />

          {/*  DApp Actions  */}
          <p>
            Try clicking the button below 👇 to set the value on Smart Contract to 5
          </p>
          <button onClick={this.setMethod}>Set value to 5</button>
        </div>
        {/* ---------------------------------------------------------- */}

      </div>
    );
  }
}