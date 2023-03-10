// Import React package
import React from "react";

// Import component CSS style
import "./App.css";

// Import helper functions
import getWeb3 from "../helpers/getWeb3";

//////////////////////////////////////////////////////////////////////////////////|
//        CONTRACT ADDRESS           &          CONTRACT ABI                      |
//////////////////////////////////////////////////////////////////////////////////|                                                             |
const CONTRACT_ADDRESS = require("../contracts/SimpleStorage.json").networks[5].address
const CONTRACT_ABI = require("../contracts/SimpleStorage.json").abi;

export default class App extends React.Component {
  state = { web3Provider: null, accounts: null, contract: null, storageValue: null };

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

      // Get the value from the contract to prove it worked.
      const response = await contract.methods.get().call();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3Provider: web3, accounts: accounts, contract: contract, storageValue: response });
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

    // Get the updated value from the contract  and updates storageValue state
    const response = await contract.methods.get().call();
    this.setState({ storageValue: response })
  }

  //TODO: get function to interact with Storage Smart Contract
  getMethod = async () => { }

  render() {
    if (!this.state.web3Provider) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">

        {/* Information */}
        <h2>Smart Contract: SimpleStorage.sol 🧮</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <h3>Contract stored value: {this.state.storageValue} </h3>
        <br />

        {/*  Actions  */}
        <p>
          Try clicking the button below 👇 to set the value on Smart Contract to 5
        </p>
        <button onClick={this.setMethod}>Set value to 5</button>
      </div>
    );
  }
}