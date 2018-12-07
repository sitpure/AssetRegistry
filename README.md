# React, Redux, Truffle, and Material-UI for bootstrapping a Dapp


Demo - Asset Registry on Ethereum blockchain using IPFS and ReactJs

In addition this dapp uses Webpack, React-Router, Redux and Material-UI.

## Installation

1. Clone this repo.
    ```javascript
    git clone https://github.com/sitpure/AssetRegistry.git
    ```


2. Install truffle and an ethereum client.
    ```javascript
    npm install -g truffle 
    npm install -g ethereumjs-testrpc
    ```

3. Install dependencies.
	```javascript
	npm install
	```

4. Setup infura account. They host Ethereum public nodes and allow you to connect for free'
	* Goto https://infura.io/ and register a new account
	* You will receive a email with URL to different test networks
	* Copy Kovan Test Ethereum network URL and replace XXXXXX with URL in truffle.js file


5. Compile and migrate the contracts to kovan test network. Smart contract changes must be manually recompiled and migrated.
    ```javascript
    truffle.cmd compile  // or try truffle compile
    truffle.cmd migrate --network kovan  // or try truffle migrate --network kovan
    ```

6. Run the webpack server for front-end hot reloading. 
    ```javascript
    npm start
    ```

7. To build the application for production, use the build command. A production build will be in the /dist folder.
    ```javascript
    npm run build
    ```

