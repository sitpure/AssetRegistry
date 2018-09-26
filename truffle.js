
var HDWalletProvider = require("truffle-hdwallet-provider");

var infura_apikey = "XXXXXX";
//var mnemonic = "twelve words you can find in metamask/settings/reveal seed words blabla";
var mnemonic = "service citizen day suspect under game wait mask lake keen denial sausage";

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
            provider: new HDWalletProvider(mnemonic, "https://kovan.infura.io/X3rTOAZ8U79sErtKTBnh"),
            network_id: "*",
            gas: 6000000,
            gasPrice: 35000000000

        },
        42: {
            provider: new HDWalletProvider(mnemonic, "https://kovan.infura.io/X3rTOAZ8U79sErtKTBnh"),
            network_id: "*",
            gas: 6000000,
            gasPrice: 35000000000

        }
    }
};
