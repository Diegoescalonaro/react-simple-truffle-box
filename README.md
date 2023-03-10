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

2. Now run the development console. This will spin up and allow you to interact with ganache, a local test chain on localhost:9545

```sh
truffle develop

```

3. Compile and migrate the smart contracts. Running migrate will do both. Note inside the development console we don't have to preface commands with truffle.

```sh
compile
migrate
```

3. OPTIONAL: You can run tests written in Solidity or JavaScript against your smart contracts.

```sh
test
```

4. In the client directory, we run the React app. 

```sh
cd client
npm start
  Starting the development server...
```

Build the application for production using the build script. A production build will be in the `dist/` folder.
```sh
cd client
npm run build
```

From there, follow the instructions on the hosted React app. It will walk you through using Truffle and Ganache to deploy the `SimpleStorage` contract, making calls to it, and sending transactions to change the contract's state.



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
