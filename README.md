# React Simple Truffle Box

This simple box comes with everything you need to start using Truffle to write, compile, test, and deploy smart contracts, and interact with them from a React app.

## Installation

Prerequisites: Node (> v16 LTS) and Git

1. First ensure you are in an empty directory.

Run the `unbox` command using 1 of 2 ways.

```sh
# Install Truffle globally and run `truffle unbox`
npm install -g truffle
truffle unbox Diegoescalonaro/react-simple-truffle-box
```

```sh
# Alternatively, run `truffle unbox` via npx
npx truffle unbox Diegoescalonaro/react-simple-truffle-box
```

## Compile and deploy Smart Contracts to Ganache network

1. Now run the Ganache local network. You can execute the command below or just run the Ganache UI. This will spin up and allow you to interact with ganache, a local test chain on localhost:8545

```sh
npx ganache-cli
```

2. Compile and migrate the smart contracts. Running migrate will do both. Note inside the development console we don't have to preface commands with truffle. Check `/contracts` and `/migrations` folders 🔎

```sh
truffle compile
truffle migrate --network ganache
```

3. OPTIONAL: You can run tests written in Solidity or JavaScript against your smart contracts. Check `/tests` folder  🔎

```sh
truffle test
```

4. OPTIONAL: You can run custom scripts against your smart contracts. Check `/scripts` folder 🔎
```sh
truffle exec scripts/increment.js
```

## Run the client app (React)

1. Make sure you have MetaMask installed in your browser, and connected to the Ganache network. You will need to add the network configuration as well as import one of the accounts generated by Ganache to be able to interact with the Smart Contract deployed on the Ganache network.


<img width="374" alt="Screenshot 2023-03-14 at 23 00 24" src="https://user-images.githubusercontent.com/26909731/225150831-d00a9fe5-e8ea-48bf-91a7-5705707fe86d.png">

<img width="374" alt="Screenshot 2023-03-14 at 23 00 24" src="https://user-images.githubusercontent.com/26909731/225151437-a61de8f3-f6ce-4e4a-9e41-cd8ee6c98fb5.png">


2. In the `/client` directory, we run the React app. 

```sh
cd client
npm start
  Starting the development server...
```

3. OPTIONAL: Build the application for production using the build script. A production build will be in the `dist/` folder  🔎
```sh
cd client
npm run build
```

From there, follow the instructions on the hosted React app. It will walk you through using Truffle and Ganache to deploy the `SimpleStorage` contract, making calls to it, and sending transactions to change the contract's state.


## Customize DApp based on [Auction.sol](https://github.com/Diegoescalonaro/auction-smartcontract)

<details>
<summary>CONTEXT Information 🤓</summary>

```js
// Use web3 to get the user's accounts.
const accounts = await web3.eth.getAccounts();

// Get the network ID
const networkId = await web3.eth.net.getId();

// Set data as a component state
this.setState({accounts, networkId})
```

```js
{/* ---- Context Information: Account & Network ---- */}
<div className="Auction-header">
    <div className="Header-context-information">
      <p> Network connected: {this.state.networkId}</p>
      <p> Your address: {this.state.accounts[0]}</p>
    </div>
</div>
```

```js
// --------- METAMASK EVENTS ---------
  handleMetamaskEvent = async () => {
    window.ethereum.on('accountsChanged', function (accounts) {
      // Time to reload your interface with accounts[0]!
      alert("Incoming event from Metamask: Account changed 🦊")
      window.location.reload()
    })

    window.ethereum.on('networkChanged', function (networkId) {
      // Time to reload your interface with the new networkId
      alert("Incoming event from Metamask: Network changed 🦊")
      window.location.reload()
    })
  }
```

```js
// --------- TO LISTEN TO EVENTS AFTER EVERY COMPONENT MOUNT ---------
this.handleMetamaskEvent()
```
</details>

<details>
<summary>GET Methods 📖 </summary>

```js
// ------------ GET AUCTION INFORMATION FUNCTION ------------
getAuctionInformation = async () => {
  const { accounts, contract } = this.state;

  // Get the auction information
  const response = await contract.methods.getAuctionInfo().call({ from: accounts[0] });
  this.setState({ auctionInfo: response })

  // Get the highest price and bidder, and the status of the auction
  const imageURI = await contract.methods.getImageURI().call();
  const highestPrice = await contract.methods.getHighestPrice().call();
  const highestBidder = await contract.methods.getHighestBidder().call();
  const basePrice = await contract.methods.getBasePrice().call();
  const originalOwner = await contract.methods.originalOwner().call();
  const newOwner = await contract.methods.newOwner().call();
  const isActive = await contract.methods.isActive().call();
  this.setState({ imageURI, highestPrice, highestBidder, basePrice, originalOwner, newOwner, isActive })
}
```

