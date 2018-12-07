
var HDWalletProvider = require("truffle-hdwallet-provider");

var infura_api_url = "XXXXXX";
//var mnemonic = "twelve words you can find in metamask/settings/reveal seed words blabla";
var mnemonic = "able middle hen maximum luggage merge dawn holiday gun pear elephant captain";

module.exports = {
    migrations_directory: "./migrations",
    // See <http://truffleframework.com/docs/advanced/configuration>
    // for more about customizing your Truffle configuration!
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*" // Match any network id
        },
        kovan: {
            provider: new HDWalletProvider(mnemonic, infura_api_url),
            network_id: "*",
            gas: 6000000,
            gasPrice: 35000000000

        },
        42: {
            provider: new HDWalletProvider(mnemonic, infura_api_url),
            network_id: "*",
            gas: 6000000,
            gasPrice: 35000000000

        }
    }
};
