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
truffle compile
truffle migrate
```

3. OPTIONAL: You can run tests written in Solidity or JavaScript against your smart contracts.

```sh
truffle test
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