```js
{/* ---- Auction information ---- */}
<div className="Auction-component-1">
  <div className="Auction-component-body">
    <h2 id="inline">Auction information</h2>
    <button id="button-call" onClick={this.getAuctionInformation}> GET INFORMATION</button>
    {
      this.state.auctionInfo &&
      <>
        <div className="Auction-information">
          {/* Auction Image */}
          <div className="Auction-information-img">
            {this.state.imageURI && <img src={this.state.imageURI}></img>}
            {this.state.imageURI && <p><u>Descargar imágen</u> &nbsp;&nbsp; <u>Solicitar más imágenes</u></p>}
          </div>
          {/* Auction information */}
          <div className="Auction-information-text">

            {/* Auction Description */}
            <p>{this.state.auctionInfo[0]}</p>

            {/* Basic Information */}
            <p><b>Status: </b>{this.state.isActive ? "The auction is still active!! 🤩 🤩" : "The auction is not longer active 😭 😭"}</p>
            <p><b>Created at:</b> {this.state.auctionInfo[1]}</p>
            <p><b>Duration:</b> {this.state.auctionInfo[2]} seconds</p>

            {/* More information */}
            {this.state.highestBidder && <p><b>Highest Bidder:</b> {this.state.highestBidder}</p>}
            {this.state.highestPrice && <p><b>Highest Price:</b> {this.state.web3Provider.utils.fromWei(this.state.highestPrice, 'ether')} ether</p>}
            {this.state.basePrice && <p><b>Base price:</b> {this.state.basePrice}</p>}
            {this.state.originalOwner && <p><b>Original Owner:</b> {this.state.originalOwner}</p>}
            {this.state.newOwner && <p><b>New Owner:</b> {this.state.newOwner}</p>}
          </div>
        </div>
      </>
    }
  </div>
</div>
```
</details>

<details>
<summary>SET Methods 🖊️ </summary>

```js
// ------------ BID FUNCTION ------------
bid = async () => {
  const { accounts, contract } = this.state;

  // Bid at an auction for X value
  await contract.methods.bid().send({ from: accounts[0], value: this.state.value });

  // Get the new values: highest price and bidder, and the status of the auction
  const highestPrice = await contract.methods.getHighestPrice().call();
  const highestBidder = await contract.methods.getHighestBidder().call();
  const isActive = await contract.methods.isActive().call();

  // Update state with the result.
  this.setState({ isActive: isActive, highestPrice, highestBidder });
};

// ------------ STOP AUCTION FUNCTION ------------
stopAuction = async () => {
  const { accounts, contract } = this.state;

  // Stop the auction
  await contract.methods.stopAuction().send({ from: accounts[0] });

  // Get the new values: isActive and newOwner
  const isActive = await contract.methods.isActive().call();
  const newOwner = await contract.methods.newOwner().call();

  // Update state with the result.
  this.setState({ isActive, newOwner });
}
```

```js
{/* ---- Auction actions ---- */}
<div className="Auction-component-2">
  <div className="Auction-component-body">
    <div className="Auction-actions">
      <h2>Auction actions</h2>

      {/* Input & Button to bid */}
      <input placeholder="Insert value in wei" onChange={(e) => this.setState({ value: e.target.value })}></input>
      <button id="button-send" onClick={this.bid}>BID</button>

      {/* Button to stop auction */}
      <button id="button-send" onClick={this.stopAuction}>STOP AUCTION</button>

      {/* Helper to convert wei to ether */}
      {this.state.value && <p>You're gonna bid: {this.state.web3Provider.utils.fromWei(this.state.value, 'ether')} ether</p>}
    </div>
  </div>
</div>
```
</details>

## Deployment on public testnet

To deploy your contracts to a public network (such as a testnet or mainnet) there are two approaches. The first uses Truffle Dashboard which provides "an easy way to use your existing MetaMask wallet for your deployments". The second, requires copying your private key or mnemonic into your project so the deployment transactions can be signed prior to submission to the network.

### Using Truffle Dashboard (recommended)

Truffle Dashboard ships with Truffle and can be started with truffle dashboard. This in turn loads the dashboard at http://localhost:24012 and beyond that you'll just need to run your migration (truffle migrate --network dashboard). A more detailed guide to using Truffle Dashboard is available here.

### Using the env file and Infura

You will need at least one mnemonic to use with the network. The .dotenv npm package has been installed for you, and you will need to create a .env file for storing your mnemonic and any other needed private information.

The .env file is ignored by git in this project, to help protect your private data. In general, it is good security practice to avoid committing information about your private keys to github. The truffle-config.js file expects a MNEMONIC value to exist in .env for running commands on each of these networks, as well as a default MNEMONIC for the Arbitrum network we will run locally.

If you are unfamiliar with using .env for managing your mnemonics and other keys, the basic steps for doing so are below:

1. Use touch .env in the command line to create a .env file at the root of your project.
2. Open the .env file in your preferred IDE 
3. Add the following, filling in your own Infura project key and mnemonics:

```sh
MNEMONIC="<YOUR MNEMONIC HERE>"
INFURA_KEY="<Your Infura Project ID>"
RINKEBY_MNEMONIC="<Your Rinkeby Mnemonic>"
MAINNET_MNEMONIC="<Your Mainnet Mnemonic>"
MAINNET_MNEMONIC="<Your Mainnet Mnemonic>"
```
  
4. As you develop your project, you can put any other sensitive information in this file. You can access it from other files with require('dotenv').config() and refer to the variable you need with process.env['<YOUR_VARIABLE>'].
